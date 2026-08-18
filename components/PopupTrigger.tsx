"use client";
import { useEffect } from "react";
import { useModal } from "./ModalProvider";

export default function PopupTrigger({ enabled, delayMs }: { enabled: boolean; delayMs: number }) {
  const { open } = useModal();
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("rt-popup-shown") === "1") return;
    const t = setTimeout(() => {
      sessionStorage.setItem("rt-popup-shown", "1");
      open();
    }, Math.max(0, delayMs || 6000));
    return () => clearTimeout(t);
  }, [enabled, delayMs, open]);
  return null;
}
