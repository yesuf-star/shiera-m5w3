import { fetchJson } from "./https";

import type { Product } from "../types/product";
import type {Cart, CartApiResponse, CartItem,} from "../types/cart";

const CART_STORAGE_KEY = "product-store-cart";

// Get cart from LocalStorage
export function getCart(): Cart {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return { products: [] };
    }

    const parsedCart: unknown = JSON.parse(storedCart);

    if (typeof parsedCart === "object" &&
      parsedCart !== null &&
      "products" in parsedCart &&
      Array.isArray(parsedCart.products)
    ) {
      return parsedCart as Cart;
    }

    return { products: [] };
  } catch {
    return { products: [] };
  }
}

// Save cart to LocalStorage
export function updateCart(cart: Cart): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Create cart item from product
export function createCartItem(product: Product): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity: 1,
    stock: product.stock,
  };
}

// Add product to cart using DummyJSON POST
export async function addToCart(product: Product): Promise<CartApiResponse> {
  // Validate product
  await fetchJson<Product>(`/products/${product.id}`);

  // Send POST request
  return fetchJson<CartApiResponse>("/carts/add", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: product.id,
          quantity: 1,
        },
      ],
    }),
  });
}

// Remove product from cart
export function removeFromCart(productId: number): Cart {
  const cart = getCart();

  const updatedCart: Cart = {
    products: cart.products.filter(
      (item) => item.id !== productId,
    ),
  };

  updateCart(updatedCart);

  return updatedCart;
}