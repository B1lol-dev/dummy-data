import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default React.memo(AdminLayout);
