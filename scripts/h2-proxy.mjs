/**
 * HTTP/2 reverse proxy for local Lighthouse runs.
 *
 * `next start` only speaks HTTP/1.1, which makes Lighthouse's throttling simulation
 * queue the dozen small chunks on six connections; Vercel and Firebase serve HTTP/2.
 * This proxy reproduces the deployed behaviour so local scores match production.
 *
 *   openssl req -x509 -newkey rsa:2048 -nodes -keyout /tmp/key.pem -out /tmp/cert.pem -days 2 -subj "/CN=localhost"
 *   NEXT_PUBLIC_SITE_URL=https://localhost:3443 npm run build && npm run start -- -p 3200 &
 *   node scripts/h2-proxy.mjs /tmp/key.pem /tmp/cert.pem
 *   npx lighthouse https://localhost:3443/en --form-factor=mobile --chrome-flags="--headless=new --ignore-certificate-errors"
 */
import http from "node:http";
import http2 from "node:http2";
import fs from "node:fs";

const [keyPath = "/tmp/key.pem", certPath = "/tmp/cert.pem"] = process.argv.slice(2);
const UPSTREAM_PORT = Number(process.env.UPSTREAM_PORT ?? 3200);
const PORT = Number(process.env.PORT ?? 3443);
const HOP_BY_HOP = new Set(["connection", "keep-alive", "transfer-encoding"]);

const server = http2.createSecureServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
  allowHTTP1: true,
});

server.on("stream", (stream, headers) => {
  const req = http.request(
    {
      host: "127.0.0.1",
      port: UPSTREAM_PORT,
      path: headers[":path"],
      method: headers[":method"],
      headers: {
        host: `localhost:${PORT}`,
        accept: headers.accept ?? "*/*",
        "accept-encoding": headers["accept-encoding"] ?? "",
      },
    },
    (res) => {
      const out = { ":status": res.statusCode };
      for (const [k, v] of Object.entries(res.headers)) if (!HOP_BY_HOP.has(k)) out[k] = v;
      stream.respond(out);
      res.pipe(stream);
    },
  );
  req.on("error", () => stream.close());
  stream.pipe(req);
});

server.listen(PORT, () =>
  console.log(`HTTP/2 proxy on https://localhost:${PORT} → http://127.0.0.1:${UPSTREAM_PORT}`),
);
