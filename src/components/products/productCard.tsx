"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { removeProduct } from "@/queries/products.api";
import { IProduct } from "@/interfaces/schemas/IProduct";

export function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  if (!product) return null;

  const handlerRemoveProduct = async (id?: number) => {
    if (!id) return;
    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (!isConfirmed) {
      return;
    }

    const response = await removeProduct(id);

    if (!response.status) {
      console.log(response.message);
    }

    router.refresh();
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={() => product.id && router.push(`/products/${product.id}`)}
    >
      <CardHeader>
        <CardTitle>{product.name || "Producto sin nombre"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">
          Precio:
          <span className="font-medium ml-2">
            {product.price ? `$ ${product.price}` : "No disponible"}
          </span>
        </p>
        <p className="font-bold">
          Clasificación:
          <span className="font-medium ml-2">
            {product.clasification || "No especificada"}
          </span>
        </p>
        <p className="font-bold">
          Categoría:
          <span className="font-medium ml-2">
            {product.category || "No especificada"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="default"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product.id}/edit`);
          }}
        >
          Editar
        </Button>

        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            if (!product.id) return;
            handlerRemoveProduct(product.id);
          }}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
