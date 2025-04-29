import { create } from "zustand";
import axios from "axios";

export type Product = {
  product_id: number;
  product_name: string;
  product_value: number;
  product_type: string;
  product_origin: string;
  product_hour: Date;
};

export type ProductStore = {
  products: Product[];
  buyProducts: Product[];
  sellProducts: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<Product, "product_id" | "product_hour">
  ) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
};

const useStore = create<ProductStore>((set, get) => ({
  products: [],
  buyProducts: [],
  sellProducts: [],
  fetchProducts: async () => {
    const res = await axios.get<Product[]>("/api/produtos");
    const data = res.data;
    set({
      products: data,
      buyProducts: data.filter((p) => p.product_type === "compra"),
      sellProducts: data.filter((p) => p.product_type === "venda"),
    });
  },
  addProduct: async (product: any) => {
    const res = await axios.post("/api/produtos", product);
    const newProduct = res.data;
    const state = get();
    set({
      products: [...state.products, newProduct],
      buyProducts:
        newProduct.product_type.toLowerCase() === "compra"
          ? [...state.buyProducts, newProduct]
          : state.buyProducts,
      sellProducts:
        newProduct.product_type.toLowerCase() === "venda"
          ? [...state.sellProducts, newProduct]
          : state.sellProducts,
    });
  },
  removeProduct: async (id) => {
    try {
      await axios.delete(`/api/produtos/${id}`);
      const state = get();
      const updatedProducts = state.products.filter((p) => p.product_id !== id);
      set({
        products: updatedProducts,
        buyProducts: updatedProducts.filter((p) => p.product_type === "compra"),
        sellProducts: updatedProducts.filter((p) => p.product_type === "venda"),
      });
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  },
}));

export default useStore;
