import { queryOptions } from "@tanstack/react-query";

import { productApi } from "../api/products";

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (page: number) =>
    [...productKeys.lists(), page] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...productKeys.details(), id] as const,

  searches: () => [...productKeys.all, "search"] as const,

  search: (query: string) =>
    [...productKeys.searches(), query] as const,
};

export const productListOptions = (page: number) =>
  queryOptions({
    queryKey: productKeys.list(page),
    queryFn: () => productApi.getProducts(page),
  });

export const productDetailOptions = (id: number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getProduct(id),
  });

export const productSearchOptions = (query: string) =>
  queryOptions({
    queryKey: productKeys.search(query),
    queryFn: () => productApi.searchProducts(query),
    enabled: query.trim().length >= 2,
  });