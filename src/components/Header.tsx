import { Link, NavLink } from "react-router";
import { ShoppingBag } from "lucide-react";

import CartBadge from "../features/cart/CartBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-indigo-950 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <ShoppingBag size={22} />
          </div>

          <span className="text-lg font-bold tracking-tight text-white sm:text-2xl">
           Yusuf Product Store
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hidden text-base font-semibold transition hover:text-gray-300 sm:block ${
                isActive ? "text-white" : "text-gray-200"
              }`
            }
          >
            Products
          </NavLink>

          <CartBadge />
        </nav>
      </div>
    </header>
  );
}