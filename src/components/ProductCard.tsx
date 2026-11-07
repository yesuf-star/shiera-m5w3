import { Link } from "react-router";
import { Star } from "lucide-react";

import type { Product } from "../types/product";
import { useQueryClient } from "@tanstack/react-query";
import { productDetailOptions } from "../queries/products";

import AddToCartButton from "../features/cart/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product,}: ProductCardProps) {
  const queryClient = useQueryClient();

  const prefetchProduct = () => {
    queryClient.prefetchQuery(
      productDetailOptions(product.id),
    );
  };

  return (
    <article className="group overflow-hidden  rounded-2xl border text-center border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <Link
        to={`/products/${product.id}`}
        onMouseEnter={prefetchProduct}
        onFocus={prefetchProduct}
        className="block"
      >
        <div className="flex items-center justify-between px-4 bg-gray-300 py-2">
          <span className="text-xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <span className="flex items-center gap-1 text-sm text-amber-500">
            <Star size={16} fill="currentColor" />
            {product.rating}
          </span>
        </div>

        <div className="flex h-52 items-center justify-center bg-gray-50 p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5 bg-amber-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {product.category}
        </p>
      <h3 className="mt-2 line-clamp-2 font-bold text-gray-900">
           {product.title}
      </h3>
       

        <Link
          to={`/products/${product.id}`}
          onMouseEnter={prefetchProduct}
          onFocus={prefetchProduct}
          className="my-4 inline-flex rounded-xl px-2  py-2.5 text-center font-semibold text-white bg-orange-600 transition hover:bg-orange-700"
        >
          View Product
        </Link>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}