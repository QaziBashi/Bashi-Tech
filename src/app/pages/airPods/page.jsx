import React from "react";

import ProductList from "@/app/components/productList/page";
const AirPods = () => {
  return (
    <>
      <div>
        <ProductList
          headerImage="/header-images/airPods.webp"
          style="w-130 h-130 mt-10"
          productCategory="airpods"
        />
      </div>
    </>
  );
};

export default AirPods;
