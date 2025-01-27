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
import { Button } from "../ui/button";

function NewPorductForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      place: "",
      category: "",
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormControl>
              <Input type="text" {...field} id="name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="price">Precio</FormLabel>
            <FormControl>
              <Input type="number" {...field} id="price" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="place"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="place">Lugar</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent id="place">
                  <SelectItem disabled value="0" />
                  <SelectItem value="1">D1</SelectItem>
                  <SelectItem value="2">Zapatoca</SelectItem>
                  <SelectItem value="3">Metro</SelectItem>
                  <SelectItem value="4">Plaza Paloquemado</SelectItem>
                  <SelectItem value="5">Otro</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="category"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="category">Categoría</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent id="category">
                  <SelectItem disabled value="0" />
                  <SelectItem value="1">Proteina</SelectItem>
                  <SelectItem value="2">Carbohidratos</SelectItem>
                  <SelectItem value="3">Frutas</SelectItem>
                  <SelectItem value="4">Vegetales</SelectItem>
                  <SelectItem value="5">Lácteos</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex justify-end mt-8 gap-4">
        <Button type="reset" variant="outline">
          Limpiar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </Form>
  );
}

export default NewPorductForm;

{
  /* 
<form>
<div className="grid w-full items-center gap-4">
	<div className="flex flex-col space-y-1.5">
		<Label htmlFor="namePro">Name</Label>
		<Input id="name" placeholder="Name of your project" />
	</div>
	<div className="flex flex-col space-y-1.5">
		<Label htmlFor="framework">Framework</Label>
		<Select>
			<SelectTrigger id="framework">
				<SelectValue placeholder="Select" />
			</SelectTrigger>
			<SelectContent position="popper">
				<SelectItem value="next">Next.js</SelectItem>
				<SelectItem value="sveltekit">SvelteKit</SelectItem>
				<SelectItem value="astro">Astro</SelectItem>
				<SelectItem value="nuxt">Nuxt.js</SelectItem>
			</SelectContent>
		</Select>
	</div>
</div>
</form> 
*/
}
