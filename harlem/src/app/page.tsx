// src/app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cake");
  }, [router]);
  return null;
}

// import { redirect } from "next/navigation";

// export default function Page() {
//   // 🚀 Redirección temporal directa a Harlem Cakes
//   redirect("/cake");

//   /* 
//   🔸 Vista original del selector de tiendas (pausada temporalmente)

//   import Link from "next/link";
//   import { PALETTE, FONT_STACK } from "@/lib/theme";

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-16">
//       <div className="grid md:grid-cols-2 gap-6">
//         <Link href="/cakes" className="rounded-3xl p-10 shadow" style={{ background: PALETTE.pink }}>
//           <h2 className="text-3xl" style={{ fontFamily: FONT_STACK.display, color: PALETTE.brown }}>Harlem Cake</h2>
//           <p className="mt-2 text-neutral-700">Galletas artesanales 100% sin gluten.</p>
//         </Link>
//         <Link href="/scoops" className="rounded-3xl p-10 shadow hidden" style={{ background: PALETTE.blue }}>
//           <h2 className="text-3xl" style={{ fontFamily: FONT_STACK.display, color: PALETTE.brown }}>Harlem Scoops</h2>
//           <p className="mt-2 text-neutral-700">Mystery Scoops divertidos.</p>
//         </Link>
//       </div>
//     </main>
//   );
//   */
// }
