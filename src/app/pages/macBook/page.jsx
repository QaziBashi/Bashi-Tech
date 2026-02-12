"use client";

import React from "react";

import ProductList from "@/app/components/productList/page";
const MacBook = () => {
  return (
    <>
      <div>
        <ProductList
          headerImage="/header-images/mac.png"
          style="w-230"
          productCategory="macbook"
        />
      </div>
    </>
  );
};

export default MacBook;
