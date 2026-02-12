import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full  flex item-center justify-center bg-gray-200">
        {/* <div className="flex bg-amber-400 gap-7 items-center justify-start "> */}
        <div className="w-full flex justify-center item-center m-10 ">
          <div className=" flex flex-col items-center gap-7">
            <div className="flex gap-25">
              <div>
                <h2 className="font-semibold text-[20px]">About Us</h2>

                <div className="flex flex-col gap-3 pt-2">
                  <p>Who We Are</p>
                  <p>Our Mission</p>
                  <p>Our Vision</p>
                  <p>Careers</p>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-[20px]">Shop Categories</h2>
                <div className="flex flex-col gap-3 pt-2">
                  <p>Samsung</p>
                  <p>iPhones</p>
                  <p>MacBook</p>
                  <p>IPad</p>
                  <p>AirPods</p>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-[20px]">Contact Us</h2>
                <div className="flex flex-col gap-3 pt-2">
                  <p>qazibasi77@gmail.com</p>
                  <p>Pakistan</p>
                  <p>Location</p>
                  <p>+92 123456789</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-light">
                © 2026 Bashi Tech. All Rights Reserved.
              </p>

              <p className="font-light">Privacy Policy | Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
