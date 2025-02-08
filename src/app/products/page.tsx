import Link from "next/link";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { apiService } from "@/services/apiServices";
import { ProductCard } from "@/components/products/productCard";
import { IProduct } from "@/interfaces/schemas/IProduct";
import { IResponse } from "@/interfaces/shared/IResponse";

async function ListProductsPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "#" },
  ];

  let products: IProduct[] = [];

  try {
    const response: IResponse = await apiService.getAll("products");

    if (response.status && Array.isArray(response.response)) {
      products = response.response as IProduct[];
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Lista de Productos
        </h1>

        <div className="flex justify-start my-4 w-full">
          <Link
            href="/products/new"
            className={buttonVariants({ variant: "default" })}
          >
            Nuevo Producto
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <span className="flex w-full justify-center mt-4">
            No hay productos
          </span>
        )}
      </div>
    </PagesWrapper>
  );
}

export default ListProductsPage;
