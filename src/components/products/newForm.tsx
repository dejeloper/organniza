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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  itemsCategory,
  itemsClasification,
  ProductType,
  schemaNewProduct,
} from "@/validators/products/new-form-validate";
import { ICategory } from "@/interfaces/ICategory";
import { IClasification } from "@/interfaces/IClasification";
import { createProduct, updateProduct } from "@/queries/products.api";
import { useParams, useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/schemas/IProduct";

function NewProductForm({ product }: { product: IProduct | undefined }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const form = useForm<ProductType>({
    resolver: zodResolver(schemaNewProduct),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      clasification: product?.clasification ?? "",
      category: product?.category ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: ProductType) => {
    if (params?.id) {
      const response = await updateProduct(Number(params.id), data);

      if (!response.status) {
        console.log(response.message);
        return;
      }
      console.log(response.response);
    } else {
      const response = await createProduct(data);

      if (!response.status) {
        console.log(response.message);
        return;
      }
      console.log(response.response);
    }

    router.push("/products");
    router.refresh();
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            name="clasification"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="clasification">Clasificación</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="clasification">
                      <SelectValue placeholder="Seleccione la Clasificación" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {itemsClasification.map((item: IClasification) => (
                      <SelectItem key={item.id} value={item.name}>
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
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="category">Categoría</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleccione la Categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {itemsCategory.map((item: ICategory) => (
                      <SelectItem key={item.id} value={item.name}>
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
