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

interface CardsPlacesProps {
  places: IPlace[];
}

export default function CardsPlaces({
  places: initialPlaces,
}: CardsPlacesProps) {
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
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));

      const response = await apiService.delete("Place", id);
      if (!response.status) {
        throw new Error(response.message);
      }

      console.log("Lugar eliminado exitosamente.");
    } catch (error) {
      console.error("Error inesperado al eliminar el lugar:", error);
      setPlaces(initialPlaces);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:hidden">
      {places.length > 0 ? (
        places.map((place) => (
          <motion.div key={place.id} whileHover={{ scale: 1.05 }}>
            <Card className="rounded-2xl shadow-lg overflow-hidden transition-transform hover:shadow-xl dark:bg-gray-800   bg-gray-200">
              <CardHeader className="dark:bg-gray-900 dark:border-gray-700 bg-gray-300 border-gray-400 p-4 border-b">
                <CardTitle className="text-lg font-bold flex justify-between items-center">
                  {place.name}
                  <span className="text-sm px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-400">
                    {place.shortName.toUpperCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
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
              </CardContent>
              <CardFooter className="flex justify-between p-4 border-t dark:border-gray-700 border-gray-400">
                <Button
                  variant="outline"
                  className="border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/products/${place.id}/edit`);
                  }}
                >
                  ✏️ Editar
                </Button>
                <Button
                  variant="outline"
                  className="border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500/60 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!place.id) return;
                    handlerRemovePlace(place.id);
                  }}
                >
                  ❌ Eliminar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      ) : (
        <Card className="bg-gray-800 text-white p-6 rounded-xl shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              No hay lugares disponibles
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
