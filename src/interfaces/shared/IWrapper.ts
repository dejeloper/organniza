import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";

export interface IPagesWrapper {
  children: React.ReactNode;
  menuBreadcrumb: IBreadcrumbBar[];
}
