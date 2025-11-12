"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { clp, FONT_STACK, PALETTE } from "@/lib/theme";
import { ShoppingCart, Trash2, Minus, Plus, X } from "lucide-react";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export default function CartPanel({ open, onOpenChange }: Props) {
  const { items, inc, remove, total, /* @ts-ignore */ clear } = useCart();

  // Color principal según tienda
  const pathname = usePathname();
  const accent = pathname.startsWith("/scoops") ? PALETTE.blue : PALETTE.pink;

  const checkout = () => {
    const phone = "56912345678"; // <- cámbialo por el tuyo
    const lines = items
      .map((i) => `• ${i.title} x${i.qty} — ${clp(i.price * i.qty)}`)
      .join("%0A");
    const msg = encodeURIComponent(
      `Hola! Quiero hacer este pedido:%0A${lines}%0ATotal: ${clp(
        total
      )}%0A\nNombre:`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  // Limpiar carrito
  const clearCart = () => {
    if (typeof clear === "function") {
      clear();
    } else {
      for (const it of items) remove(it.id);
    }

    // 🔔 Toast pequeño
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1300,
      timerProgressBar: true,
      title: "🧺 Carrito vaciado",
      background: "#FFF6F1",
      color: PALETTE.brown,
      customClass: { popup: "rounded-2xl shadow-md" },
      didOpen: (t) => {
        (t as HTMLElement).style.border = `1px solid ${accent}`;
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[420px] max-w-[92vw] p-0">
        {/* HEADER */}
        <SheetHeader className="p-5 border-b" style={{ borderColor: `${accent}66` }}>
          <div className="flex items-center gap-3">
            <SheetTitle
              className="flex items-center gap-2"
              style={{ color: PALETTE.brown, fontFamily: FONT_STACK.display }}
            >
              <ShoppingCart /> Tu carrito
            </SheetTitle>

            <div className="ml-auto flex items-center gap-2">
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: `${accent}55`, color: PALETTE.brown }}
              >
                {items.length} ítem(s)
              </span>

              {/* Botón cerrar */}
              <SheetClose asChild>
                <button
                  className="flex items-center justify-center h-7 w-7 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 hover:rotate-90 focus:outline-none"
                  style={{
                    border: `1.5px solid ${accent}`,
                    backgroundColor: `${accent}22`,
                    color: PALETTE.brown,
                  }}
                >
                  <X className="h-4 w-4 transition-transform duration-300" />
                </button>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>

        {/* BODY */}
        <div className="h-[calc(100svh-236px)] overflow-auto p-4 space-y-3">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-center py-16 rounded-2xl"
                style={{ background: `${accent}22`, color: PALETTE.brown }}
              >
                <div className="text-4xl mb-2">（╥﹏╥）</div>
                <p className="text-sm">Aún no agregas nada. ¡Elige algo rico!</p>
              </motion.div>
            ) : (
              items.map((it) => (
                <motion.div
                  key={it.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-2xl p-3 flex items-center gap-3 border shadow-sm"
                  style={{ background: "#fff", borderColor: `${accent}66` }}
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: PALETTE.brown }}>
                      {it.title}
                    </p>
                    <p className="text-xs opacity-70 truncate" style={{ color: PALETTE.brown }}>
                      Valor: {clp(it.price)}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 rounded-lg border transition-colors"
                      style={{ borderColor: `${accent}66` }}
                      onClick={() => inc(it.id, -1)}
                      aria-label="Disminuir"
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}15`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm" style={{ color: PALETTE.brown }}>
                      {it.qty}
                    </span>
                    <button
                      className="p-2 rounded-lg border transition-colors"
                      style={{ borderColor: `${accent}66` }}
                      onClick={() => inc(it.id, +1)}
                      aria-label="Aumentar"
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}15`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Eliminar individual */}
                  <button
                    className="p-2 rounded-xl transition"
                    onClick={() => remove(it.id)}
                    aria-label="Eliminar"
                    title="Eliminar"
                    style={{ color: PALETTE.brown, background: `${accent}20` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}35`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = `${accent}20`)}
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <SheetFooter className="p-5 border-t sticky bottom-0 bg-white" style={{ borderColor: `${accent}66` }}>
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: PALETTE.brown }}>
                Subtotal
              </span>
              <b style={{ color: PALETTE.brown }}>{clp(total)}</b>
            </div>
            <p className="text-[11px] opacity-70" style={{ color: PALETTE.brown }}>
              Entregas/retira a coordinar por WhatsApp.
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl flex-1"
                disabled={!items.length}
                style={{
                  background: "transparent",
                  color: PALETTE.brown,
                  border: `1px solid ${accent}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}12`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Vaciar carrito
              </Button>

              <Button
                disabled={!items.length}
                className="rounded-2xl flex-1 transition-transform active:scale-[0.98]"
                style={{ background: accent, color: PALETTE.brown, border: `1px solid ${accent}` }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.98)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                onClick={checkout}
              >
                Finalizar por WhatsApp
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
