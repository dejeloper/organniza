"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function NewPlaceForm() {
  const schemaNewPlace = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    shortName: z.string().min(1, "El nombre corto es obligatorio"),
    bgColor: z
      .string()
      .min(1, "El color de fondo de la etiqueta es obligatorio"),
    textColor: z
      .string()
      .min(1, "El color del texto de la etiqueta es obligatorio"),
    enabled: z.boolean().default(true),
    // createdAt: z.string().optional(),
    // updatedAt: z.string().optional(),
  });

  type PlaceType = z.infer<typeof schemaNewPlace>;

  const form = useForm<PlaceType>({
    resolver: zodResolver(schemaNewPlace),
    defaultValues: {
      name: "",
      shortName: "",
      bgColor: "#000000",
      textColor: "#FFFFFF",
      enabled: true,
      // name: place?.name ?? "",
      // shortName: place?.shortName ?? "",
      // color: place?.color ?? "#000000",
      // enabled: place?.enabled ?? true,
      // createdAt: place?.createdAt ?? "",
      // updatedAt: place?.updatedAt ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: PlaceType) => {
    console.log(data);
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
        <div className="my-4 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          <FormField
            name="bgColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bgColor">Fondo</FormLabel>
                <FormControl>
                  <Input type="color" {...field} id="bgColor" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="textColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="textColor">Texto</FormLabel>
                <FormControl>
                  <Input type="color" {...field} id="textColor" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center col-span-2 md:col-span-1">
            <span
              className="px-4 py-2 rounded-md text-sm font-medium"
              style={{
                backgroundColor: form.watch("bgColor"),
                color: form.watch("textColor"),
              }}
            >
              {form.watch("shortName") || "Vista previa"}
            </span>
          </div>
        </div>

        <div className="my-4">
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Habilitado</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <Button type="submit">Crear Lugar</Button>
        </div>
      </form>
    </Form>
  );
}

export default NewPlaceForm;
