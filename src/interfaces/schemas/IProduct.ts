import { ICategory } from "@/interfaces/ICategory";
import { IClasification } from "@/interfaces/IClasification";

export interface IProduct {
  name: string;
  price: number;
  clasification?: IClasification;
  category?: ICategory;
}
