"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext();
export const ContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  // const [favouriteItem, setFavouriteItem] = useState([]);

  const [addtofavourite, setAddtoFavourite] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setCartItem(data.cart);
      }
    } catch (error) {
      console.log("Cart fetch failed", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    try {
      const res = await fetch(`http://localhost:4000/api/cart/${item._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Added to cart:", item.name);
        setCartItem((prev) => [
          ...prev,
          { productId: item._id, fullData: item, quantity: 1 },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddtoFavourite = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    try {
      const res = await fetch(
        `http://localhost:4000/api/favourites/${item._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: 1 }),
        },
      );

      const data = await res.json();

      if (data.success) {
        console.log("Added to favourite:", item.name);
        setAddtoFavourite((prev) => [
          ...prev,
          { productId: item._id, fullData: item, quantity: 1 },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromFavourite = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    try {
      const res = await fetch(
        `http://localhost:4000/api/favourites/${item.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        console.log("Removed from cart:", item.fullData.name);

        // Remove from local state
        setAddtoFavourite((prev) =>
          prev.filter((cart) => cart._id !== item._id),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteFromCart = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    try {
      const res = await fetch(
        `http://localhost:4000/api/cart/${item.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        console.log("Removed from cart:", item.fullData.name);

        // Remove from local state
        // setCartItem((prev) => prev.filter((cart) => cart._id !== item._id));
        setCartItem((prev) =>
          prev.filter((cart) => cart.productId !== item.productId),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <CartContext.Provider
          value={{
            cartItem,
            setCartItem,
            addtofavourite,
            setAddtoFavourite,
            handleAddToCart,
            handleDeleteFromCart,
            handleAddtoFavourite,
            handleRemoveFromFavourite,
          }}
        >
          {children}
        </CartContext.Provider>
      </div>
    </>
  );
};

export const useCart = () => useContext(CartContext);

// Next.js expects a default export for a page file. Provide a minimal
// default component so the build won't fail. This file primarily
// exports `ContextProvider` for use elsewhere in the app.
export default function CartContextPage() {
  return null;
}
