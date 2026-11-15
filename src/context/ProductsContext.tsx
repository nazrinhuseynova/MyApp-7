import React, { createContext, useContext, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (
    name: string,
    price: number,
    description: string,
    imageUrl: string,
  ) => void;
  updateProduct: (
    id: string,
    name: string,
    price: number,
    description: string,
  ) => void;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 1500,
    description: "Powerful laptop for work",
    imageUrl: "",
  },
  {
    id: "2",
    name: "Phone",
    price: 900,
    description: "Smartphone with great camera",
    imageUrl: "",
  },
];

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (
    name: string,
    price: number,
    description: string,
    imageUrl: string,
  ) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price,
      description,
      imageUrl,
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (
    id: string,
    name: string,
    price: number,
    description: string,
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, name, price, description } : product,
      ),
    );
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}
