// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";

// import { useState } from "react";
// import React from "react";
// import { useEffect } from "react";
// import Link from "next/link";
// import { headers } from "next/headers";
// const CartProdut = () => {
//   const [cartItem, setCartItem] = useState([]);

//   const stirpePromice = loadStripe(
//     process.env.NEXT_PUBLIC_STIRPE_PUBLISHABLE - KEY,
//   );

//  const secretKey=async()=>{
//   let secret= await fetch("/api/payment",{
//     method:'POST',
//       headers:{
//         "Content-Type":"application/json"
//       },
//     body:JSON.stringify()
//   })
//  }

//   useEffect(() => {
//     const handleCartProduct = async () => {
//       const token = localStorage.getItem("token");
//       //   console.log(token);
//       try {
//         let res = await fetch("http://localhost:4000/api/cart", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await res.json();
//         if (data.success) {
//           console.log("check the data", data);
//           setCartItem(data.cart);
//           // Save cart items to localStorage for checkout
//           localStorage.setItem("cartItems", JSON.stringify(data.cart));
//         }
//       } catch (error) {
//         console.log("Something went Wrong", error);
//       }
//     };
//     handleCartProduct();
//   }, []);

//   console.log(" Cart Items", cartItem);
//   return (
//     <div className="flex flex-col gap-3 item-center justify-center mt-40">
//       {/* <div className="flex  items-center"> */}
//       <div className="w-full flex flex-col gap-7 items-center justify-center">
//         {/* <p className="text-9xl">This is cart Page</p> */}

//         {cartItem.map((cartData) => (
//           <div
//             className="w-250 h-40 flex items-center justify-center bg-white rounded-[18px] border border-[#E5E7EB] shadow-sm
//       "
//           >
//             <div className="w-full h-30 flex items-center justify-center px-10">
//               <div className=" w-70 h-auto flex item-center justify-center gap-2 p-3 ">
//                 <div className="w-50 h-30 bg-green-400 ">
//                   <img src="" alt="Product image" />
//                 </div>
//                 <p>name:{cartData.fullData.name}</p>
//               </div>
//               <div className=" w-full h-auto flex item-center justify-center gap-[5px]">
//                 <button className="w-5 h-5 bg-white flex items-center justify-center text-[18px]">
//                   -
//                 </button>
//                 <input
//                   type="text"
//                   className="w-8 h-6 p-[3px] outline-none border text-[14px]"
//                   placeholder={`${cartData.fullData.quantity}`}
//                 />
//                 <button className="w-5 h-5 bg-white flex items-center justify-center text-[18px]">
//                   +
//                 </button>
//               </div>
//               {/* <input t>$333</input> */}
//               <input
//                 type="text"
//                 placeholder={`${cartData.fullData.price}`}
//                 className="w-10 h-5"
//               />
//             </div>
//           </div>
//         ))}
//         {/* </div> */}
//         {/* <Link href="/pages/checkOutDetails">
//           <button className="w-[130px] rounded-[8px] h-[35px] bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white cursor-pointer text-center text-[14px]">
//             CheckOut Now
//           </button>
//         </Link> */}

//         <Dialog>
//           <DialogTrigger asChild>
//             <Button size="lg" className="w-full">
//               Purchase
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Complete Your Order</DialogTitle>

//               <EmbeddedCheckoutProvider>
//                 <EmbeddedCheckout />
//               </EmbeddedCheckoutProvider>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="border-b pb-4">
//                 <h3 className="font-semibold mb-2">Order Summary</h3>
//                 <p className="text-gray-600">
//                   Your order details will appear here.
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Click "Continue to Payment" to proceed with payment or "Cancel
//                   Payment" to go back.
//                 </p>
//               </div>
//             </div>
//             <DialogFooter className="gap-3">
//               <DialogClose asChild>
//                 <Button variant="secondary">Cancel Payment</Button>
//               </DialogClose>
//               <Button>Continue to Payment</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default CartProdut;
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";

// import { useState, useEffect, useCallback } from "react";
// import React from "react";

// // Initialize Stripe outside the component to avoid re-creation on every render
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
// );

// const CartProdut = () => {
//   const [cartItem, setCartItem] = useState([]);

//   // 1. Fetch Client Secret from your API
//   const fetchClientSecret = useCallback(async () => {
//     // We send the cart items to the backend to create a Checkout Session
//     const res = await fetch("/api/payment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: cartItem }),
//     });
//     const data = await res.json();
//     return data.clientSecret;
//   }, [cartItem]);

//   const options = { fetchClientSecret };

