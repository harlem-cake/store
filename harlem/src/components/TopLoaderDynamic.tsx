"use client";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { PALETTE } from "@/lib/theme";

export default function TopLoaderDynamic() {
  const pathname = usePathname();

  const color =
    pathname.startsWith("/cakes")
      ? PALETTE.pink
      : pathname.startsWith("/scoops")
      ? PALETTE.blue
      : PALETTE.brown;

  return (
    <NextTopLoader
      color={color}
      height={3}
      showSpinner={false}
      crawl
      crawlSpeed={200}
      speed={400}
      shadow="0 0 10px rgba(0,0,0,0.08)"
      zIndex={2000}
    />
  );
}
