// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const AdminGuard = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAdminAccess = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           router.push("/auth/login");
//           return;
//         }

//         // Verify admin role with backend
//         const response = await fetch("http://localhost:4000/api/admin-verify", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           router.push("/auth/login");
//           return;
//         }

//         const data = await response.json();
//         if (!data.isAdmin) {
//           alert("Access denied: Admin privileges required");
//           router.push("/");
//           return;
//         }

//         setIsAdmin(true);
//       } catch (error) {
//         console.error("Admin verification failed:", error);
//         router.push("/auth/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAdminAccess();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Verifying admin access...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">
//             <h2 className="font-semibold text-lg mb-2">Access Denied</h2>
//             <p>You need admin privileges to access this page.</p>
//             <p className="text-sm mt-2">Redirecting to login...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default AdminGuard;
