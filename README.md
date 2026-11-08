# Delta Bariatric Center — website

Marketing and booking site for Delta Bariatric Center (Alexandria, Egypt): the surgeon and team,
appointment requests, and consultation-room rental for other doctors and organizations.

Built with Next.js (App Router, TypeScript strict), Tailwind CSS v4, next-intl (`/en` and `/ar`),
React Hook Form + Zod and Resend. The design source of truth lives in `design/`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000 → redirects to /en
```

Other scripts:

| Script                | What it does                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`       | Production build                                                                                                         |
| `npm run start`       | Serve the production build                                                                                               |
| `npm run lint`        | ESLint                                                                                                                   |
| `npm run format`      | Prettier (with the Tailwind class sorter)                                                                                |
| `npm run typecheck`   | `tsc --noEmit` (run `npx next typegen` first on a fresh clone)                                                           |
| `npm run test:e2e`    | Playwright: interactions, screenshots and the no-horizontal-scroll check (set `PORT=3000` to reuse a running dev server) |
| `npm run screenshots` | Only the screenshots, written to `e2e/screenshots/`                                                                      |

Playwright needs its browser once: `npx playwright install chromium`.

## Environment variables

| Variable               | Required | Purpose                                                                                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | prod     | Resend API key used to email the clinic.                                                                                                             |
| `CLINIC_EMAIL`         | prod     | Inbox that receives booking requests, call-back requests and room inquiries.                                                                         |
| `NOTIFY_FROM_EMAIL`    | optional | Verified sender, e.g. `Delta Bariatric Center <no-reply@dbccenter.com>`. Defaults to Resend's test sender, which only delivers to the account owner. |
| `NEXT_PUBLIC_SITE_URL` | prod     | Canonical origin (no trailing slash) for metadata, `hreflang`, sitemap and robots.                                                                   |

In development, when `RESEND_API_KEY` or `CLINIC_EMAIL` is missing, submissions succeed and a
one-line note is printed instead of sending. In production a missing configuration returns the
friendly "could not send" error. Form payloads are never logged anywhere: they contain health data.

## Where things live

```
app/[locale]/          routes: / (home), /doctor, /book, /rooms, opengraph-image, not-found
app/globals.css        all design tokens (@theme), layout utilities, motion rules
components/            ui/ layout/ home/ doctor/ booking/ rooms/ forms/ motion/ seo/
content/               facts used everywhere: contact details, procedures, departments, rooms…
messages/en.json       every string on the site (ar.json mirrors it, see below)
translations/          Arabic glossary and the list of strings awaiting the doctor's Arabic
lib/arabic-shape.ts    Arabic presentation-form shaper used only by the Open Graph image
lib/notify.ts          single entry point for all form submissions
lib/actions.ts         server actions: validate → honeypot → rate limit → notify
lib/schemas/           Zod schemas shared by client and server
lib/email/             Resend adapter and the three email templates
i18n/, proxy.ts        next-intl routing (en default, ar RTL)
e2e/                   Playwright tests
design/                the designed screens, assets and reference screenshots
```

### Forms pipeline

Every form (booking, call-back, room inquiry) calls a server action in `lib/actions.ts`, which
re-validates with the same Zod schema as the client, drops honeypot submissions silently, applies a
per-IP rate limit (5 per 10 minutes, in-memory per instance; swap `lib/rate-limit.ts` for a shared
store if you need a global limit) and then calls `notify()` in `lib/notify.ts`. `notify` fans out to
adapters. Only the email adapter exists today; add a database or WhatsApp Business API adapter to
the `adapters` array without touching the forms.

## Replacing placeholders and photos

- **Copy placeholders**: every `[square bracket]` value is listed in `PLACEHOLDERS.md` with the
  message key or content file that holds it. Edit the value in `messages/en.json` (or `content/`),
  then rerun `node scripts/placeholders.mjs` to refresh the list.
- **Arabic**: `messages/ar.json` is translated (interface, marketing and profile copy) except the
  medical content, which still carries the `[AR]` prefix and renders in English until Dr. Karam
  supplies the Arabic: procedure descriptions and stay/recovery meta, department descriptions, the
  biography (`Doctor.bio`, `Doctor.bioShort`, `DoctorPage.p1`, `DoctorPage.p2`), the BMI result
  messages, the FAQ answers and the booking-page emergency notice. The full list with the English
  text is in `translations/doctor-review.md`; terminology is in `translations/GLOSSARY.md`. Paste
  the doctor's Arabic over each `[AR] …` value (keep the `{line}` placeholder and `<strong>` tags,
  Western digits, bracketed placeholders as brackets). `node scripts/sync-ar.mjs` never overwrites
  a value that has lost its `[AR]` prefix. Publication titles stay in English by convention; the
  logo wordmark stays "DELTA / BARIATRIC CENTER". Arabic pages render RTL with IBM Plex Sans
  Arabic, and the Arabic Open Graph image pre-shapes its text (`lib/arabic-shape.ts`) because
  Satori measures Arabic letter by letter.
