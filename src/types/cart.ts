export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
}

export interface Cart {
  products: CartItem[];
}

export interface CartApiResponse {
  id: number;
  products: {
    id: number;
    quantity: number;
  }[];
}