import { Outlet } from "react-router-dom";

import Header from "./Header";
import { useAuth } from "@/hooks/useAuth";

export default function DefaultLayout() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Header currentUser={currentUser} logout={logout} />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
