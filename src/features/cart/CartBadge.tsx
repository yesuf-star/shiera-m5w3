import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { useCart } from "./useCart";

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Shopping cart, ${count} items`}
      className="relative flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-gray-800 transition hover:bg-gray-200"
    >
      <ShoppingCart size={20} />

      <span className="text-sm font-semibold">Cart</span>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-bold text-white"
      >
        {count}
      </span>
    </Link>
  );
}