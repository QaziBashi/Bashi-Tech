"use client";

import React from "react";
import ProductList from "@/app/components/productList/page";
const iPad = () => {
  return (
    <>
      <div>
        <ProductList
          headerImage="/header-images/iPad.png"
          style="w-220 h-150"
          productCategory="ipad"
        />
      </div>
    </>
  );
};

export default iPad;
