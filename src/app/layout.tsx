import type { Metadata } from "next";
import "./globals.css";
import TopLoaderDynamic from "@/components/TopLoaderDynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteTransition from "@/components/RouteTransition";
import { CartProvider } from "@/context/CartContext";
import { FONT_STACK, PALETTE } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Harlem Cake",
  description: "Galletas tipo Crumble sin gluten.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{ background: PALETTE.white, fontFamily: FONT_STACK.body }}
      >
        <TopLoaderDynamic />
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

