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
  const [loading, setLoading] = useState<number | null>(null);

  if (!places) return null;

  const handlerRemovePlace = async (id?: number) => {
    if (!id) return;
    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este lugar?"
    );
    if (!isConfirmed) return;

    setLoading(id);

    try {
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
      const response = await apiService.delete("Place", id);

      if (!response.status) {
        throw new Error(response.message);
      }

      console.log("Lugar eliminado exitosamente.");
    } catch (error) {
      console.error("Error inesperado al eliminar el lugar:", error);
      setPlaces(initialPlaces);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto hidden md:flex justify-center p-4">
      <Table className="w-full max-w-6xl border border-gray-300 dark:border-gray-600 border-collapse dark:bg-[#272727] bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="dark:bg-gray-900 bg-gray-300 border-b dark:border-gray-600 border-gray-300 text-center">
            <TableHead className="w-[80px] text-center">ID</TableHead>
            <TableHead className="text-left">Nombre</TableHead>
            <TableHead className="text-left">Nombre Corto</TableHead>
            <TableHead className="text-center">Color</TableHead>
            <TableHead className="text-center">Habilitado</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.length > 0 ? (
            places.map((place) => (
              <TableRow
                key={place.id}
                className="border dark:border-gray-600 border-gray-300 text-center"
              >
                <TableCell className="font-medium text-center border dark:border-gray-600 border-gray-300">
                  {place.id}
                </TableCell>
                <TableCell className="text-left border dark:border-gray-600 border-gray-300">
                  {place.name}
                </TableCell>
                <TableCell className="border dark:border-gray-600 border-gray-300">
                  <span className="px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-400">
                    {place.shortName.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="border dark:border-gray-600 border-gray-300">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-medium text-white"
                    style={{ backgroundColor: place.color }}
                  >
                    {place.color}
                  </span>
                </TableCell>
                <TableCell className="text-center border dark:border-gray-600 border-gray-300">
                  {place.enabled ? "✅" : "❌"}
                </TableCell>
                <TableCell className="flex gap-2 justify-center border dark:border-gray-600 border-gray-300">
                  <Button
                    variant="outline"
                    className="border border-blue-500 px-3 py-1 rounded-lg transition hover:bg-blue-500/60 hover:text-white"
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
                    disabled={loading === place.id}
                    className={`border border-red-500 px-3 py-1 rounded-lg transition ${
                      loading === place.id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-500/60 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlerRemovePlace(place.id);
                    }}
                    title="Eliminar lugar"
                    aria-label="Eliminar lugar"
                  >
                    {loading === place.id ? "⏳" : "❌"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 dark:text-gray-300 text-gray-700 border dark:border-gray-600 border-gray-300"
              >
                No hay lugares disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
