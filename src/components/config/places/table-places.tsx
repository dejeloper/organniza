"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IPlace } from "@/interfaces/shared/IPlace";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiServices";

interface TablePlacesProps {
  places: IPlace[];
}

export default function TablePlaces({
  places: initialPlaces,
}: TablePlacesProps) {
  const router = useRouter();
  const [places, setPlaces] = useState<IPlace[]>(initialPlaces);

  if (!places) return null;

  const handlerRemovePlace = async (id?: number) => {
    if (!id) return;

    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este lugar?"
    );
    if (!isConfirmed) return;

    try {
      const response = await apiService.delete("Place", id);
      if (!response.status) {
        console.error("Error al eliminar el lugar:", response.message);
        return;
      }

      console.log("Lugar eliminado exitosamente.");
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
    } catch (error) {
      console.error("Error inesperado al eliminar el lugar:", error);
    }
  };

  return (
    <div className="overflow-x-auto hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Nombre Corto</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Habilitado</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead>Última Actualización</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.length > 0 ? (
            places.map((place) => (
              <TableRow key={place.id}>
                <TableCell className="font-medium">{place.id}</TableCell>
                <TableCell>{place.name}</TableCell>
                <TableCell>{place.shortName}</TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-md text-xs font-medium text-white"
                    style={{ backgroundColor: place.color }}
                  >
                    {place.color}
                  </span>
                </TableCell>
                <TableCell>{place.enabled ? "✅" : "❌"}</TableCell>
                <TableCell>
                  {new Date(place.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(place.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/config/places/${place.id}/edit`);
                    }}
                    title="Editar lugar"
                    aria-label="Editar lugar"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500/60 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlerRemovePlace(place.id);
                    }}
                    title="Eliminar lugar"
                    aria-label="Eliminar lugar"
                  >
                    ❌
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No hay lugares disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
