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

interface TablePlacesProps {
  places: IPlace[];
}

export default function TablePlaces({ places }: TablePlacesProps) {
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
          {places.map((place) => (
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
                >
                  ✏️
                </Button>
                <Button
                  variant="outline"
                  className="border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500/60 transition"
                >
                  ❌
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
