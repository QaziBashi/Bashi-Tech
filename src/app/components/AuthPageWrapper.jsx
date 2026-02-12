"use client";
import { useEffect } from "react";

export default function AuthPageWrapper({ children }) {
  useEffect(() => {
    // Hide navbar and footer on auth pages
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Restore when leaving page
    return () => {
      if (navbar) navbar.style.display = 'block';
      if (footer) footer.style.display = 'block';
    };
  }, []);

  return children;
}