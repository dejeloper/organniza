"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/apiServices";
import { IProduct } from "@/interfaces/schemas/IProduct";

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

  return (
    <div
      className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col transition-transform hover:scale-105 cursor-pointer"
      onClick={() => product.id && router.push(`/products/${product.id}`)}
    >
      <img
        src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6"
        alt="Arroz"
        className="w-full h-44 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {product.clasification}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-2">Grano de calidad premium.</p>
      <p className="text-green-400 font-medium mb-3">
        <span className="font-semibold mr-2">$ {product.price}</span>
        <span className="text-sm text-red-500">↓ Bajó de precio</span>
      </p>
      <div className="flex gap-2 mb-3">
        <span className="bg-green-500 text-black text-xs px-3 py-1 rounded-full">
          🫕 {product.category}
        </span>
      </div>
      <p className="text-sm text-gray-400 flex items-center">
        🛒 Última compra:
        <span className="ml-1 text-green-400 font-semibold">2024-01-10</span>
      </p>
      <p className="text-red-500 text-xs mt-2">⚠️ Pendiente por comprar</p>
      <div className="flex items-center mt-2">
        <img
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="w-9 h-9 rounded-full border-2 border-gray-900"
          title="Anny"
        />
        <span className="text-xs text-gray-400 ml-3">
          Editado: <span className="text-gray-200 font-semibold">Anny</span>
        </span>
      </div>
      <div className="flex gap-3 justify-end mt-5">
        <Button
          variant="outline"
          className="text-gray-300 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product.id}/edit`);
          }}
        >
          ✏️ Editar
        </Button>
        <Button
          variant="outline"
          className="text-gray-300 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500/60 hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            if (!product.id) return;
            handlerRemoveProduct(product.id);
          }}
        >
          ❌ Eliminar
        </Button>
      </div>
    </div>
  );
}
