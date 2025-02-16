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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useParams, useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/schemas/IProduct";
import { ICategory } from "@/interfaces/ICategory";
import { z } from "zod";
import { IUnit } from "@/interfaces/shared/IUnit";
import { IPlace } from "@/interfaces/shared/IPlace";
import { IProductStatus } from "@/interfaces/shared/IStatus";

const units: IUnit[] = [
  { id: 1, name: "Kilogramo", nemonico: "kg" },
  { id: 2, name: "Litro", nemonico: "L" },
  { id: 3, name: "Unidad", nemonico: "u" },
];

const categories: ICategory[] = [
  { id: 1, name: "Frutas", icon: "🍎", color: "#FF5733" },
  { id: 2, name: "Verduras", icon: "🥦", color: "#4CAF50" },
  { id: 3, name: "Carnes", icon: "🥩", color: "#FF0000" },
];

const places: IPlace[] = [
  { id: 1, name: "Supermercado Zapatoca", shortName: "SZ", color: "#FFC107" },
  { id: 2, name: "Supermercado D1", shortName: "D1", color: "#8BC34A" },
  { id: 3, name: "Plaza de Paloquemao", shortName: "PP", color: "#03A9F4" },
  { id: 4, name: "Dollarcity", shortName: "DC", color: "#FF9800" },
  { id: 5, name: "Almacenes Éxito", shortName: "AX", color: "#F44336" },
  { id: 6, name: "Plaza Don Camilo", shortName: "PDC", color: "#9C27B0" },
];

const statuses: IProductStatus[] = [
  { id: 1, name: "Disponible" },
  { id: 2, name: "Agotado" },
  { id: 3, name: "Próximo a vencer" },
];

function NewProductForm({ product }: { product: IProduct | undefined }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const schemaNewProduct = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().optional(),
    unitId: z.number().int().min(1, "Debe seleccionar una unidad"),
    price: z.number().min(0.01, "El precio debe ser mayor a 0"),
    categoryId: z.number().int().min(1, "Debe seleccionar una categoría"),
    placeId: z.number().int().min(1, "Debe seleccionar un lugar"),
    statusId: z.number().int().min(1, "Debe seleccionar un estado"),
    observation: z.string().optional(),
    image: z.string().optional(),
    enabled: z.boolean().default(true),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  });

  type ProductType = z.infer<typeof schemaNewProduct>;

  const form = useForm<ProductType>({
    resolver: zodResolver(schemaNewProduct),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      unitId: product?.unitId ?? 0,
      price: product?.price ?? 0,
      categoryId: product?.categoryId ?? 0,
      placeId: product?.placeId ?? 0,
      statusId: product?.statusId ?? 0,
      observation: product?.observation ?? "",
      image: product?.image ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: ProductType) => {
    let responseProduct;
    console.log(data);
    if (params?.id) {
      responseProduct = await null;
      // apiService.update<Partial<IProduct>, IProduct>(
      //   "products",
      //   Number(params.id),
      //   data as IProduct
      // );
    } else {
      responseProduct = await null;
      // apiService.create<IProduct, IProduct>(
      //   "products",
      //   data as IProduct
      // );
    }

    if (!responseProduct.status) {
      console.log(responseProduct.message);
      return;
    }

    console.log(responseProduct.response);
    router.refresh();
    router.push("/products");
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    id="description"
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
            name="unitId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="unitId">Unidad</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger id="unitId">
                      <SelectValue placeholder="Seleccione la Unidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((item: IUnit) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    id="price"
                    autoComplete="off"
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="categoryId">Categoría</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Seleccione la Categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((item: ICategory) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="placeId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="placeId">Lugar</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger id="placeId">
                      <SelectValue placeholder="Seleccione el Lugar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {places.map((item: IPlace) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="statusId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="statusId">Estado</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger id="statusId">
                      <SelectValue placeholder="Seleccione el Estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((item: IProductStatus) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="observation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="observation">Observación</FormLabel>
                <FormControl>
                  <Textarea {...field} id="observation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <Button type="submit">
            {params.id ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewProductForm;
