"use client";
import { FaEye } from "react-icons/fa";

import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordvalidation] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const router = useRouter();
  function handleShowPassword() {
    setShowpassword(!showPassword);
  }
  const handleSignUp = async () => {
    if (!name) return alert("Please First Write your Name!");
    if (!password) return alert("Password is Required");

    if (!email) return alert("Email is not Provided");

    if (password !== confirmpassword) {
      setPasswordvalidation("Passwords do not match!");
      return;
    }

    if (!confirmpassword) return alert("Please Confirm your password");
    if (!agree) return alert("You must agree to the Terms & Privacy Policy");

     const API_URL = process.env.NODE_ENV === 'production' 
       ? 'https://bashi-tech-production.up.railway.app' 
       : 'http://localhost:4000';
     
     try {
       const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmpassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something Went wrong");
        console.log("Check Error", data.error);
        return;
      }

      router.push("/auth/login");
      return alert("User Successfully SignUP!");
    } catch (error) {
      console.error("SignUp error:", error);
    }
  };
  return (
    <>
      <div>
        <div className=" w-full h-screen flex items-center bg-[radial-gradient(circle_at_35%_30%,#f2f3f4,#d9dde0,#bfc5ca,#9ea5ab)] justify-center">
          <div className=" relative">
            <div className="w-250 h-[80vh] z-10flex justify-center items-center gap-[22px]">
              <div className="w-[150px] h-[150px] bg-pink-600 bg-bl rounded-[50%] blur-md animate-pulse"></div>
              <div className="w-[150px] h-[150px] bg-[#12aad1] blur-lg rounded-[50%] animate-bounce"></div>
            </div>
          </div>

          <div className="flex flex-col items-center absolute gap-2">
            <h1 className="text-2xl font-semibold">Signup To Bashi Tech</h1>
            <p className="text-[#64748F] text-[14px]">
              Unlock the world of creativity and technology
            </p>
            <div className="w-[400px] h-auto bg-gray-100/50 p-6 rounded-xl">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <p>Full Name</p>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="First Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Email Address</p>
                  <input
                    type="text"
                    name="emailAddress"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                  />
                  {/* {error && <p className="text-red-500">{error}</p>} */}
                </div>
                <div className="flex flex-col">
                  <p> Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                  />
                  <div
                    className="relative bottom-7.5 left-[90%] cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </div>

                  {passwordValidation && (
                    <p className=" text-red-800">{passwordValidation}</p>
                  )}
                </div>
                <div className="flex flex-col ">
                  <p>Confirm Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    value={confirmpassword}
                    className="w-full h-[35px] p-[5px] border border-[#07e4ff] outline-none rounded-[7px]"
                  />
                  <div
                    className="relative bottom-7.5 left-[90%] cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
                <div className="flex gap-1">
                  <input
                    className=""
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <p>I agree to Terms & Privacy Policy</p>
                </div>

                <button
                  className="w-full h-[38px] p-[5px] outline-none rounded-[7px] bg-[#07e4ff] cursor-pointer"
                  onClick={handleSignUp}
                >
                  Signup
                </button>
              </div>
            </div>
            <p className="text-[#64748F] text-[14px]">
              © 2025 Bashi Tech Solution. All right reserved
            </p>
          </div>
        </div>
      </div>
      {/* <SignInPage userData={userData} /> */}
    </>
  );
};

export default SignUpPage;
