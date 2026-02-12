"use client";

import React from "react";

import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Samsung from "@/app/pages/Samsung/page";

import { useCart } from "@/app/cartContext/page";
const ProductList = ({ headerImage, productCategory, style }) => {
  const [data, setData] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [productId, setProductId] = useState(null);
  const {
    cartItem,
    setCartItem,
    handleAddToCart,
    addtofavourite,
    setAddtoFavourite,
    handleAddtoFavourite,
    handleRemoveFromFavourite,
    handleDeleteFromCart,
  } = useCart();

  const isInCart = (product) =>
    cartItem.some((item) => item.fullData._id === product._id);

  const isInFavourite = (product) =>
    addtofavourite.some((item) => item.fullData._id === product._id);

  const router = useRouter();
  useEffect(() => {
    // if (!productCategory) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/products?category=${productCategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        if (data.success) {
          setData(data.items || []);
        } else {
          console.error("API Error:", data.message);
          setData([]);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
        setData([]);
      }
    };
    fetchData();
  }, [productCategory]);

  // FILTER DATA BASE ON SEARCH
  let filterValue = searchInput
    ? data.filter(
        (val) =>
          val.name &&
          val.name.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : data;

  const handleDetails = (id) => {
    router.push(`/pages/productDetails/${id}`);
  };

  return (
    <>
      <div>
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] flex items-center justify-center">
          <img
            src={headerImage}
            className={`${style} object-contain`}
            alt="Product Image"
          />
        </div>
        <div className="w-full item-center justify-center mt-10 h-20 bg-gray-500">
          <div className=" flex justify-between px-10 py-7">
            <h2 className="text-[22px] font-semibold">{productCategory}</h2>
            <div className="flex gap-3 flex items-center ">
              <input
                type="text"
                // value={input}
                onChange={(e) => setSearchInput(e.target.value)}
                className="p-[2px] outline-none border text-[14px]"
              />
              <IoSearchOutline className="text-[20px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex gap-7 p-10 flex-wrap">
          {filterValue.map((item) => (
            <div
              className="bg-white w-[250px] rounded-[24px] border border-[#E5E7EB] p-5 shadow-sm flex item center justify-center cursor-pointer"
              key={item._id}
            >
              <div
                className="flex flex-col gap-2"
                key={item.uuid}
                id={item.uuid}
              >
                <div
                  className="w-[180px] h-[200px] flex item-center justify-center "
                  onClick={() => handleDetails(item._id)}
                >
                  <img
                    src={
                      item.images?.[0] || "/Images/macbook/iPhone-16-Pro.jpg"
                    }
                    alt="No Product  Provided"
                  />
                </div>
                <div className="w-full flex justify-between pt-3">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    <span className="font-medium">$</span>
                    {item.price}
                  </p>
                </div>
                <div className="flex w-full justify-between ">
                  <button
                    className="w-[110px] rounded-2xl h-[30px] bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white cursor-pointer text-center text-[14px]"
                    onClick={() => {
                      if (isInCart(item)) {
                        handleDeleteFromCart(item);
                      } else {
                        handleAddToCart(item);
                      }
                    }}
                  >
                    {isInCart(item) ? "Remove Cart" : "Add to Cart"}
                  </button>

                  <button
                    className="text-[22px] cursor-pointer"
                    onClick={() => {
                      if (isInFavourite(item)) handleRemoveFromFavourite(item);
                      else handleAddtoFavourite(item);
                    }}
                  >
                    {isInFavourite(item) ? <GoHeartFill /> : <GoHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
