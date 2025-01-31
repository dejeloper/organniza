import NewProductForm from "@/components/products/newForm";
import { Card, CardContent } from "@/components/ui/card";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";

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
      <div className="flex flex-col justify-center m-4">
        <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Nuevo Producto
        </h3>
        <div className="flex flex-col mx-auto w-full mt-4 md:mt-8">
          <Card className="w-full md:w-1/2 mx-auto">
            <CardContent className="mt-4 md:mt-8">
              <NewProductForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default NewProductPage;
