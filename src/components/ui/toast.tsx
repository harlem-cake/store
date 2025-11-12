// src/components/ui/toast.tsx
import * as React from "react";

export type ToastActionElement = React.ReactElement | null;

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;

  // ➜ estas dos son necesarias para el hook use-toast
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

// Bus sencillo/no-op para no romper en producción
type Listener = (t: ToastProps) => void;
const listeners: Listener[] = [];

export function toast(props: ToastProps) {
  if (process.env.NODE_ENV !== "production") {
    // console.debug("toast:", props);
  }
  listeners.forEach((l) => l(props));
}

export function Toaster() {
  return null; // stub sin UI
}

export function useToastBus(cb: Listener) {
  React.useEffect(() => {
    listeners.push(cb);
    return () => {
      const i = listeners.indexOf(cb);
      if (i >= 0) listeners.splice(i, 1);
    };
  }, [cb]);
}
