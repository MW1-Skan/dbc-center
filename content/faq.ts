/** FAQ entries in display order; copy lives in messages under `Faq.items`. */
export const faqIds = ["candidate", "laparoscopic", "stay", "work", "after", "abroad"] as const;
export type FaqId = (typeof faqIds)[number];
