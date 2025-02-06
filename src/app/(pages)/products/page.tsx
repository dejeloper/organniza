import Link from "next/link";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { getProducts } from "./products.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function ListProductsPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Productos",
      href: "/pages/products",
    },
  ];

  const products = await getProducts();

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4 ">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Lista de Productos
        </h1>

        <div className="flex justify-end mt-4 w-full">
          <Link
            href="/products/new"
            className={buttonVariants({ variant: "default" })}
          >
            Nuevo Producto
          </Link>
        </div>
        <div className="flex flex-col m-4 ">Productos</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products &&
            products.response.map((product: any) => (
              <div key={product.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold">
                      Precio:
                      <span className="font-medium ml-2">
                        $ {product.price}
                      </span>
                    </p>
                    <p className="font-bold">
                      Clasificación:
                      <span className="font-medium ml-2">
                        {product.clasification}
                      </span>
                    </p>
                    <p className="font-bold">
                      Categoría:
                      <span className="font-medium ml-2">
                        {product.category}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </PagesWrapper>
  );
}

export default ListProductsPage;
