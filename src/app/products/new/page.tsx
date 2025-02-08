import NewProductForm from "@/components/products/newForm";
import { Card, CardContent } from "@/components/ui/card";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { IProduct } from "@/interfaces/schemas/IProduct";
import { redirect } from "next/navigation";
import { apiService } from "@/services/apiServices";

interface Props {
  params: {
    id: string;
  };
}

async function NewProductPage({ params }: Props) {
  const { id } = await params;

  let product: IProduct | undefined;

  if (id) {
    const responseProduct = await apiService.getById("products", id);

    if (!responseProduct.status) {
      redirect("/products");
    } else {
      product = responseProduct.response;
    }
  }

  const menuBreadcrumb: IBreadcrumbBar[] = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Productos",
      href: "/products",
    },
    {
      name: id ? "Editar Producto" : "Crear Producto",
      href: "#",
    },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4">
        <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {id ? "Editar Producto" : "Crear Producto"}
        </h3>
        <div className="flex flex-col mx-auto w-full mt-4 md:mt-8">
          <Card className="w-full lg:w-1/2 md:w-3/4 sm:w-5/6 mx-auto border-0 shadow-form">
            <CardContent>
              <NewProductForm product={product} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default NewProductPage;
