"use client";

import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { PALETTE, FONT_STACK } from "@/lib/theme";

export default function CakesPage() {
  const banners = [
    { src: "/banners/cakes/1.png", caption: "Harlem Cake — Amor a primera mordida" },
    { src: "/banners/cakes/2.png", caption: "Sin gluten, suaves y ricas" },
    { src: "/banners/cakes/3.png", caption: "Pedidos por WhatsApp" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 pb-24">
      {/* Carrusel hero */}
      <div className="my-8">
        <BannerCarousel images={banners} accent={PALETTE.pink} />
      </div>

      {/* ======== Header de Menú (ancla) ======== */}
      <section id="menu" className="scroll-mt-28 mb-6">
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: FONT_STACK.display, color: "#5a4638" }}
        >
          Menú
        </h2>
        <p className="mt-1 text-sm sm:text-base" style={{ color: "#6c5a4c" }}>
          Galletas sin gluten, suaves y ricas — elige tus favoritas 🍪
        </p>
      </section>

      {/* Grilla de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.cakes.map((p) => (
          <ProductCard key={p.id} p={p} kind="cakes" />
        ))}
      </div>
    </main>
  );
}
