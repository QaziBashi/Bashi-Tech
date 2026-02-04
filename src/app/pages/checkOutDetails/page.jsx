// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// const CheckOutDetails = () => {
//   const [input, setInput] = useState([
//     {
//       firstName: "",
//       lastName: "",
//       country: "",
//       streetAdress: "",
//       zipCode: "",
//       phoneNum: "",
//       cardNum: "",
//       cardHolerName: "",
//       surName: "",
//       expireDate: "",
//       csv: "",
//     },
//   ]);
//   console.log("check the Input Value", input);
//   return (
//     <div className="w-full flex items-center justify-center  bg-amber-500 mt-15">
//       <div className="w-[1200px] bg-gray-600">
//         <div className="w-full p-10">
//           <div className="flex justify-between items-center">
//             <h4 className="text-[20px] font-semibold">BT</h4>
//             <h5>CheckOut</h5>
//           </div>
//           <div className="w-full flex gap-3">
//             <form className="w-[700px] bg-sky-600 p-[15px] flex flex-col gap-3">
//               <h5 className="text-[22px] font-semibold">CheckOut:</h5>
//               <div className=" w-full flex justify-between">
//                 <div className="flex flex-col">
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     onChange={(e) =>
//                       setInput({ ...input, firstName: e.target.value })
//                     }
//                     className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     onChange={(e) =>
//                       setInput({ ...input, lastName: e.target.value })
//                     }
//                     className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
//                   />
//                 </div>
//               </div>
//               <div className="w-full">
//                 <label>Country/Region</label>
//                 <input
//                   type="text"
//                   name="country"
//                   onChange={(e) =>
//                     setInput({ ...input, country: e.target.value })
//                   }
//                   className="w-full outline-none border rounded-[5px] p-[2px]"
//                 />
//               </div>
//               <div className="w-full">
//                 <label>Street Adress</label>
//                 <input
//                   type="text"
//                   name="streetAdress"
//                   onChange={(e) =>
//                     setInput({ ...input, streetAdress: e.target.value })
//                   }
//                   className="w-full outline-none border rounded-[5px] p-[2px]"
//                 />
//               </div>{" "}
//               <div className="w-full flex justify-between ">
//                 <div className="flex flex-col">
//                   <label>ZIP Code</label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     onChange={(e) =>
//                       setInput({ ...input, zipCode: e.target.value })
//                     }
//                     className="w-[220px] outline-none border rounded-[5px] p-[2px]"
//                   />
//                 </div>

//                 <div className="flex flex-col ">
//                   <label>Phone</label>
//                   <input
//                     type="text"
//                     name="phoneNum"
//                     onChange={(e) =>
//                       setInput({ ...input, phoneNum: e.target.value })
//                     }
//                     className="w-[220px] outline-none border rounded-[5px] p-[2px]"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h5>Payment Method</h5>
//                 <div className="w-full border rounded-[5px] p-[10px] mt-4">
//                   <div className="flex justify-center items-center flex-col gap-3">
//                     <div className="w-full">
//                       <label>Card Number</label>
//                       <input
//                         type="text"
//                         name="cardNum"
//                         onChange={(e) =>
//                           setInput({ ...input, cardNum: e.target.value })
//                         }
//                         id=""
//                         className="w-full border rounded-[5px] p-[2px]"
//                       />
//                     </div>
//                     <div className=" w-full flex justify-between">
//                       <div className="flex flex-col">
//                         <label>First Name</label>
//                         <input
//                           type="text"
//                           name="cardHolderName"
//                           onChange={(e) =>
//                             setInput({
//                               ...input,
//                               cardHolerName: e.target.value,
//                             })
//                           }
//                           className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <label>SurName</label>
//                         <input
//                           type="text"
//                           name="surName"
//                           onChange={(e) =>
//                             setInput({ ...input, surName: e.target.value })
//                           }
//                           className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
//                         />
//                       </div>
//                     </div>

//                     <div className=" w-full flex justify-between">
//                       <div className="flex flex-col">
//                         <label>Expire Date</label>
//                         <input
//                           type="text"
//                           name="expireDate"
//                           onChange={(e) =>
//                             setInput({ ...input, expireDate: e.target.value })
//                           }
//                           className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <label>CVV/CSV</label>
//                         <input
//                           type="text"
//                           name="csv"
//                           onChange={(e) =>
//                             setInput({ ...input, csv: e.target.value })
//                           }
//                           className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="w-full h-[35px] bg-yellow-100 outline-none rounded-[6px] mt-4">
//                   Pay Now-
//                 </button>
//               </div>
//             </form>
//             <div className="bg-green-800 w-[400px] p-[15px]">
//               <h5 className="text-[22px] font-semibold">Your Order:</h5>

//               {/* <div className="w-full h-[100px] bg-sky-300 flex items-center mt-5">
//                 <div className="w-full flex justify-between items-center px-[15px]">
//                   <div className="flex items-center gap-3">
//                     <div className="w-[70px] h-[70px] bg-white"></div>
//                     <h5>Mac Book</h5>
//                   </div>
//                   <p>$333</p>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOutDetails;

"use client";

import React, { useState, useEffect } from "react";

const CheckOutDetails = () => {
  // ✅ FIX 1: input must be OBJECT, not array
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    zipCode: "",
    phoneNum: "",
    cardNum: "",
    cardHolderName: "",
    surName: "",
    expireDate: "",
    cvv: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useStripeCheckout, setUseStripeCheckout] = useState(true);

  // ✅ FIX 2: run only once
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.fullData.price * item.quantity;
    }, 0);
  };

  const handleCreateOrder = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Get userId from token decode or localStorage fallback
      const getUserIdFromToken = (token) => {
        try {
          // Simple JWT decode (base64)
          const payload = token.split('.')[1];
          if (payload) {
            const decoded = JSON.parse(atob(payload));
            return decoded.id || decoded.userId || decoded._id;
          }
        } catch (e) {
          console.log("Token decode failed, using fallback");
        }
        return null;
      };

      let userId = getUserIdFromToken(token);
      
      // Fallback to localStorage
      if (!userId) {
        userId = localStorage.getItem("userId");
      }
      
      // Fallback to hardcoded for testing
      if (!userId) {
        userId = "507f1f77bcf86cd799439011";
        console.log("Using fallback userId for testing");
      }

      if (!userId) {
        alert("User not authenticated. Please log in first.");
        setLoading(false);
        return;
      }

      console.log("Using userId:", userId);

      // 1️⃣ Create order
      const orderRes = await fetch("http://localhost:4000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          items: cartItems.map((item) => ({
            name: item.fullData.name,
            price: item.fullData.price,
            quantity: item.quantity,
            productId: item.productId,
          })),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error);

      // 2️⃣ Stripe session
      const stripeRes = await fetch(
        "http://localhost:4000/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderData.orderId,
            items: cartItems.map((item) => ({
              name: item.fullData.name,
              price: item.fullData.price,
              quantity: item.quantity,
            })),
          }),
        },
      );

      const stripeData = await stripeRes.json();
      if (!stripeData.url) throw new Error("Stripe session failed");

      window.location.href = stripeData.url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center bg-amber-500 py-10">
      <form className="w-[700px] bg-sky-600 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-semibold">Checkout</h2>

        {/* Payment Toggle */}
        <div className="bg-white p-4 rounded">
          <label className="flex gap-2">
            <input
              type="radio"
              checked={useStripeCheckout}
              onChange={() => setUseStripeCheckout(true)}
            />
            Stripe Secure Checkout
          </label>

          <label className="flex gap-2 mt-2">
            <input
              type="radio"
              checked={!useStripeCheckout}
              onChange={() => setUseStripeCheckout(false)}
            />
            Manual Form (UI Only)
          </label>
        </div>

        {/* STRIPE CHECKOUT */}
        {useStripeCheckout ? (
          <div className="bg-white p-6 rounded space-y-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>
                  {item.fullData.name} × {item.quantity}
                </span>
                <span>${item.fullData.price * item.quantity}</span>
              </div>
            ))}

            <div className="font-bold text-lg">Total: ${calculateTotal()}</div>

            <button
              type="button"
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
          </div>
        ) : (
          /* MANUAL FORM (UI ONLY) */
          <div className="bg-white p-6 rounded space-y-3">
            <input
              placeholder="First Name"
              className="w-full border p-2"
              onChange={(e) =>
                setInput({ ...input, firstName: e.target.value })
              }
            />
            <input placeholder="Card Number" className="w-full border p-2" />
            <p className="text-red-500 text-sm">
              ⚠️ This form is UI only. Do NOT collect card data in production.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOutDetails;
