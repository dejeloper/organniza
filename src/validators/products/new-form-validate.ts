import {z} from "zod";
import {ICategory} from "@/interfaces/ICategory";
import {IClasification} from "@/interfaces/IClasification";

export type ProductType = z.infer<typeof schemaNewProduct>;



export const itemsClasification: IClasification[] = [
  {id: 1, name: "Proteina"},
  {id: 2, name: "Despensa"},
  {id: 3, name: "Frutas/Verduras"},
  {id: 4, name: "Aseo"},
  {id: 5, name: "Plaza"},
  {id: 6, name: "Hogar"},
  {id: 7, name: "Otro"},
];

const validClasificationNames = itemsClasification.map((item) => item.name) as [
  string,
  ...string[]
];

export const itemsCategory: ICategory[] = [
  {id: 1, name: "Proteina"},
  {id: 2, name: "Carbohidratos"},
  {id: 3, name: "Frutas"},
  {id: 4, name: "Vegetales"},
  {id: 5, name: "Lácteos"},
  {id: 6, name: "Despensa"},
  {id: 7, name: "Casa"},
];

const validCategoryNames = itemsCategory.map((item) => item.name) as [
  string,
  ...string[]
];

export const schemaNewProduct = z.object({
  name: z
    .string({required_error: "El nombre es requerido"})
    .min(3, {message: "El nombre debe tener al menos 3 caracteres"})
    .max(50, {message: "El nombre no puede tener más de 50 caracteres"}),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => val > 0, {message: "El precio es requerido"})
    .refine((val) => val >= 100, {message: "El precio es muy bajo"})
    .refine((val) => val < 1000000, {message: "El precio es muy alto"}),
  clasification: z.enum(validClasificationNames, {
    required_error: "La clasificación es requerida",
    message: "La clasificación no es válida",
  }),
  category: z.enum(validCategoryNames, {
    required_error: "La categoría es requerida",
    message: "La categoría no es válida",
  }),
});
