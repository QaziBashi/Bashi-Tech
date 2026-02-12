// Add to pages where you want to hide navbar/footer
// For auth pages:
// <div className="auth-page-container">

// CSS:
// .auth-page-container nav,
// .auth-page-container footer {
//   display: none !important;
// }

export default function AuthPage({ children }) {
  return (
    <div className="auth-page-container">
      {children}
    </div>
  );
}