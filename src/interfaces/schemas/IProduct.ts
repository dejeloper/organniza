import {ICategory} from "../ICategory";
import {IPlace} from "../shared/IPlace";
import {IProductStatus} from "../shared/IStatus";
import {IUnit} from "../shared/IUnit";

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  unitId: number;
  price: number;
  categoryId: number;
  placeId: number;
  statusId: number;
  observation?: string;
  image?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;

  unit?: IUnit;
  category?: ICategory;
  place?: IPlace;
  status?: IProductStatus;
}
