"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PALETTE, FONT_STACK } from "@/lib/theme";
import { LOGOS } from "@/lib/assets";
import ContactModal from "@/components/ContactModal";

// Fuentes como en el navbar
import { Playfair_Display, Quicksand } from "next/font/google";
const playfair  = Playfair_Display({ subsets: ["latin"], weight: ["600"] }); // Cakes
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500"] });        // Scoops

export default function Footer() {
  const pathname = usePathname();
  const isScoops = pathname.startsWith("/scoops");
  const accent   = isScoops ? PALETTE.blue : PALETTE.pink;
  const shopName = isScoops ? "Harlem Scoops" : "Harlem Cake";
  const logo     = isScoops ? LOGOS.scoops : LOGOS.cakes;

  return (
    <footer
      className={`mt-10 border-t ${isScoops ? quicksand.className : playfair.className}`}
      style={{ background: `${accent}22`, borderColor: `${accent}66` }}
    >
      {/* Top */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-3 items-center">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src={logo}
              alt={shopName}
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div>
            <p
              className="text-lg leading-none"
              style={{ fontFamily: FONT_STACK.display, color: PALETTE.brown }}
            >
              {shopName}
            </p>
            <p className="text-xs opacity-70" style={{ color: PALETTE.brown }}>
              Tiendita de Galletas tipo crumble sin gluten.
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-3 text-sm justify-start sm:justify-center">
          <Link
            href="/cake"
            className="px-3 py-1.5 rounded-xl border transition"
            style={{
              borderColor: `${PALETTE.pink}66`,
              background: pathname.startsWith("/cake") ? `${PALETTE.pink}33` : "transparent",
              color: PALETTE.brown,
            }}
          >
            Harlem Cake
          </Link>

          {/* Cuando quieras volver a mostrar Scoops, descomenta:
          <Link
            href="/scoops"
            className="px-3 py-1.5 rounded-xl border transition"
            style={{
              borderColor: `${PALETTE.blue}66`,
              background: pathname.startsWith("/scoops") ? `${PALETTE.blue}33` : "transparent",
              color: PALETTE.brown,
            }}
          >
            Harlem Scoops
          </Link> */}

          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl border transition"
            style={{ borderColor: `${accent}66`, color: PALETTE.brown }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}22`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/harlem.cake/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl border transition"
            style={{ borderColor: `${accent}66`, color: PALETTE.brown }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}22`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            Instagram
          </a>
        </nav>

        {/* Botón -> modal con mini formulario */}
        <div className="flex justify-start sm:justify-end">
          <ContactModal
            accent={accent}
            shopName={shopName}
            triggerLabel="Escríbenos"
            triggerClassName="px-4 py-2 rounded-xl text-sm shadow-sm transition"
          />
        </div>
      </div>

      {/* Bottom */}
      <div
        className="py-4"
        style={{ background: `${accent}33`, borderTop: `1px solid ${accent}66` }}
      >
        <div
          className="max-w-6xl mx-auto px-4 text-center text-sm"
          style={{ color: PALETTE.brown, fontFamily: FONT_STACK.body }}
        >
          © {new Date().getFullYear()} Harlem — Hecho con ♥ · {isScoops ? "Scoops misteriosos" : "Cookies sin gluten"}
        </div>
      </div>
    </footer>
  );
}
