"use client";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import Link from "next/link";
const CartProdut = () => {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    const handleCartProduct = async () => {
      const token = localStorage.getItem("token");
      //   console.log(token);
      try {
        let res = await fetch("http://localhost:4000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success) {
          console.log("check the data", data);
          setCartItem(data.cart);
          // Save cart items to localStorage for checkout
          localStorage.setItem("cartItems", JSON.stringify(data.cart));
        }
      } catch (error) {
        console.log("Something went Wrong", error);
      }
    };
    handleCartProduct();
  }, []);

  console.log(" Cart Items", cartItem);
  return (
    <div className="flex flex-col gap-3 item-center justify-center mt-40">
      {/* <div className="flex  items-center"> */}
      <div className="w-full flex flex-col gap-7 items-center justify-center">
        {/* <p className="text-9xl">This is cart Page</p> */}

        {cartItem.map((cartData) => (
          <div
            className="w-250 h-40 flex items-center justify-center bg-white rounded-[18px] border border-[#E5E7EB] shadow-sm 
      "
          >
            <div className="w-full h-30 flex items-center justify-center px-10">
              <div className=" w-70 h-auto flex item-center justify-center gap-2 p-3 ">
                <div className="w-50 h-30 bg-green-400 ">
                  <img src="" alt="Product image" />
                </div>
                <p>name:{cartData.fullData.name}</p>
              </div>
              <div className=" w-full h-auto flex item-center justify-center gap-[5px]">
                <button className="w-5 h-5 bg-white flex items-center justify-center text-[18px]">
                  -
                </button>
                <input
                  type="text"
                  className="w-8 h-6 p-[3px] outline-none border text-[14px]"
                  placeholder={`${cartData.fullData.quantity}`}
                />
                <button className="w-5 h-5 bg-white flex items-center justify-center text-[18px]">
                  +
                </button>
              </div>
              {/* <input t>$333</input> */}
              <input
                type="text"
                placeholder={`${cartData.fullData.price}`}
                className="w-10 h-5"
              />
            </div>
          </div>
        ))}
        {/* </div> */}
        <Link href="/pages/checkOutDetails">
          <button className="w-[130px] rounded-[8px] h-[35px] bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white cursor-pointer text-center text-[14px]">
            CheckOut Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartProdut;
