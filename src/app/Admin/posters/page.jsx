import React from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
const Posters = () => {
  const OurProductList = [
    {
      id: uuidv4(),
      brand: "Samsung",
      product: "Galaxy Phones",
      path: "/hero-section-image/GalaxyS24Ultra-TitaniumBlack.png",
      href: "/Admin/catagories/Samsung",
    },
    {
      id: uuidv4(),
      brand: "Apple",
      product: "iPad",
      path: "/hero-section-image/iPad-10th-Gen.png",
      href: "/iPhone",
    },
    {
      id: uuidv4(),
      brand: "Apple",
      product: "MacBook",
      path: "/hero-section-image/Apple-MacBook-Pro.png",
      href: "/iPhone",
    },
    {
      id: uuidv4(),
      brand: "Apple",
      product: "AirPods Max",
      path: "/hero-section-image/Apple-AirPods-Max-Silver (2).png",
      href: "/iPhone",
    },
  ];

  return (
    <div className="w-full h-100vh flex item-center justify-center">
      {/* <div className="flex bg-amber-400 gap-7 items-center justify-start "> */}
      <div className="w-full flex justify-center item-center p-10">
        {/* <div className="w-62.5 h-75 bg-gray-500"> */}

        <div className="w-full flex gap-10">
          <a href="/iphone">
            <div className="w-180.5 h-160 bg-[radial-gradient(circle_at_35%_30%,#f2f3f4,#d9dde0,#bfc5ca,#9ea5ab)] flex items-center relative justify-center">
              <img
                src="hero-section-image/iPhone16-White.png"
                alt="iPhone16-White"
                className="h-160"
              />
              <div className=" absolute bottom-15 left-10 flex flex-col gap-7.5">
                <h5 className="text-2xl">Apple</h5>
                <h2 className="text-5xl">iPhones</h2>
                {/* <p className="border-b inline-block">Shop now</p> */}
                <p className="border-b border-black/20 hover:border-black transition-colors pb-1 w-fit cursor-pointer">
                  Shop now
                </p>
              </div>
            </div>
          </a>

          <div className=" grid grid-cols-2 grid-rows-2 gap-10">
            {OurProductList.map((productData) => (
              <a href={productData.href} key={productData.id}>
                <div
                  className="w-77.5 h-75 bg-[radial-gradient(circle_at_35%_30%,#f2f3f4,#d9dde0,#bfc5ca,#9ea5ab)] relative flex items-center justify-center cursor-pointer"
                  key={productData.id}
                >
                  {/* {productData.name} */}
                  <img
                    src={productData.path}
                    alt="GalaxyS24Ultra-TitaniumBlack"
                  />
                  <div className="absolute flex flex-col">
                    <div className="text-center text-white goap-7.5">
                      <h5 className="text-2xl">{productData.brand}</h5>
                      <h2 className="text-5xl">{productData.product}</h2>
                    </div>
                  </div>
                  <h1>Sardar Bashi is here sasri Call Sarya NUn</h1>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posters;
