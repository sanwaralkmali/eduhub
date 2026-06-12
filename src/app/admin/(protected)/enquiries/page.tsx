import { getEnquiries } from "@/lib/admin/data";
import { EnquiriesView } from "./EnquiriesView";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();
  return <EnquiriesView enquiries={enquiries} />;
}
