"use client"; // ✅ must be first line

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/page";

export default function ClientNavbarFooter({ children }) {
  const pathname = usePathname();

  // Pages where Navbar/Footer should be hidden
  const hideLayout =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
