import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { IBreadcrumbBar } from "@/interfaces/shared/breadcrumb.interface";

function NewProductPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Productos",
      href: "/pages/products",
    },
    {
      name: "Agregar Producto",
      href: "/pages/products/new",
    },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4 ">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
          New Product
        </h1>
      </div>
    </PagesWrapper>
  );
}

export default NewProductPage;
