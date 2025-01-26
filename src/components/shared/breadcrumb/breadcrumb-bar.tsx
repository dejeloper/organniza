import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IBreadcrumbBar } from "@/interfaces/shared/breadcrumb.interface";

export function BreadcrumbBar({
  menuBreadcrumb,
}: {
  menuBreadcrumb: IBreadcrumbBar[];
}) {
  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {menuBreadcrumb &&
            menuBreadcrumb.map((miga, i, array) => (
              <div key={i} className="flex justify-center items-center gap-2">
                <BreadcrumbItem>
                  {i === array.length - 1 ? (
                    <BreadcrumbPage className="cursor-default">
                      {miga.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={miga.href}>{miga.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {i !== array.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
