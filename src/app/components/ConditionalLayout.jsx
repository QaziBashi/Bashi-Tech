"use client";
import { useEffect, useState } from "react";

const ConditionalLayout = ({ children, showNavbar = true, showFooter = true }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render navbar/footer on auth pages
  const isAuthPage = typeof window !== 'undefined' && 
    window.location.pathname.includes('/auth');

  return (
    <>
      {mounted && showNavbar && !isAuthPage && (
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {/* Your existing Navbar component */}
        </nav>
      )}
      
      {children}
      
      {mounted && showFooter && !isAuthPage && (
        <footer style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          background: 'white',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }}>
          {/* Your existing Footer component */}
        </footer>
      )}
    </>
  );
};

export default ConditionalLayout;