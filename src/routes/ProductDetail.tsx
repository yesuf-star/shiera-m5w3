import { useParams, Link } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { productDetailOptions } from "../queries/products";
import { isHttpError } from "../api/https";

import ProductSkeleton from "../components/ProductSkeleton";
import AddToCartButton from "../features/cart/AddToCartButton";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();

  const productId = Number(id);

  const isValidId = id !== undefined && /^\d+$/.test(id) && Number.isSafeInteger(productId) && productId > 0;

  const productQuery = useQuery({
    ...productDetailOptions(isValidId ? productId : 0),
    enabled: isValidId,
  });

  if (!isValidId) {
    return <NotFound />;
  }

  if (productQuery.isPending) {
    return <ProductSkeleton />;
  }

  if (productQuery.isError) {
    if (isHttpError(productQuery.error) && productQuery.error.status === 404) {
      return (
        <NotFound
          title="Product not found"
          message="This product does not exist or may have been removed."
        />
      );
    }

    return (
      <NotFound
        title="Unable to load product"
        message="Please check your connection and try again."
      />
    );
  }

  const product = productQuery.data;

  return (
    <div>
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to products
      </Link>

      <div className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-gray-50 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-105 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-amber-500">
            <Star size={19} fill="currentColor" />

            <span className="font-semibold">
              {product.rating}
            </span>

            <span className="text-sm text-gray-400">
              · {product.stock} available
            </span>
          </div>

          <p className="mt-6 leading-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-7 text-3xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <p
            className={`mt-2 text-sm ${
              product.stock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          <div className="mt-7">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}