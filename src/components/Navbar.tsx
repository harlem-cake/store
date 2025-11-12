"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

import { useCart } from "@/context/CartContext";
import CartPanel from "@/components/CartPanel";
import { LOGOS } from "@/lib/assets";
import { PALETTE } from "@/lib/theme";

// Fuentes personalizadas
import { Playfair_Display, Quicksand, Parisienne } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] }); // Cakes
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500"] }); // Scoops
const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] }); // tagline cakes

export default function Navbar() {
  const { items } = useCart();
  const pathname = usePathname();

  const isCakes = pathname.startsWith("/cakes");
  const isScoops = pathname.startsWith("/scoops");
  const accent = isScoops ? PALETTE.blue : PALETTE.pink;
  const logo = isScoops ? LOGOS.scoops : LOGOS.cakes;
  const shopName = isScoops ? "Harlem Scoops" : "Harlem Cake";

  const [openCart, setOpenCart] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  // activo para Inicio
  const isHomeActive = isCakes || pathname === "/";

  // cerrar menú móvil al navegar
  React.useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <div className={`sticky top-0 z-50 ${isScoops ? quicksand.className : playfair.className}`}>
      {/* Barra pastel */}
      <div
        className="border-b shadow-sm"
        style={{ borderColor: `${accent}55`, background: `${accent}` }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Fila principal */}
          <div className="flex items-center justify-between gap-3">
            {/* Izquierda: Logo + nombre */}
            <Link href={isScoops ? "/scoops" : "/cake"} className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src={logo}
                  alt={shopName}
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-2xl tracking-tight"
                  style={{ color: PALETTE.brown, letterSpacing: "0.3px" }}
                >
                  {shopName}
                </span>
                {!isScoops && (
                  <span
                    className={`${parisienne.className} text-sm`}
                    style={{ color: `${PALETTE.brown}cc`, marginTop: "-2px" }}
                  >
                    Cookies sin gluten
                  </span>
                )}
              </div>
            </Link>

            {/* Centro: Nav desktop */}
            <nav
              className="hidden sm:flex items-center gap-1 rounded-2xl p-1"
              style={{ background: `${PALETTE.white}AA` }}
              aria-label="Secciones"
            >
              <Link
                href="/cake"
                className="px-4 py-2 rounded-2xl text-sm transition"
                style={{
                  color: PALETTE.brown,
                  background: isHomeActive ? `${accent}55` : "transparent",
                  border: `1px solid ${accent}`,
                }}
              >
                Inicio
              </Link>
              <Link
                href="/cake#menu"
                className="px-4 py-2 rounded-2xl text-sm transition"
                style={{ color: PALETTE.brown, border: `1px solid ${accent}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}22`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Menú
              </Link>
              <Link
                href="https://wa.me/56912345678"
                target="_blank"
                className="px-4 py-2 rounded-2xl text-sm transition"
                style={{ color: PALETTE.brown, border: `1px solid ${accent}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}22`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Contacto
              </Link>
            </nav>

            {/* Derecha: botones (mobile: hamburguesa + carrito) */}
            <div className="flex items-center gap-2">
              {/* Botón menú móvil */}
              <button
                className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-2xl border"
                style={{ borderColor: `${PALETTE.white}AA`, background: `${PALETTE.white}AA`, color: PALETTE.brown }}
                aria-label="Abrir menú"
                onClick={() => setOpenMenu((v) => !v)}
              >
                {openMenu ? <X size={18} /> : <Menu size={18} />}
              </button>

              {/* Carrito */}
              <button
                onClick={() => setOpenCart(true)}
                className="relative inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-2xl border transition"
                style={{ borderColor: `${PALETTE.white}AA`, background: `${PALETTE.white}AA`, color: PALETTE.brown }}
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={18} />
                <span>{items.length}</span>
                {items.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: accent }}
                  >
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Menú móvil desplegable */}
          {openMenu && (
            <div
              className="sm:hidden mt-3 rounded-2xl overflow-hidden border"
              style={{ borderColor: `${accent}66`, background: `${PALETTE.white}F2` }}
            >
              <div className="flex flex-col">
                <Link
                  href="/cakes"
                  className="px-4 py-3 text-sm"
                  style={{
                    color: PALETTE.brown,
                    background: isHomeActive ? `${accent}33` : "transparent",
                    borderBottom: `1px solid ${accent}33`,
                  }}
                  onClick={() => setOpenMenu(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/cakes#menu"
                  className="px-4 py-3 text-sm"
                  style={{ color: PALETTE.brown, borderBottom: `1px solid ${accent}33` }}
                  onClick={() => setOpenMenu(false)}
                >
                  Menú
                </Link>
                <Link
                  href="https://wa.me/56912345678"
                  target="_blank"
                  className="px-4 py-3 text-sm"
                  style={{ color: PALETTE.brown }}
                  onClick={() => setOpenMenu(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selector de tienda con pastilla (desactivado de momento, NO borrar) */}
      {/*
      <nav
        className="relative flex items-center gap-2 rounded-2xl p-1"
        style={{ background: `${PALETTE.white}AA` }}
      >
        <div className="relative">
          <Link
            href="/cakes"
            className="relative px-4 py-2 rounded-2xl inline-flex items-center gap-2"
            style={{ color: PALETTE.brown, fontSize: "0.95rem" }}
          >
            <span>Harlem Cakes</span>
            {isCakes && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-2xl -z-10"
                style={{ background: PALETTE.pink }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        </div>

        <div className="relative">
          <Link
            href="/scoops"
            className="relative px-4 py-2 rounded-2xl inline-flex items-center gap-2"
            style={{ color: PALETTE.brown, fontSize: "0.95rem" }}
          >
            <span>Harlem Scoops</span>
            {isScoops && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-2xl -z-10"
                style={{ background: PALETTE.blue }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        </div>
      </nav>
      */}

      {/* Sheet del carrito */}
      <CartPanel open={openCart} onOpenChange={setOpenCart} />
    </div>
  );
}
