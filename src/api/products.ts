import axios from "axios";

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export async function getProducts() {
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return response.data;
}