//   useEffect(() => {
//     const handleCartProduct = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         let res = await fetch("http://localhost:4000/api/cart", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await res.json();
//         if (data.success) {
//           setCartItem(data.cart);
//         }
//       } catch (error) {
//         console.error("Something went Wrong", error);
//       }
//     };
//     handleCartProduct();
//   }, []);

//   return (
//     <div className="flex flex-col gap-3 items-center justify-center mt-40">
//       <div className="w-full flex flex-col gap-7 items-center justify-center">
//         {/* Cart items list mapping (Keep your existing map logic here) */}
//         {cartItem.map((cartData, index) => (
//           <div
//             key={index}
//             className="w-250 h-40 flex items-center justify-center bg-white rounded-[18px] border border-[#E5E7EB] shadow-sm"
//           >
//             <p className="px-10">name: {cartData.fullData.name}</p>
//             <p className="px-10">${cartData.fullData.price}</p>
//           </div>
//         ))}

//         <Dialog>
//           <DialogTrigger asChild>
//             <Button size="lg" className="w-64">
//               Purchase Items
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Complete Your Order</DialogTitle>
//             </DialogHeader>

//             {/* 2. Stripe Checkout Integration */}
//             <div className="mt-4 min-h-[400px]">
//               {cartItem.length > 0 ? (
//                 <EmbeddedCheckoutProvider
//                   stripe={stripePromise}
//                   options={options}
//                 >
//                   <EmbeddedCheckout />
//                 </EmbeddedCheckoutProvider>
//               ) : (
//                 <p>Your cart is empty.</p>
//               )}
//             </div>

//             <DialogFooter className="flex justify-between border-t pt-4">
//               <DialogClose asChild>
//                 <Button variant="secondary">Go Back</Button>
//               </DialogClose>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default CartProdut;
// "use client";
// // import { useCart } from "../cartContext/page";
// import { useCart } from "@/app/pages/cartContext/page";
// // import { useCart } from "@/app/pages/cartContext/page";
// import React, { useState, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { Atom, ShoppingCart, Trash2, ShieldCheck } from "lucide-react";

// // Initialize Stripe with your Public Key
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
// );

// const CartProduct = () => {
//   // 1. Fetch the Client Secret from your API to initialize payment methods
//   const { cartItem, setCartItem, handleDeleteFromCart } = useCart();
//   const fetchClientSecret = useCallback(async () => {
//     const res = await fetch("/api/payment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: cartItem }),
//     });
//     const data = await res.json();
//     return data.clientSecret;
//   }, [cartItem]);

//   const options = { fetchClientSecret };

//   // 2. Cart items are now managed by the context provider

//   // const handleDeleteFromCart = async (item) => {
//   //   const token = localStorage.getItem("token");
//   //   try {
//   //     let res = await fetch(`http://localhost:4000/api/cart/${item._id}`, {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     const data = await res.json();
//   //     if (data.success) {
//   //       console.log("Remove from cart", item.name);
//   //       // setAddToCart((prev) => ({ ...prev, [item._id]: false }));
//   //       // <CartProduct cartItem={cart} onDelete={handleDeleteFromCart}/>
//   //     }
//   //     setCartItem((prev) => prev.filter((cart) => cart._id !== item._id));
//   //   } catch (error) {
//   //     console.log("Something went wrong", error);
//   //   }
//   // };
//   return (
//     <div className="max-w-4xl mx-auto mt-20 p-6">
//       <div className="flex items-center justify-between mb-8 border-b pb-4">
//         <h1 className="text-3xl font-bold flex items-center gap-3">
//           <ShoppingCart className="w-8 h-8" /> Shopping Cart
//         </h1>
//         <p className="text-gray-500">{cartItem.length} Items</p>
//       </div>

//       {/* --- PRODUCT LIST --- */}
//       <div className="space-y-4 mb-10">
//         {cartItem.length > 0 ? (
//           cartItem.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
//                   {/* Replace with your actual image field */}
//                   {/* <img src={item.fullData.image} */}

//                   <img src={item.fullData.images?.[0] || "abc"} alt="product" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     {item.fullData.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 font-medium">
//                     Price: ${item.fullData.price}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-6">
//                 <div className="flex items-center border rounded-lg">
//                   <button className="px-3 py-1 hover:bg-gray-100">-</button>
//                   <span className="px-3 font-medium">
//                     {item.fullData.quantity || 1}
//                   </span>
//                   <button className="px-3 py-1 hover:bg-gray-100">+</button>
//                 </div>
//                 <button
//                   className="text-red-400 hover:text-red-600"
//                   onClick={() => handleDeleteFromCart(item)}
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-20 text-gray-400">
//             Your cart is empty
//           </div>
//         )}
//       </div>

