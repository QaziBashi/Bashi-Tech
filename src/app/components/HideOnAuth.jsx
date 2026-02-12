"use client";
import { usePathname } from "next/navigation";

export default function HideOnAuth({ children, hidePrefixes = ["/auth"] }) {
  const pathname = usePathname() || "";
  const shouldHide = hidePrefixes.some((p) => pathname.startsWith(p));
  if (shouldHide) return null;
  return <>{children}</>;
}
