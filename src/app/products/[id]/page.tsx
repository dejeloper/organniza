import { redirect } from "next/navigation";
import { apiService } from "@/services/apiServices";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { IProduct } from "@/interfaces/schemas/IProduct";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = params;
  const title = "Ver Producto";
  let product: IProduct | undefined;

  try {
    const responseProduct = await apiService.getById("products", id);

    if (responseProduct.status && responseProduct.response) {
      product = responseProduct.response as IProduct;
    } else {
      console.error("Error al obtener el producto:", responseProduct.message);
      redirect("/products");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    redirect("/products");
  }

  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: title, href: "#" },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4">
        <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {title}
        </h3>
        <div className="flex flex-col mx-auto w-full mt-4 md:mt-8">
          <Card className="w-full lg:w-1/2 md:w-3/4 sm:w-5/6 mx-auto border-0 shadow-form">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-2xl">
                {product?.name ?? "Sin nombre"}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 md:mt-8">
              <p className="font-bold">
                Precio:
                <span className="font-medium ml-2">
                  {product?.price ? `$ ${product.price}` : "No disponible"}
                </span>
              </p>
              <p className="font-bold">
                Clasificación:
                <span className="font-medium ml-2">
                  {product?.clasification ?? "No disponible"}
                </span>
              </p>
              <p className="font-bold">
                Categoría:
                <span className="font-medium ml-2">
                  {product?.category ?? "No disponible"}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default ProductDetail;
