"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { IPlace } from "@/interfaces/shared/IPlace";
import { apiService } from "@/services/apiServices";
import { z } from "zod";

function NewPlaceForm({ place }: { place: IPlace | undefined }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const schemaNewPlace = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    shortName: z.string().min(1, "El nombre corto es obligatorio"),
    color: z.string().min(1, "El color es obligatorio"),
    enabled: z.boolean().default(true),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  });

  type PlaceType = z.infer<typeof schemaNewPlace>;

  const form = useForm<PlaceType>({
    resolver: zodResolver(schemaNewPlace),
    defaultValues: {
      name: place?.name ?? "",
      shortName: place?.shortName ?? "",
      color: place?.color ?? "#000000",
      enabled: place?.enabled ?? true,
      createdAt: place?.createdAt ?? "",
      updatedAt: place?.updatedAt ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: PlaceType) => {
    try {
      let response = undefined;

      if (params?.id) {
        response = await apiService.update<PlaceType, IPlace>(
          "Place",
          params.id,
          {
            name: data.name,
            shortName: data.shortName,
            color: data.color,
          }
        );
      } else {
        response = await apiService.create<PlaceType, IPlace>("Place", {
          name: data.name,
          shortName: data.shortName,
          color: data.color,
        });
      }

      if (!response.status) {
        console.error("Error al guardar el lugar:", response.message);
        return;
      }

      console.log("Lugar guardado exitosamente:", response.response);
      router.refresh();
      router.push("/config/places");
    } catch (error) {
      console.error("Error inesperado al guardar el lugar:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="my-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <FormControl>
                  <Input type="text" {...field} id="name" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="shortName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="shortName">Nombre Corto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    id="shortName"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="color"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="color">Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} id="color" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <Button type="submit">
            {params.id ? "Actualizar Lugar" : "Crear Lugar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewPlaceForm;
