"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProduct } from "@/interfaces/schemas/IProduct";
import PriceChangeIndicator from "./priceChangeIndicator";
import Image from "next/image";
import { apiService } from "@/services/apiServices";

export function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  if (!product) return null;

  const handlerRemoveProduct = async (id?: number) => {
    if (!id) return;

    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (!isConfirmed) return;

    const responseProduct = await apiService.delete<IProduct>("products", id);

    if (!responseProduct.status) {
      console.log(responseProduct.message);
      return;
    }

    router.refresh();
  };

  const getRandomVariant = () => {
    const variants = ["up", "down", "same"];
    return variants[Math.floor(Math.random() * variants.length)];
  };

  return (
    <>
      <Card className="p-6 rounded-xl shadow-lg flex flex-col transition-transform hover:scale-105 cursor-pointer dark:hover:bg-gray-900 hover:bg-neutral-200">
        <CardContent className="p-0 m-0">
          <Image
            src="/products/mercado.jpg"
            alt="mercado"
            width={600}
            height={176}
            className="rounded-lg mb-4"
          />

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
              {product.place?.name}
            </span>
          </div>
          <p className="text-sm mb-2">
            {product.description ? product.description?.slice(0, 100) : "_"}
          </p>
          <p className="font-medium mb-3">
            <span className="font-semibold mr-2">$ {product.price}</span>
            <PriceChangeIndicator variant={getRandomVariant()} />
          </p>
          <div className="flex gap-2 mb-3">
            <span className="bg-green-500 text-black text-xs px-3 py-1 rounded-full">
              🫕 {product.category?.name}
            </span>
          </div>
          <p className="text-sm flex items-center">
            🛒 Última compra:
            <span className="ml-1 text-green-600 font-semibold">
              2024-01-10*
            </span>
          </p>
          <p className="text-red-500 text-xs mt-2">⚠️ Pendiente por comprar</p>
          <div className="flex items-center mt-2">
            <Image
              src="/profile/anny.avif"
              className="w-9 h-9 rounded-full border-2 border-gray-900"
              alt="Anny"
              title="Anny"
              width={40}
              height={40}
            />

            <span className="text-xs ml-3">
              Editado: <span className="font-semibold">Anny</span>
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-3 mt-5 py-0 px-6">
          <Button
            variant="outline"
            className="border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}/edit`);
            }}
          >
            ✏️ Editar
          </Button>
          <Button
            variant="outline"
            className="border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500/60 transition"
            onClick={(e) => {
              e.stopPropagation();
              if (!product.id) return;
              handlerRemoveProduct(product.id);
            }}
          >
            ❌ Eliminar
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
