/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        // Applies this header to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Allow connections to self and your backend server.
            // You may need to adjust this depending on other external resources you use.
            value:
              "default-src 'self'; connect-src 'self' http://localhost:4000 https://*.stripe.com wss://*.stripe.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com https://*.stripe.com; font-src 'self'; frame-src 'self' https://*.stripe.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
