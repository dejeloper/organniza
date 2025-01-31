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
  defaultValuesNewProduct,
  itemsCategory,
  itemsClasification,
  ProductType,
  schemaNewProduct,
} from "@/validators/products/new-form-validate";
import { ICategory } from "@/interfaces/ICategory";
import { IClasification } from "@/interfaces/IClasification";

function NewProductForm() {
  const form = useForm<ProductType>({
    resolver: zodResolver(schemaNewProduct),
    defaultValues: defaultValuesNewProduct,
  });

  const onReset = () => {
    form.reset(defaultValuesNewProduct);
  };

  const onSubmit = form.handleSubmit(async (data: ProductType) => {
    console.log({ msg: "Enviando información", data });
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
          <Button type="button" variant="outline" onClick={() => onReset()}>
            Limpiar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}

export default NewProductForm;
