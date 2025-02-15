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

interface CardsPlacesProps {
  places: IPlace[];
}

export default function CardsPlaces({ places }: CardsPlacesProps) {
  const router = useRouter();
  if (!places) return null;

  const handlerRemovePlace = async (id?: number) => {
    if (!id) return;

    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este lugar?"
    );

    if (!isConfirmed) return;

    const responsePlace = await apiService.delete<IPlace>("places", id);

    if (!responsePlace.status) {
      console.log(responsePlace.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {places.map((place) => (
        <Card
          key={place.id}
          className="p-6 rounded-xl shadow-lg flex flex-col transition-transform hover:scale-105 cursor-pointer dark:hover:bg-gray-900 hover:bg-neutral-200"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {place.name} ({place.shortName})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Color:
              <span
                className="px-2 py-1 rounded-md text-xs font-medium text-white"
                style={{ backgroundColor: place.color }}
              >
                {place.color}
              </span>
            </p>
            <p className="text-sm">Habilitado: {place.enabled ? "✅" : "❌"}</p>
            <p className="text-sm">
              Creado: {new Date(place.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Actualizado: {new Date(place.updatedAt).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between gap-3 mt-5 py-0 px-6">
            <Button
              variant="outline"
              className="border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              ✏️ Editar
            </Button>
            <Button
              variant="outline"
              className="border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500/60 transition"
            >
              ❌ Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
