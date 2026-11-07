import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "../features/cart/useCart";
import { useRemoveFromCart } from "../features/cart/useRemoveFromCart";

import { cartKeys } from "../features/cart/cartKeys";
import { updateCart } from "../api/cart";

import type { Cart } from "../types/cart";

export default function CartPage() {
  const queryClient = useQueryClient();

  const { products, total, count } = useCart();

  const removeMutation = useRemoveFromCart();

  const updateQuantity = (
    productId: number,
    change: number,
  ) => {
    const currentCart = queryClient.getQueryData<Cart>(
      cartKeys.detail(),
    );

    if (!currentCart) return;

    const updatedCart: Cart = {
      products: currentCart.products
        .map((item) => item.id === productId ? {
                ...item,
                quantity: Math.min(
                  Math.max(item.quantity + change, 0),
                  item.stock,
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    };

    queryClient.setQueryData(
      cartKeys.detail(),
      updatedCart,
    );

    updateCart(updatedCart);
  };

  if (products.length === 0) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-blue-100 p-6 text-blue-600">
          <ShoppingBag size={40} />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Shopping cart
        </h1>

        <p className="mt-2 text-gray-500">
          You have {count} items in your cart.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center"
            >
              <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-3 sm:w-28">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 font-bold text-blue-600">
                  ${item.price.toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.stock} available
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-1">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, -1)
                      }
                      className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-5 text-center text-sm font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.title} quantity`}
                      disabled={item.quantity >= item.stock}
                      onClick={() =>
                        updateQuantity(item.id, 1)
                      }
                      className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={removeMutation.isPending}
                    onClick={() =>
                      removeMutation.mutate(item.id)
                    }
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-400">
                  Subtotal
                </p>

                <p className="mt-1 text-lg font-extrabold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-gray-900">
            Order summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Items</span>
              <span>{count}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">
                Free
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-extrabold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="mt-7 block w-full rounded-xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-700"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}