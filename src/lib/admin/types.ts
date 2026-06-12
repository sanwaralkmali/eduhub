export type EnquiryStatus = "new" | "contacted" | "closed";

export interface EnquiryRow {
  id: string;
  name: string;
  school: string | null;
  email: string;
  phone: string | null;
  message: string;
  item_id: string | null;
  category_slug: string | null;
  status: EnquiryStatus;
  created_at: string;
}
