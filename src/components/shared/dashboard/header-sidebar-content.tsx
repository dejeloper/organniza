import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { BreadcrumbBar } from "@/components/shared/breadcrumb/breadcrumb-bar";

export default function HeaderSidebarContent({
  menuBreadcrumb,
}: {
  menuBreadcrumb: IBreadcrumbBar[];
}) {
  return (
    <header className="flex md:h-16 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 lg:hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 hidden md:block lg:hidden"
        />
        <BreadcrumbBar menuBreadcrumb={menuBreadcrumb} />
      </div>
    </header>
  );
}
