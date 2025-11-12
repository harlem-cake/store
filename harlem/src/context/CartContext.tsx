"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import type { LineItem } from "@/lib/products";

type Ctx = {
  items: LineItem[];
  add: (it: Omit<LineItem, "qty">) => void;
  inc: (id: string, d: number) => void;
  remove: (id: string) => void;
  total: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<LineItem[]>([]);
  const add = (it: Omit<LineItem, "qty">) =>
    setItems(xs => {
      const f = xs.find(x => x.id === it.id);
      return f ? xs.map(x => (x.id === it.id ? { ...x, qty: x.qty + 1 } : x)) : [...xs, { ...it, qty: 1 }];
    });
  const inc = (id: string, d: number) =>
    setItems(xs => xs.map(x => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const remove = (id: string) => setItems(xs => xs.filter(x => x.id !== id));
  const total = useMemo(() => items.reduce((a, b) => a + b.price * b.qty, 0), [items]);

  return <CartCtx.Provider value={{ items, add, inc, remove, total }}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
