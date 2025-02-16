import Link from "next/link";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { ProductCard } from "@/components/products/productCard";
import { IProduct } from "@/interfaces/schemas/IProduct";
import { Metadata } from "next";
import { apiService } from "@/services/apiServices";

export const metadata: Metadata = {
  title: "Productos | Organniza",
  description: "Bienvenido a Organniza, tu aplicación para organizar la vida.",
};

async function ListProductsPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "#" },
  ];

  let products: IProduct[] = [];
  console.log(products);
  try {
    const responseProducts = await apiService.getAll<IProduct[]>("products");

    if (responseProducts.status && Array.isArray(responseProducts.response)) {
      // products = responseProducts.response ;
    } else {
      console.log(responseProducts.message);
    }
  } catch (error) {
    console.log("Error al obtener los productos", error);
  }

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center md:m-4 mt-0">
        <h2 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl hidden md:block">
          Lista de Productos
        </h2>
        <h2 className="text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl md:hidden block">
          Productos
        </h2>

        <div className="flex justify-start my-4 w-full">
          <Link
            href="/products/new"
            className={`${buttonVariants({
              variant: "default",
            })} w-full md:w-auto mb-2`}
          >
            Nuevo Producto
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mx-auto ">
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
