import { ShoppingCart } from "lucide-react";

import type { Product } from "../../types/product";
import { useAddToCart } from "./useAddToCart";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({product,}: AddToCartButtonProps) {
  const addToCart = useAddToCart();

  return (
    <button
      type="button"
      disabled={addToCart.isPending || product.stock <= 0}
      onClick={() => addToCart.mutate(product)}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      <ShoppingCart size={18} />

      {addToCart.isPending ? "Adding..." : product.stock <= 0 ? "Out of stock" : "Add to cart"}
    </button>
  );
}