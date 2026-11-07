import { fetchJson } from "./https";
import type { Product, ProductResponse } from "../types/product";

const LIMIT = 12;

export const productApi = {
  getProducts: (page: number) => {
    const skip = (page - 1) * LIMIT;

    return fetchJson<ProductResponse>(`/products?limit=${LIMIT}&skip=${skip}`,);
  },

  getProduct: (id: number) =>fetchJson<Product>(`/products/${id}`),

  searchProducts: (query: string) =>fetchJson<ProductResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=100`,
    ),
};

export { LIMIT };  