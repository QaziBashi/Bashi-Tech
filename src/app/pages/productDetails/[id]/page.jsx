// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// const ProductDetails = () => {
//   const params = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!params.id) return;

//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `http://localhost:4000/api/products/${params.id}`,
//         );
//         const data = await res.json();
//         if (data.success) {
//           setProduct(data.product);
//         } else {
//           setError("Product not found");
//         }
//       } catch (error) {
//         setError("Failed to fetch product details");
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="w-full h-screen bg-amber-200 flex items-center justify-center">
//         <div>Loading product details...</div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="w-full h-screen bg-amber-200 flex items-center justify-center">
//         <div>{error || "Product not found"}</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full h-screen bg-amber-200 flex items-center justify-center">
//         <div className="w-[1000px] flex justify-between bg-white rounded-[12px] p-7">
//           {/* Product Image */}
//           <div className="flex items-center justify-center w-[450px] h-70vh rounded-[12px]">
//             <img
//               src={product.images?.[0] || "abc"}
//               alt="Image is Missing"
//               className="w-[450px] h-55vh p-3 object-cover"
//             />
//           </div>

//           {/* Product Info */}
//           <div className="w-[450px] h-70vh bg-white p-3">
//             <div className="flex flex-col gap-3">
//               <h5>Bashi Tech -</h5>
//               <h3 className="text-xl font-bold">{product.name}</h3>

//               <div className="flex gap-7 items-center">
//                 <h5 className="text-2xl font-medium">${product.price}</h5>

//                 <h5 className="line-through">${product.discount}</h5>
//               </div>

//               <div className="flex flex-col gap-3">
//                 <h5 className="font-medium">Brand: {product.brand}</h5>
//                 <h5 className="font-medium">Category: {product.category}</h5>
//                 <h5 className="font-medium">
//                   In Stock: {product.stockQuantity}
//                 </h5>
//                 <p>Details:{product.description}</p>
//               </div>

//               {/* <div>
//                 <h5 className="font-semibold">Description:</h5>
//                 <p>{product.description}</p>

//                 <div className="w-full flex justify-between pt-7">
//                   <button className="w-[130px] rounded-[8px] h-[35px] bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white cursor-pointer text-center text-[14px]">
//                     Add To Cart
//                   </button>

//                   <Link href="/pages/checkOutDetails">
//                     <button className="w-[130px] rounded-[8px] h-[35px] bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white cursor-pointer text-center text-[14px]">
//                       CheckOut Now
//                     </button>
//                   </Link>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchProductDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/products/${params.id}`,
        );
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.log("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [params.id]);
  if (!product) return;

  return (
    <div className="h-screen bg-gray-100 py-12 mt-15 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={product.images?.[0] || abc}
            alt={product.name}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-teal-600">
                ${product.price}
              </span>

              <span className="line-through text-gray-400">
                ${product.discount}
              </span>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-medium">Stock:</span>{" "}
                {product.stockQuantity}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition shadow">
              Add To Cart
            </button>

            <button className="flex-1 border border-teal-600 text-teal-600 hover:bg-teal-50 py-3 rounded-lg font-medium transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
