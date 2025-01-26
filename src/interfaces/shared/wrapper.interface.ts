import { IBreadcrumbBar } from "@/interfaces/shared/breadcrumb.interface";

export interface IPagesWrapper {
  children: React.ReactNode;
  menuBreadcrumb: IBreadcrumbBar[];
}
