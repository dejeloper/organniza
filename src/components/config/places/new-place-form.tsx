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
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";

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
    let response, error;

    if (params?.id) {
      const { data: updatedPlace, error: updateError } = await supabase
        .from("Place")
        .update({
          name: data.name,
          shortName: data.shortName,
          color: data.color,
        })
        .eq("id", params.id)
        .select()
        .single();

      response = updatedPlace;
      error = updateError;
    } else {
      // 🟢 INSERT
      const { data: newPlace, error: insertError } = await supabase
        .from("Place")
        .insert([
          {
            name: data.name,
            shortName: data.shortName,
            color: data.color,
          },
        ])
        .select()
        .single();

      response = newPlace;
      error = insertError;
    }

    if (error) {
      console.error("Error al guardar el lugar:", error.message);
      return;
    }

    console.log("Lugar guardado exitosamente:", response);
    router.refresh();
    router.push("/config/places");
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
