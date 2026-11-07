import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeFromCart } from "../../api/cart";
import { cartKeys } from "./cartKeys";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      return removeFromCart(productId);
    },

    onSuccess: (updatedCart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        updatedCart,
      );
    },
  });
}