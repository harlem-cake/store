"use client";

import * as React from "react";
import * as emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
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
import { PALETTE, FONT_STACK } from "@/lib/theme";

type Props = {
  accent: string;             // rosa/azul según la tienda
  shopName: string;           // Harlem Cakes / Scoops
  triggerLabel?: string;
  triggerClassName?: string;
};

export default function ContactModal({
  accent,
  shopName,
  triggerLabel = "Escríbenos",
  triggerClassName,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");

  // rate limit simple (15s) + honeypot
  const canSend = () => {
    const last = Number(localStorage.getItem("contact_last") || "0");
    const now = Date.now();
    if (now - last < 15_000) return false;
    localStorage.setItem("contact_last", String(now));
    return true;
  };

  const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      Swal.fire({
        icon: "error",
        title: "Configuración incompleta",
        text: "Faltan credenciales de EmailJS en .env.local",
        confirmButtonColor: accent,
      });
      return;
    }
    if (!canSend()) {
      Swal.fire({
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
        title: "⏳ Espera un momento antes de enviar de nuevo",
        background: "#FFF6F1",
        color: PALETTE.brown,
      });
      return;
    }

    const fd = new FormData(e.currentTarget);
    // honeypot
    if ((fd.get("website") as string)?.trim()) return;

    const params = {
      from_name:  name,
      from_email: email,
      message:    msg,
      subject:    `Consulta desde la web — ${shopName}`,
      page:       typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      setLoading(true);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });

      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Te responderemos muy pronto 💌",
        confirmButtonColor: accent,
      });

      setName(""); setEmail(""); setMsg("");
      setOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "No se pudo enviar",
        text: "Intenta nuevamente o contáctanos por Instagram/WhatsApp",
        confirmButtonColor: accent,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={triggerClassName ?? "px-4 py-2 rounded-xl text-sm shadow-sm transition"}
          style={{ background: accent, color: PALETTE.brown, border: `1px solid ${accent}` }}
        >
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md rounded-2xl shadow-lg"
        style={{ borderColor: `${accent}66`, background: PALETTE.white, backdropFilter: "none" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: PALETTE.brown, fontFamily: FONT_STACK.display }}>
            Contáctanos
          </DialogTitle>
          <DialogDescription>
            Déjanos un mensajito y te responderemos a la brevedad.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={onSubmit}>
          {/* honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-2">
            <label className="text-sm" style={{ color: PALETTE.brown }}>Nombre</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-xl border outline-none"
              style={{ borderColor: `${accent}66`, color: PALETTE.brown, background: "#fff" }}
              placeholder="Tu nombre"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" style={{ color: PALETTE.brown }}>Correo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-xl border outline-none"
              style={{ borderColor: `${accent}66`, color: PALETTE.brown, background: "#fff" }}
              placeholder="tucorreo@dominio.com"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" style={{ color: PALETTE.brown }}>Mensaje</label>
            <textarea
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              className="px-3 py-2 rounded-xl border outline-none resize-none"
              style={{ borderColor: `${accent}66`, color: PALETTE.brown, background: "#fff" }}
              placeholder="¿En qué te ayudamos?"
            />
          </div>

          <DialogFooter className="mt-2 flex gap-2 sm:justify-end">
            <DialogClose asChild>
              <button
                type="button"
                className="px-3 py-2 rounded-xl border"
                style={{ borderColor: `${accent}66`, color: PALETTE.brown, background: "transparent" }}
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 rounded-xl"
              style={{ background: accent, color: PALETTE.brown, border: `1px solid ${accent}` }}
            >
              {loading ? "Enviando…" : "Enviar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
