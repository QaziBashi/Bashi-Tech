"use client";
import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

import { FaRegEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LogInPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminRequest, setAdminRequest] = useState(false);

  const router = useRouter();
  function handleShowPassword() {
    setshowPassword(!showPassword);
  }

  const requestAdminAccess = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const res = await fetch("http://localhost:4000/api/auth/request-admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setAdminRequest(true);
    alert(data.message);
  };

  const handleLogin = async () => {
    if (!email) return alert("Email is required");
    if (!password) return alert("Password is required");

    try {
      const API_URL = process.env.NODE_ENV === 'production' 
       ? 'https://bashi-tech-production.up.railway.app' 
       : 'http://localhost:4000';
     const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      alert(`User logged in successfully! Role: ${data.role}`);

      if (data.role === "admin") {
        router.push("/pages/admin-dashboard");
      } else {
        router.push("/pages/UserDashboard");
      }

      console.log("Show the data:", data);
    } catch (error) {
      console.error("check the error:", error);
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,#f2f3f4,#d9dde0,#bfc5ca,#9ea5ab)] z-20">
        <div className=" relative">
          <div className="w-[1000px] h-[80vh] z-10 flex justify-center items-center gap-[22px]">
            <div className="w-[150px] h-[150px] bg-pink-600 bg-bl rounded-[50%] blur-md animate-pulse"></div>
            <div className="w-[150px] h-[150px] bg-[#12aad1] blur-lg rounded-[50%] animate-bounce"></div>
          </div>
        </div>

        <div className="flex flex-col items-center absolute gap-2">
          <h1 className="text-2xl font-semibold">Signin To Bashi Tech</h1>
          <p className="text-[#64748F] text-[14px]">
            Unlock the world of creativity and technology
          </p>
          <div className="w-[400px] h-auto bg-gray-100/50 p-6 rounded-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p>Email Adress</p>
                <input
                  type="text"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  value={email}
                  className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <p>Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                />

                <div
                  className="relative bottom-7.5 left-[90%] cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                </div>
              </div>

              <div className="flex items-center gap-7">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <a href="" className="border-b">
                  forgot password?
                </a>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="w-35 h-9.5  rounded-[7px] bg-[#07e4ff] cursor-pointer"
                  onClick={handleLogin}
                >
                  Sign in
                </button>

                <button
                  className="w-35 h-9.5  rounded-[7px] border-2 border-[#07e4ff] cursor-pointer"
                  // onClick={requestAdminAccess}
                  onClick={requestAdminAccess}
                >
                  Request Admin
                </button>
              </div>
              {/* <button className="w-full h-9.5 p-1.25 outline-none rounded-[7px] bg-[#1D4ED8] cursor-pointer">
                Signin
              </button> */}

              <Link href="/auth/signup">
                <button className="w-full h-[38px] p-[5px] outline-none rounded-[7px] bg-[#07e4ff] cursor-pointer">
                  Signup
                </button>
              </Link>
            </div>
          </div>
          <p className="text-[#64748F] text-[14px]">
            © 2026 Bashi Tech Solution. All right reserved
          </p>
        </div>
      </div>
    </>
  );
};
export default LogInPage;
