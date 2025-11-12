"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { PALETTE } from "@/lib/theme";

/** Barra superior indeterminada (sin libs) */
function TopLoadingBar({ show }: { show: boolean }) {
  // track siempre fijo; segmento animado solo cuando show = true
  return (
    <div className="fixed left-0 top-0 w-full h-1 z-[60] pointer-events-none">
      {/* pista súper sutil */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: PALETTE.white }}
      />
      {show && (
        <motion.div
          className="h-full"
          style={{
            // degradé pastel (queda MUY visible)
            background: `linear-gradient(90deg, ${PALETTE.pink}, ${PALETTE.blue}, ${PALETTE.mint})`,
            boxShadow: `0 0 8px ${PALETTE.pink}`,
          }}
          // animación indeterminada
          initial={{ x: "-40%", width: "28%", opacity: 1 }}
          animate={{ x: ["-40%", "60%", "110%"] }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        />
      )}
    </div>
  );
}

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Activa la barra ~600ms en cada cambio de ruta
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Contenido: fade corto (sin overlays que tapen la vista) */}
        <motion.div
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[10]"
        >
          {children}
        </motion.div>

        {/* Barra de carga visible */}
        <TopLoadingBar show={loading} />
      </motion.div>
    </AnimatePresence>
  );
}
