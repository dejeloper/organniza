"use client";

import { useEffect, useState } from "react";
import CardsPlaces from "@/components/config/places/cards-places";
import TablePlaces from "@/components/config/places/table-places";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { IPlace } from "@/interfaces/shared/IPlace";
import { apiService } from "@/services/apiServices";
import Link from "next/link";

export default function ListConfigPlacesPage() {
  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Configuración", href: "/config" },
    { name: "Lugares", href: "#" },
  ];

  const [places, setPlaces] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await apiService.getAll<IPlace>("Place");
        if (response.status) {
          setPlaces(response.response);
        } else {
          console.error("Error al obtener lugares:", response.message);
        }
      } catch (error) {
        console.error("Error inesperado al obtener los lugares", error);
      }
      setLoading(false);
    };

    fetchPlaces();
  }, []);

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

        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : places.length > 0 ? (
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