//       {/* --- TOTAL & PURCHASE BUTTON --- */}
//       {cartItem.length > 0 && (
//         <div className="flex flex-col items-end gap-4">
//           <div className="text-right">
//             <p className="text-gray-500">Subtotal</p>
//             <p className="text-2xl font-bold">
//               $
//               {cartItem
//                 .reduce(
//                   (acc, item) =>
//                     acc + item.fullData.price * (item.fullData.quantity || 1),
//                   0,
//                 )
//                 .toFixed(2)}
//             </p>
//           </div>

//           {/* THE DIALOG TRIGGER */}
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 size="xl"
//                 className="w-full md:w-64 h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-105"
//               >
//                 Checkout Now
//               </Button>
//             </DialogTrigger>

//             {/* THE POPUP BOX */}
//             <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 overflow-hidden">
//               <DialogHeader className="p-6 border-b bg-gray-50/50">
//                 <DialogTitle className="flex items-center gap-2 text-2xl">
//                   <Atom className="w-6 h-6 text-blue-600 animate-spin-slow" />
//                   Secure Payment
//                 </DialogTitle>
//                 <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
//                   <ShieldCheck className="w-4 h-4" />
//                   <span>Encrypted by Stripe</span>
//                 </div>
//               </DialogHeader>

//               {/* PAYMENT METHODS RENDER HERE */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 <EmbeddedCheckoutProvider
//                   stripe={stripePromise}
//                   options={options}
//                 >
//                   <EmbeddedCheckout />
//                 </EmbeddedCheckoutProvider>
//               </div>

//               <DialogFooter className="p-4 border-t bg-gray-50">
//                 <DialogClose asChild>
//                   <Button variant="ghost" className="w-full">
//                     Cancel and return to cart
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartProduct;
"use client";

import React, { useCallback, useState } from "react";

import { useCart } from "@/app/cartContext/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import CustomPaymentForm from "@/app/components/CustomPaymentForm";
import { ShoppingCart, Trash2 } from "lucide-react";

const CartProduct = () => {
  const { cartItem, handleDeleteFromCart, setCartItem } = useCart();
  const [productQuantity, setProductQuantity] = useState(1);
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItem }),
    });
    const data = await res.json();
    return data.clientSecret;
  }, [cartItem]);

  const options = { fetchClientSecret };

  const handleIncreaseQuantity = async (productId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:4000/api/cart/${productId}/increase`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (data.success) {
      // return alert("jutt sab");
      console.log("successful");
      setCartItem(data.cart);
    }
  };
  const handleDecreaseQuantity = async (productId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:4000/api/cart/${productId}/decrease`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (data.success) {
      // return alert("jutt sab");
      console.log("successful decrease");
      setCartItem(data.cart);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" /> Shopping Cart
        </h1>
        <p className="text-gray-500">{cartItem.length} Items</p>
      </div>

      <div className="space-y-4 mb-10">
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={item.fullData.images?.[0] || "abc"} alt="product" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.fullData.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Price: ${item.fullData.price * item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => handleDecreaseQuantity(item.productId)}
                  >
                    -
                  </button>
                  <span className="px-3 font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() =>
                      // setProductQuantity((prevQunatity) => prevQunatity + 1)
                      // (item.fullData.quantity += 1)
                      handleIncreaseQuantity(item.productId)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDeleteFromCart(item)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            Your cart is empty
          </div>
        )}
      </div>

      {cartItem.length > 0 && (
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-2xl font-bold">
              $
              {cartItem
                .reduce(
                  (acc, item) => acc + item.fullData.price * item.quantity,
                  0,
                )
                .toFixed(2)}
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="xl"
                className="w-full md:w-64 h-14 text-lg bg-purple-600  text-white rounded-full shadow-lg transition-all hover:scale-105"
              >
                Checkout Now
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="p-6 border-b bg-gray-50/50">
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  Secure Payment
                </DialogTitle>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 11-4 0V7a5 5 0 0110 0v2a2 2 0 11-4 0zm-1 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0zm0 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6">
                <CustomPaymentForm
                  items={cartItem}
                  onSuccess={() => console.log("Payment successful")}
                />
              </div>

              <DialogFooter className="p-4 border-t bg-gray-50">
                <DialogClose asChild>
                  <Button variant="ghost" className="w-full">
                    Cancel and return to cart
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