- **Photos**: every image is an `<ImagePlaceholder>` (`components/ui/ImagePlaceholder.tsx`) with a
  label such as "Photo · Dr. Karam". Replace each usage with `next/image` at the same size and
  radius; the surrounding `overflow-hidden` frames already provide the hover zoom. The hero
  portrait, team photo, doctor portrait, story videos, article images, room photos and the map are
  all placeholders.
- **Links to pages that don't exist yet** (procedure details, stories
  index, articles, privacy, disclaimer, rental terms, Google Maps, social profiles) point to `#`.
  They are set in `content/` and `components/`; search for `href: "#"` and `href="#"`.
- **Logo**: `public/brand/` holds the mark (colour and white). `app/icon.png` and
  `app/apple-icon.png` are generated from it.

## Deployment

No platform-specific code. The app is a standard Next.js build:

- **Vercel**: import the repository, set the four environment variables, deploy.
- **Firebase App Hosting**: connect the repository; it detects Next.js. Set the same variables as
  secrets or environment configuration.
- Anywhere else: `npm run build && npm run start` behind a reverse proxy, with the variables set.

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the live origin so `hreflang`, the sitemap,
robots and Open Graph URLs are absolute, and add a verified sending domain in Resend.

## Quality checks

- `npm run lint`, `npm run format:check`, `npm run typecheck` and `npm run test:e2e` all pass.
- Lighthouse (mobile, simulated 4G) on the production build served over HTTP/2, which is what
  Vercel and Firebase provide, scores 97–99 performance and 100 accessibility, best practices and
  SEO on every page, with LCP 2.2–2.5 s and CLS 0. `scripts/h2-proxy.mjs` has the exact commands;
  auditing `next start` directly over HTTP/1.1 reads 94–96 performance because the simulation
  queues chunk downloads on six connections.
- `e2e/screenshots.spec.ts` writes full-page captures at 1440 px and 390 px (plus `/ar` at 390 px)
  to `e2e/screenshots/` and fails if any width from 320 px to 1920 px scrolls horizontally.

## Additions beyond the original screens

Ideas adopted from the second design exploration, built in the site's own tokens:

- **BMI calculator** on the home page (`components/home/BmiCalculator.tsx`): height and weight
  sliders, live BMI with category and guidance, and a "Book a consultation" link that prefills the
  optional height and weight on the booking form through `?height=&weight=`.
- **Your journey with us** four-step band, **FAQ** accordion (native `<details name>`, so it needs
  no JavaScript, with FAQPage JSON-LD that skips placeholder answers), **international patients**
  WhatsApp band, a **closing CTA** on the home and rooms pages, a **floating WhatsApp button** on
  desktop and a **medical disclaimer line** in both footers.
- **Country-code selector** on every phone field (`components/forms/PhoneField.tsx`), Egypt first
  then the Gulf; emails show the full number.
- `node scripts/sync-ar.mjs` adds any new English key to `messages/ar.json` with the `[AR]` prefix
  without overwriting existing translations.

## Profile page

`/doctor` is built from Dr. Karam's CV: introduction (two paragraphs marked "[Draft for approval]"),
quick facts, education, fellowship and training, clinical appointments, memberships, publications,
presentations, teaching, congresses, honours and a certificates section with placeholder cards for
the scans. Copy lives under `DoctorPage` in the messages; the ordering of items is in
`content/credentials.ts`.

## Notes on the design

- Below 768px the home page follows `design/pages/Mobile.dc.html`: that screen has no utility bar,
  no "Medical advice" section and no desktop-only copy, so those are hidden on phones.
- Scroll reveals and staggered entrances use CSS keyframes triggered by a tiny
  IntersectionObserver (`components/motion/Reveal.tsx`) instead of the Motion runtime, which kept
  about 40 KB of JavaScript out of every page's critical path. The room-selection chips animate
  in and out the same way (a short "leaving" state plays the exit keyframe), so the Motion runtime
  turned out to be unnecessary and is not installed; add `motion` back if a future interaction
  needs gesture or layout animation.
- Reduced motion is honoured globally: no movement, and all content is visible immediately.
