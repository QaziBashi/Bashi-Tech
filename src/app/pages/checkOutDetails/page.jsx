"use client";
import React from "react";
import { useState, useEffect } from "react";

const CheckOutDetails = () => {
  const [input, setInput] = useState([
    {
      firstName: "",
      lastName: "",
      country: "",
      streetAdress: "",
      zipCode: "",
      phoneNum: "",
      cardNum: "",
      cardHolerName: "",
      surName: "",
      expireDate: "",
      csv: "",
    },
  ]);
  console.log("check the Input Value", input);
  return (
    <div className="w-full flex items-center justify-center  bg-amber-500 mt-15">
      <div className="w-[1200px] bg-gray-600">
        <div className="w-full p-10">
          <div className="flex justify-between items-center">
            <h4 className="text-[20px] font-semibold">BT</h4>
            <h5>CheckOut</h5>
          </div>
          <div className="w-full flex gap-3">
            <form className="w-[700px] bg-sky-600 p-[15px] flex flex-col gap-3">
              <h5 className="text-[22px] font-semibold">CheckOut:</h5>
              <div className=" w-full flex justify-between">
                <div className="flex flex-col">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) =>
                      setInput({ ...input, firstName: e.target.value })
                    }
                    className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) =>
                      setInput({ ...input, lastName: e.target.value })
                    }
                    className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
                  />
                </div>
              </div>
              <div className="w-full">
                <label>Country/Region</label>
                <input
                  type="text"
                  name="country"
                  onChange={(e) =>
                    setInput({ ...input, country: e.target.value })
                  }
                  className="w-full outline-none border rounded-[5px] p-[2px]"
                />
              </div>
              <div className="w-full">
                <label>Street Adress</label>
                <input
                  type="text"
                  name="streetAdress"
                  onChange={(e) =>
                    setInput({ ...input, streetAdress: e.target.value })
                  }
                  className="w-full outline-none border rounded-[5px] p-[2px]"
                />
              </div>{" "}
              <div className="w-full flex justify-between ">
                <div className="flex flex-col">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    onChange={(e) =>
                      setInput({ ...input, zipCode: e.target.value })
                    }
                    className="w-[220px] outline-none border rounded-[5px] p-[2px]"
                  />
                </div>

                <div className="flex flex-col ">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phoneNum"
                    onChange={(e) =>
                      setInput({ ...input, phoneNum: e.target.value })
                    }
                    className="w-[220px] outline-none border rounded-[5px] p-[2px]"
                  />
                </div>
              </div>
              <div>
                <h5>Payment Method</h5>
                <div className="w-full border rounded-[5px] p-[10px] mt-4">
                  <div className="flex justify-center items-center flex-col gap-3">
                    <div className="w-full">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNum"
                        onChange={(e) =>
                          setInput({ ...input, cardNum: e.target.value })
                        }
                        id=""
                        className="w-full border rounded-[5px] p-[2px]"
                      />
                    </div>
                    <div className=" w-full flex justify-between">
                      <div className="flex flex-col">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="cardHolderName"
                          onChange={(e) =>
                            setInput({
                              ...input,
                              cardHolerName: e.target.value,
                            })
                          }
                          className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>SurName</label>
                        <input
                          type="text"
                          name="surName"
                          onChange={(e) =>
                            setInput({ ...input, surName: e.target.value })
                          }
                          className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
                        />
                      </div>
                    </div>

                    <div className=" w-full flex justify-between">
                      <div className="flex flex-col">
                        <label>Expire Date</label>
                        <input
                          type="text"
                          name="expireDate"
                          onChange={(e) =>
                            setInput({ ...input, expireDate: e.target.value })
                          }
                          className="outline-none border rounded-[5px] w-[220px] p-[2px] text-[14px] mt-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>CVV/CSV</label>
                        <input
                          type="text"
                          name="csv"
                          onChange={(e) =>
                            setInput({ ...input, csv: e.target.value })
                          }
                          className="outline-none border rounded-[5px] w-[220px] text-[14px] p-[2px] mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleCreateOrder}
                  disabled={loading}
                  className="w-full h-[35px] bg-yellow-100 outline-none rounded-[6px] mt-4 disabled:opacity-50"
                >
                  {loading ? "Processing..." : `Pay $${calculateTotal()}`}
                </button>
                
                {/* Show Cart Summary */}
                {cartItems.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h6 className="font-semibold mb-3">Order Summary</h6>
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <span className="text-sm">{item.fullData.name} x {item.quantity}</span>
                        <span className="text-sm font-medium">${(item.fullData.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="bg-green-800 w-[400px] p-[15px]">
              <h5 className="text-[22px] font-semibold">Your Order:</h5>

              {/* <div className="w-full h-[100px] bg-sky-300 flex items-center mt-5">
                <div className="w-full flex justify-between items-center px-[15px]">
                  <div className="flex items-center gap-3">
                    <div className="w-[70px] h-[70px] bg-white"></div>
                    <h5>Mac Book</h5>
                  </div>
                  <p>$333</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutDetails;
