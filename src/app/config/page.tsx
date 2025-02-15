import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

async function MarketConfigPage() {
  return (
    <div className="flex flex-col justify-center md:m-4 mt-0">
      <h2 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl hidden md:block">
        Configuración
      </h2>
      <h2 className="text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl md:hidden block">
        Configuración
      </h2>
      <div className="flex justify-start my-4 w-full">
        <Link
          href="/config/places"
          className={`${buttonVariants({
            variant: "default",
          })} w-full md:w-auto mb-2`}
        >
          Lugares
        </Link>
        <Link
          href="/config/units"
          className={`${buttonVariants({
            variant: "default",
          })} w-full md:w-auto mb-2`}
        >
          Unidades
        </Link>
        <Link
          href="/config/categories"
          className={`${buttonVariants({
            variant: "default",
          })} w-full md:w-auto mb-2`}
        >
          Categorías
        </Link>
        <Link
          href="/config/productstatus"
          className={`${buttonVariants({
            variant: "default",
          })} w-full md:w-auto mb-2`}
        >
          Estados de Productos
        </Link>
      </div>
    </div>
  );
}

export default MarketConfigPage;
