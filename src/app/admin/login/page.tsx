import { redirect } from "next/navigation";
import { getAdminUser, isAdminDemoMode } from "@/lib/auth/admin";
import { LoginView } from "./LoginView";

export default async function AdminLoginPage() {
  const demo = isAdminDemoMode();

  if (!demo) {
    const user = await getAdminUser();
    if (user) redirect("/admin");
  }

  return <LoginView demo={demo} />;
}
