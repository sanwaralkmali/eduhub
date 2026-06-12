// One source of truth for "Enquire / Request a quote" deep links into the
// contact form. Backward-compatible with the original ItemView URL shape.

/** Non-item enquiry topics for section CTAs, mapped to localized labels via the
 *  `contact.topics.*` i18n keys. Free-text topics are also accepted. */
export type EnquiryTopic =
  | "quote"
  | "general"
  | "graduation"
  | "activities"
  | "schoolServices";

export const KNOWN_TOPICS: readonly EnquiryTopic[] = [
  "quote",
  "general",
  "graduation",
  "activities",
  "schoolServices",
];

export function isKnownTopic(value: string): value is EnquiryTopic {
  return (KNOWN_TOPICS as readonly string[]).includes(value);
}

interface EnquiryLinkParams {
  /** Catalogue item slug — pair with `category`. */
  item?: string;
  /** Category slug — pair with `item`. */
  category?: string;
  /** A topic for non-item CTAs (e.g. "quote"). Ignored when item+category given. */
  topic?: EnquiryTopic | string;
}

/**
 * Build a link to /contact carrying enquiry context.
 * - `item` + `category` → `/contact?item={item}&category={category}` (legacy shape, unchanged)
 * - `topic` only        → `/contact?topic={topic}`
 * - nothing             → `/contact`
 */
export function enquiryHref({ item, category, topic }: EnquiryLinkParams = {}): string {
  const params = new URLSearchParams();
  if (item && category) {
    params.set("item", item);
    params.set("category", category);
  } else if (topic) {
    params.set("topic", topic);
  }
  const qs = params.toString();
  return qs ? `/contact?${qs}` : "/contact";
}
