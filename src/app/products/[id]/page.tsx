import Link from "next/link";
import { redirect } from "next/navigation";
import { getProduct } from "@/queries/products.api";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { IProduct } from "@/interfaces/schemas/IProduct";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;

  const response = await getProduct(Number(id));
  if (!response.status) {
    redirect("/products");
  }
  const product: IProduct = response.response;

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
      name: "Ver Producto",
      href: "#",
    },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4">
        <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Ver Producto
        </h3>
        <div className="flex flex-col mx-auto w-full mt-4 md:mt-8">
          <Card className="w-full lg:w-1/2 md:w-3/4 sm:w-5/6 mx-auto border-0 shadow-form">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 md:mt-8">
              <p className="font-bold">
                Precio:
                <span className="font-medium ml-2">$ {product.price}</span>
              </p>
              <p className="font-bold">
                Clasificación:
                <span className="font-medium ml-2">
                  {product.clasification}
                </span>
              </p>
              <p className="font-bold">
                Categoría:
                <span className="font-medium ml-2">{product.category}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default ProductDetail;
