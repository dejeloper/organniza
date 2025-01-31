"use client";

import { Apple, BadgeEuro, Rat, Settings2, ShoppingBasket } from "lucide-react";

import { NavMain } from "@/components/shared/dashboard/nav-main";
import { NavUser } from "@/components/shared/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavTeam } from "@/components/shared/dashboard/nav-team";
import { ToogleThemeSidebar } from "@/components/shared/toogle-theme";

const data = {
  user: {
    name: "usuario",
    email: "user@organniza.com",
    avatar: "/avatars/user.webp",
  },
  team: {
    name: "Organniza",
    logo: Rat,
    plan: "Grupo Ziele",
  },
  navMain: [
    {
      title: "Mercado",
      url: "#",
      icon: ShoppingBasket,
      isActive: true,
      items: [
        {
          title: "Compras",
          url: "#/market/purchases",
        },
        {
          title: "Inventario",
          url: "#/market/inventory",
        },
        {
          title: "Historial",
          url: "#/market/history",
        },
      ],
    },
    {
      title: "Productos",
      url: "#",
      icon: Apple,
      items: [
        {
          title: "Productos",
          url: "/products",
        },
      ],
    },
    {
      title: "Presupuesto",
      url: "#",
      icon: BadgeEuro,
      items: [
        {
          title: "Resumen",
          url: "#/market/summary",
        },
        {
          title: "Conceptos",
          url: "#/market/concepts",
        },
        {
          title: "Gastos",
          url: "#/market/expenses",
        },
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Lugares",
          url: "#/market/places",
        },
        {
          title: "Clasificaciones",
          url: "#/market/classifications",
        },
        {
          title: "Categorias",
          url: "#/market/categories",
        },
        {
          title: "Prioridades",
          url: "#/market/priorities",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavTeam team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} title="Sistema" />
        <ToogleThemeSidebar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
