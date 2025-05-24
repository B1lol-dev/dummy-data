import React, { useEffect, useState } from "react";
import {
  BarChart3,
  ChefHat,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  FileBarChart,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/utils/auth";
import toast from "react-hot-toast";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Recipes",
    url: "/admin/recipes",
    icon: ChefHat,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: Package,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileBarChart,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/admin/support",
    icon: HelpCircle,
  },
];

interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
}

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<IAdmin>();

  useEffect(() => {
    auth
      .checkAdmin()
      .then(() => {
        auth
          .getMyInfo(auth.adminToken)
          .then((data) => {
            setAdmin(data);
          })
          .catch((err) => {
            toast.error("Failed to fetch admin info.");
            console.error(err);
          });
      })
      .catch((err) => {
        console.error("Admin check failed:", err);
        toast.error("You are not authorized to access this page.");
        navigate("login");
        return;
      });
  }, [navigate]);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                  <TrendingUp className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Admin Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname.endsWith("/")
                        ? pathname.slice(0, -1) === item.url
                        : pathname === item.url
                    }
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-sm font-medium">
                  {admin?.firstName.slice(0, 1)}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {admin?.firstName} {admin?.lastName}
                </span>
                <span className="truncate text-xs">{admin?.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default React.memo(AdminSidebar);
