import React from "react";
// import Product from "@/app/mac/page";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";
// import BrandLogo from "next/BrandLogo.png";
import { FaRegUser } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";

const Navbar = () => {
  const NavData = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "iPhone",
      href: "/pages/iphone",
    },
    {
      id: 3,
      name: "Samsung",
      href: "/pages/Samsung",
    },
    {
      id: 4,
      name: "iPad",
      href: "/pages/iPad",
    },
    {
      id: 5,
      name: "Mac",
      href: "/pages/macBook",
    },
    {
      id: 6,
      name: "AirPods",
      href: "/pages/airPods",
    },
  ];

  return (
    <div className="w-full h-15 bg-gray-200 drop-shadow-lg flex items-center top-0 fixed z-10">
      <div className="w-full flex  items-center justify-center p-10 gap-4">
        <img src="/Images/BrandLogo.png" className="h-19.5"></img>

        <div>
          <div className="flex gap-6 cursor-pointer">
            {NavData.map((pageName) => (
              <Link href={pageName.href} key={pageName.id}>
                <p className="text-black cursor-pointer after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#0EABC7] after:mx-auto after:transition-all after:duration-500 hover:after:w-full">
                  {pageName.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <Link href="/auth/login">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <FaRegUser />
            <p>Sign in</p>
          </div>
        </Link>

        <Link href={"/pages/favourite-product"}>
          <GrFavorite />
        </Link>
        <Link href={"/pages/cartProduct"}>
          <MdOutlineShoppingBag />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
