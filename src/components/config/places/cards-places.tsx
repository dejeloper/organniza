"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IPlace } from "@/interfaces/shared/IPlace";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiServices";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface CardsPlacesProps {
  places: IPlace[];
}

export default function CardsPlaces({
  places: initialPlaces,
}: CardsPlacesProps) {
  const router = useRouter();
  const [places, setPlaces] = useState<IPlace[]>(initialPlaces);
  const [loading, setLoading] = useState<number | null>(null);
  const { toast } = useToast();

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

      toast({
        title: "Lugar eliminado",
        description: "El lugar ha sido eliminado correctamente.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error al eliminar el lugar:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el lugar.",
        variant: "destructive",
      });
      setPlaces(initialPlaces);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:hidden">
      {places.length > 0 ? (
        places.map((place) => (
          <motion.div key={place.id} whileHover={{ scale: 1.05 }}>
            <Card className="rounded-2xl shadow-lg overflow-hidden transition-transform hover:shadow-xl dark:bg-gray-800 bg-gray-200">
              <CardHeader className="dark:bg-gray-900 dark:border-gray-700 bg-gray-300 border-gray-400 p-4 border-b">
                <CardTitle className="text-lg font-bold">
                  {place.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm font-medium my-2">
                  Nombre corto: {""}
                  <span className="px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-400">
                    {place.shortName.toUpperCase()}
                  </span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="font-medium">Color:</span>
                  <span
                    className="px-3 py-1 rounded-md text-xs font-medium text-white"
                    style={{ backgroundColor: place.color }}
                  >
                    {place.color}
                  </span>
                </p>
                <p className="text-sm font-medium mt-2">
                  Habilitado: {place.enabled ? "✅ Sí" : "❌ No"}
                </p>
                <p className="text-xs dark:text-gray-400 text-gray-600 mt-2">
                  Creado: {new Date(place.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs dark:text-gray-400 text-gray-600">
                  Actualizado: {new Date(place.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 p-4 border-t dark:border-gray-700 border-gray-400">
                <Button
                  variant="outline"
                  className="w-1/2 border border-blue-500 px-4 py-2 rounded-lg transition hover:bg-blue-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/config/places/${place.id}/edit`);
                  }}
                >
                  ✏️ Editar
                </Button>
                <Button
                  variant="outline"
                  disabled={loading === place.id}
                  className={`w-1/2 border border-red-500 px-4 py-2 rounded-lg transition ${
                    loading === place.id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-500 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlerRemovePlace(place.id);
                  }}
                >
                  {loading === place.id ? "⏳ Eliminando..." : "❌ Eliminar"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      ) : (
        <Card className="dark:bg-gray-800 bg-gray-200 text-center p-6 rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold dark:text-white text-black">
              No hay lugares disponibles
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
