// src/app/(auth)/layout.js - Auth group layout (no navbar/footer)
export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}