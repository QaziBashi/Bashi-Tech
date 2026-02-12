"use client";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import { AiFillProduct } from "react-icons/ai";
import Link from "next/link";

import { useState } from "react";
import AdminGuard from "@/app/components/AdminGuard";
const Admindashboard = () => {
  const [showCatalog, setShowCatalog] = useState(true);

  function handleCatalog() {
    setShowCatalog(!showCatalog);
  }

  return (
    // <AdminGuard>
    <div className="w-75 h-screen bg-gray-700">
      <div className="pt-19 pl-4 flex flex-col gap-2">
        <div className=" flex gap-2 items-center">
          <MdDashboard className=" text-xl" />
          <h2 className="text-xl">Dashboard</h2>
        </div>
        <div className="flex flex-col">
          <Link href="/Admin/catagories/admin-dashboard">
            <div
              className="flex items-center gap-2 cursor-pointer"
              // onClick={handleCatalog}
            >
              <GrGallery />
              <p>Catalog</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    // </AdminGuard>
  );
};
export default Admindashboard;
