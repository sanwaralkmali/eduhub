import type { EnquiryRow } from "./types";

// Sample submissions shown in the demo admin (when Supabase isn't configured).
export const SAMPLE_ENQUIRIES: EnquiryRow[] = [
  {
    id: "sample-1",
    name: "Layla Hassan",
    school: "Al-Noor International School",
    email: "layla.hassan@alnoor.example",
    phone: "+966 50 123 4567",
    message:
      "We'd like to run a science fair next term for grades 4–6, around 180 students. Can you share a plan and a quote?",
    item_id: null,
    category_slug: "activities",
    status: "new",
    created_at: "2026-06-08T09:24:00.000Z",
  },
  {
    id: "sample-2",
    name: "Omar Al-Saleh",
    school: "Future Generations School",
    email: "principal@futuregen.example",
    phone: null,
    message:
      "Looking for graduation gowns and caps for 120 graduates in our school colours. Timeline is end of June.",
    item_id: null,
    category_slug: "graduation",
    status: "contacted",
    created_at: "2026-06-06T14:10:00.000Z",
  },
  {
    id: "sample-3",
    name: "Maryam Yousef",
    school: "Rawda Bilingual Academy",
    email: "events@rawda.example",
    phone: "+966 55 987 6543",
    message:
      "We need branded t-shirts and banners for our annual sports day — about 300 shirts in four sizes.",
    item_id: null,
    category_slug: "school-services",
    status: "new",
    created_at: "2026-06-05T07:45:00.000Z",
  },
  {
    id: "sample-4",
    name: "Bilal Karim",
    school: "Horizon Academy",
    email: "bilal.karim@horizon.example",
    phone: null,
    message:
      "Interested in the uniform program for next year, roughly 450 students. What does on-site sizing involve?",
    item_id: null,
    category_slug: "school-services",
    status: "closed",
    created_at: "2026-05-29T11:02:00.000Z",
  },
  {
    id: "sample-5",
    name: "Sara Mansour",
    school: "Cedar Hills School",
    email: "sara.mansour@cedarhills.example",
    phone: "+966 53 222 1188",
    message:
      "Could you coordinate our full graduation ceremony — stage, sound, and run of show — for 90 graduates in July?",
    item_id: null,
    category_slug: "graduation",
    status: "new",
    created_at: "2026-06-09T06:15:00.000Z",
  },
];
