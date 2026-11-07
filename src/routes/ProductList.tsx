import { useDeferredValue, useState } from "react";
import { useSearchParams } from "react-router";

import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import NotFound from "./NotFound";

import { useQuery } from "@tanstack/react-query";

import {productListOptions, productSearchOptions,} from "../queries/products";

import { LIMIT } from "../api/products";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const page = Math.max(1,Number(searchParams.get("page")) || 1,);

  const deferredSearch = useDeferredValue(search.trim());

  const isSearching = deferredSearch.length >= 2;

  const productsQuery = useQuery({
    ...productListOptions(page),
    placeholderData: (previousData) => previousData,
  });

  const searchQuery = useQuery({
    ...productSearchOptions(deferredSearch),
    enabled: deferredSearch.length >= 2,
  });

  const activeQuery = isSearching
    ? searchQuery
    : productsQuery;

  const products = activeQuery.data?.products ?? [];

  const totalPages = Math.ceil(
    (productsQuery.data?.total ?? 0) / LIMIT,
  );

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
      <section>
        <div className="text-center mb-4 sm:mb-8">
          <p className="text-2xl font-bold uppercase tracking-[0.2em] text-indigo-950 underline">
            Welcome to our store
          </p>

          <h1 className="mt-4 text-lg font-bold leading-tight sm:text-5xl">
            Find the products you love.
          </h1>

          <p className="mt-4 text-sm leading-7 sm:text-base">
            Explore a carefully selected collection of products designed to meet your needs. 
            Find quality, style, and value in one place.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          

          <SearchBar
            value={search}
            onChange={setSearch}
          />
        </div>

        {search.trim().length === 1 && (
          <p className="mb-5 text-sm text-gray-500">
            Enter at least 2 characters to search.
          </p>
        )}

        {activeQuery.isPending && <ProductSkeleton />}

        {activeQuery.isError && (
          <NotFound
            title="Something went wrong"
            message="We couldn't load the products. Please try again."
          />
        )}

        {!activeQuery.isPending &&
          !activeQuery.isError &&
          products.length === 0 && (
            <NotFound
              title="No products found"
              message="Try searching with a different keyword."
            />
          )}

        {products.length > 0 && (
          <>
            <div
              className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                activeQuery.isPlaceholderData ||
                activeQuery.isFetching
                  ? "opacity-60"
                  : ""
              }`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {activeQuery.isFetching && (
              <p className="mt-4 text-center text-xs text-gray-400">
                Updating products...
              </p>
            )}
          </>
        )}

        {!isSearching && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={productsQuery.isPlaceholderData}
          />
        )}
      </section>
  
  );
}