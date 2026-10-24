type ClassValue = string | false | null | undefined | 0;

/** Minimal class joiner (no runtime dependency). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Picks the given top-level namespaces from a messages object. */
export function pickMessages<T extends Record<string, unknown>, K extends keyof T>(
  messages: T,
  keys: readonly K[],
): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const key of keys) out[key] = messages[key];
  return out;
}
