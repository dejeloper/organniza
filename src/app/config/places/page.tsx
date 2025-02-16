import CardsPlaces from "@/components/config/places/cards-places";
import TablePlaces from "@/components/config/places/table-places";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { IPlace } from "@/interfaces/shared/IPlace";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

async function ListConfigPlacesPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Configuración", href: "/config" },
    { name: "Lugares", href: "#" },
  ];

  let places: IPlace[] = [];

  try {
    const { data, error } = await supabase.from("Place").select("*"); // 🔥 Consulta directa a Supabase

    if (error) {
      console.error("Error al obtener los lugares:", error.message);
    } else if (Array.isArray(data)) {
      places = data as IPlace[];
    }
  } catch (error) {
    console.error("Error inesperado al obtener los lugares", error);
  }

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center md:m-4 mt-0">
        <h2 className="mb-4 text-4xl font-extrabold text-center tracking-tight text-foreground md:text-5xl lg:text-6xl hidden md:block">
          Lista de Lugares
        </h2>
        <h2 className="text-4xl font-extrabold text-center tracking-tight text-foreground md:text-5xl lg:text-6xl md:hidden block">
          Lugares
        </h2>

        <div className="flex justify-start my-4 w-full">
          <Link
            href="/config/places/new"
            className={`${buttonVariants({
              variant: "default",
            })} w-full md:w-auto mb-2`}
          >
            Nuevo Lugar
          </Link>
        </div>

        {places && places.length > 0 ? (
          <>
            <CardsPlaces places={places} />
            <TablePlaces places={places} />
          </>
        ) : (
          <span className="flex w-full justify-center mt-4">
            No hay lugares
          </span>
        )}
      </div>
    </PagesWrapper>
  );
}

export default ListConfigPlacesPage;
