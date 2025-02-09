import HeaderSidebarContent from "@/components/shared/dashboard/header-sidebar-content";
import { IPagesWrapper } from "@/interfaces/shared/IWrapper";

export function PagesWrapper({ children, menuBreadcrumb }: IPagesWrapper) {
  return (
    <div className="flex flex-1 flex-col md:gap-4 gap-0 p-4 pt-0">
      <HeaderSidebarContent menuBreadcrumb={menuBreadcrumb} />
      {children}
    </div>
  );
}
