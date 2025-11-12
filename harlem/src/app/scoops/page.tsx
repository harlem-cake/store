"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { LOGOS } from "@/lib/assets";
import { PALETTE, FONT_STACK } from "@/lib/theme";

export default function ScoopsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 pb-24">
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="rounded-3xl p-8 my-8 shadow"
        style={{ background: PALETTE.blue }}
      >
        <div className="flex items-center gap-4">
          <Image src={LOGOS.scoops} alt="Harlem Scoops Logo" width={56} height={56} className="" />
          <div>
            <h1 className="text-4xl" style={{ fontFamily: FONT_STACK.display, color: PALETTE.brown }}>
              Harlem Scoops
            </h1>
            <p className="mt-1">Compra y descubre sorpresas tiernas en cada scoop.</p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.scoops.map((p) => (
          <ProductCard key={p.id} p={p} kind="scoops" />
        ))}
      </div>

    </main>
  );
}
