"use client";

import React from "react";

import ProductList from "@/app/components/productList/page";
const Samsung = () => {
  return (
    <>
      <div>
        <ProductList
          productCategory="samsung"
          style="w-160 h-190"
          headerImage="/header-images/samsung.png"
        />
      </div>
    </>
  );
};

export default Samsung;
