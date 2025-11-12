"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PALETTE, FONT_STACK, clp } from "@/lib/theme";
import { useCart } from "@/context/CartContext";
import type { Kind } from "@/lib/products";
import { Shuffle, Eye } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

// shadcn/ui dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function ProductCard({ p, kind }: { p: any; kind: Kind }) {
  const { add } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // 🎨 color de acento por tienda (rosa cakes / azul scoops)
  const isScoops = pathname.startsWith("/scoops");
  const accent = isScoops ? PALETTE.blue : PALETTE.pink;

  // ✅ toast cute
  const toastAdded = (msg: string, emoji: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1400,
      timerProgressBar: true,
      title: `${emoji} ${msg}`,
      background: "#FFF6F1",
      color: PALETTE.brown,
      customClass: { popup: "rounded-2xl shadow-md" },
      didOpen: (t) => {
        (t as HTMLElement).style.border = `1px solid ${accent}`;
      },
    });
  };

  const addAndToast = () => {
    add({ id: p.id, title: p.title, price: p.price, kind });
    toastAdded("¡Agregado al carrito!", isScoops ? "🍦" : "🍪");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card
        className="
          group rounded-2xl overflow-hidden border-0 h-full flex flex-col
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-lg
          "
        style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}
      >
        {/* Imagen — clic abre modal */}
        <DialogTrigger asChild>
          <button
            type="button"
            className="
              relative w-full overflow-hidden rounded-2xl cursor-pointer
              bg-[#FFF6F1]
              aspect-[1/1] md:aspect-[1/1]
              ring-0 transition-all duration-300
              group-hover:ring-2
              focus:outline-none focus:ring-0 focus-visible:ring-0
            "
            style={{ borderColor: "transparent" }}
            aria-label={`Ver detalle de ${p.title}`}
          >
            <Image
              src={p.img.startsWith("/") ? p.img : `/${p.img}`}
              alt={p.title}
              fill
              className="
                object-contain object-center
                transition-transform duration-300
                group-hover:scale-[1.03]
              "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {/* aro de color en hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ boxShadow: `inset 0 0 0 0px transparent` }}
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
            />
          </button>
        </DialogTrigger>

        {/* Contenido */}
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                style={{ fontFamily: FONT_STACK.display, color: PALETTE.brown }}
                className="text-lg line-clamp-1"
                title={p.title}
              >
                {p.title}
              </h3>
              <p
                className="text-sm text-neutral-600 line-clamp-2"
                style={{ fontFamily: FONT_STACK.body }}
                title={kind === "cakes" ? p.tag : p.rarity}
              >
                {kind === "cakes" ? p.tag : p.rarity}
              </p>
            </div>
            <p className="font-semibold shrink-0" style={{ color: PALETTE.brown }}>
              {clp(p.price)}
            </p>
          </div>

          {/* Botones */}
          <div className="mt-auto pt-3 flex items-center gap-2">
            <Button
              className="rounded-xl transition-transform active:scale-[0.98]"
              style={{ background: accent, color: PALETTE.brown, borderColor: accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(0.98)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
              }}
              onClick={addAndToast}
            >
              Añadir
            </Button>

            {/* Ver detalle — alternativa al click en la imagen */}
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                style={{
                  borderColor: `${accent}`,
                  color: PALETTE.brown,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${accent}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver detalle
              </Button>
            </DialogTrigger>

            {/* Solo Scoops: Aleatorio */}
            {kind === "scoops" && (
              <Button
                variant="outline"
                className="rounded-xl"
                style={{
                  borderColor: accent,
                  color: PALETTE.brown,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${accent}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => {
                  add({
                    id: p.id + "-rnd",
                    title: `${p.title} (Sorpresa)`,
                    price: p.price,
                    kind,
                  });
                  toastAdded("¡Scoop sorpresa agregado!", "✨");
                }}
              >
                <Shuffle className="mr-2 h-4 w-4" /> Aleatorio
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MODAL DE DETALLE */}
      <DialogContent
        className="max-w-2xl overflow-hidden rounded-2xl p-0"
        style={{ borderColor: `${accent}66`, background: "#FFFDFB" }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagen grande */}
          <div
            className="relative bg-[#FFF6F1] aspect-[1/1] md:aspect-auto md:min-h-[380px]"
            style={{ borderRight: `1px solid ${accent}33` }}
          >
            <Image
              src={p.img.startsWith("/") ? p.img : `/${p.img}`}
              alt={p.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Info */}
          <div className="p-5 md:p-6 flex flex-col">
            <DialogHeader className="p-0">
              <DialogTitle
                className="text-2xl"
                style={{ color: PALETTE.brown, fontFamily: FONT_STACK.display }}
              >
                {p.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detalle del producto
              </DialogDescription>
            </DialogHeader>

            <p
              className="mt-2 text-sm leading-relaxed whitespace-pre-line"
              style={{ color: PALETTE.brown, fontFamily: FONT_STACK.body }}
            >
              {kind === "cakes" ? p.tag : p.rarity}
            </p>

            <div className="mt-4 mb-3 text-lg font-semibold" style={{ color: PALETTE.brown }}>
              {clp(p.price)}
            </div>

            <div className="mt-auto flex gap-2 pt-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  style={{
                    borderColor: `${accent}66`,
                    color: PALETTE.brown,
                    background: "transparent",
                  }}
                >
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                className="rounded-xl"
                style={{ background: accent, color: PALETTE.brown, border: `1px solid ${accent}` }}
                onClick={() => {
                  addAndToast();
                  setOpen(false);
                }}
              >
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
