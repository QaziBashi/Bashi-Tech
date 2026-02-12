import React from "react";

import ProductList from "@/app/components/productList/page";

const Iphones = () => {
  return (
    <div>
      <ProductList
        headerImage="/header-images/iPhone.png"
        style="w-180 h-190"
        productCategory="iphone"
      />
    </div>
  );
};

export default Iphones;
