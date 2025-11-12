"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PALETTE } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  alt?: string;
  caption?: string;
};

type Props = {
  images: Slide[];
  accent?: string;      // color para controles y dots (por defecto rosa)
  className?: string;   // estilos extra del contenedor
  intervalMs?: number;  // autoplay (ms)
};

export default function BannerCarousel({
  images,
  accent = PALETTE.pink,
  className,
  intervalMs = 4500,
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const total = images.length;

  // autoplay
  React.useEffect(() => {
    if (hover || total <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
    return () => clearInterval(t);
  }, [hover, total, intervalMs]);

  // teclado
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const go = (i: number) => setIndex((i + total) % total);

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl overflow-hidden shadow",
        "aspect-[16/9] bg-[#f7efe9]",
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0.0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.995 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Image
            src={images[index]?.src}
            alt={images[index]?.alt ?? `slide-${index + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Caption opcional */}
          {images[index]?.caption && (
            <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-6">
              <div
                className="inline-block backdrop-blur-sm rounded-2xl px-4 py-2 text-sm sm:text-base"
                style={{
                  background: `${accent}cc`,
                  color: "#5a4638",
                }}
              >
                {images[index].caption}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      {total > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full shadow-md grid place-items-center transition hover:scale-105"
            style={{ background: PALETTE.white, border: `1px solid ${accent}` }}
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full shadow-md grid place-items-center transition hover:scale-105"
            style={{ background: PALETTE.white, border: `1px solid ${accent}` }}
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: i === index ? 20 : 8,
                  background: i === index ? accent : `${accent}66`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
