// "use client";
// import React from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import Sidebar from "@/app/components/sidebar/page";
// const Categories = () => {
//   const [images, setImages] = useState(null);
//   const [input, setInput] = useState({
//     // id: uuidv4(),
//     images: [],
//     name: "",
//     category: "",
//     brand: "",
//     price: "",
//     discount: "",
//     storage: "",
//     stockQuantity: "",
//     description: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:4000/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: input.name,
//           category: input.category,
//           brand: input.brand,
//           price: input.price,
//           discount: input.discount,
//           storage: input.storage,
//           stockQuantity: input.stockQuantity,
//           description: input.description,
//           images: input.images,
//         }),
//       });
//       const data = await res.json();
//       // console.log("CHeck the Data", data);
//       if (!res.ok) {
//         return alert(data.error || "Login failed");
//       }
//       // return alert("Product Added Successfully");

//       setInput({
//         images: "",
//         name: "",
//         category: "",
//         brand: "",
//         price: "",
//         discount: "",
//         storage: "",
//         stockQuantity: "",
//         description: "",
//       });
//       // console .log(data)
//       return alert("Product Added Successfully");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Check console.");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setInput({ ...input, images: [reader.result] });
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <>
//       <div className="w-full items-center justify-center mt-20">
//         <div className="w-full flex justify-between px-[30px]">
//           <h2>Create a New Product</h2>
//           {/* <div className="flex"> */}
//           <button className="flex items-center justify-center gap-1 w-[120px] h-[30px] bg-amber-400">
//             <AiOutlinePlus />
//             Add Product
//           </button>
//           {/* </div> */}
//         </div>
//         <div className="w-full flex items-center justify-center  ">
//           <div className="w-260 bg-gray-200 flex items-center justify-center my-5 p-10 rounded-2xl">
//             <form
//               // action="submit"
//               className="w-full flex flex-col gap-5 items-center justify-center"
//             >
//               <div className="w-full flex justify-between gap-10 ">
//                 <div className="w-120 flex items-center justify-center">
//                   {/* <img src="" alt="" /> */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     id="upload"
//                     // onChange={(e) => setImage(e.target.files[0])

//                     // }
//                     onChange={handleImageChange}
//                     // Pak123@pak
//                   />

//                   {input.images.length === 0 ? (
//                     <label className="cursor-pointer" htmlFor="upload">
//                       Upload Image
//                     </label>
//                   ) : (
//                     <img
//                       src={input.images[0]}
//                       alt="abc"
//                       style={{ width: "300px", marginTop: "10px" }}
//                       onChange={handleImageChange}
//                       // onClick={handleImageChange}
//                     />
//                   )}
//                 </div>

//                 <div className="w-120 h-120 flex flex-col gap-2 p-5  rounded-2xl">
//                   <div className="flex flex-col gap-1.5">
//                     <h1>Product Name</h1>
//                     <input
//                       type="text"
//                       name="name"
//                       value={input.name}
//                       onChange={(e) =>
//                         setInput({ ...input, name: e.target.value })
//                       }
//                       placeholder="Product Name"
//                       className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                     />
//                   </div>

//                   <div className="w-full justify-between flex">
//                     <div className="flex flex-col gap-1.5">
//                       <p>Category</p>

//                       <select
//                         name="category"
//                         onChange={(e) =>
//                           setInput({ ...input, category: e.target.value })
//                         }
//                         value={input.category}
//                         className="border w-48 rounded-[6px] outline-none px-[5px] py-[3px] border"
//                       >
//                         <option value="">Select Category</option>
//                         <option value="iphone">iphone</option>
//                         <option value="samsung">samsung</option>
//                         <option value="ipad">ipad</option>
//                         <option value="macbook">macbook</option>
//                         <option value="airpods">airpods</option>
//                         {/* ["iphone", "samsung", "ipad", "macbook", "airpods"] */}
//                       </select>
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                       <p>Brand</p>
//                       <input
//                         type="text"
//                         name="brand"
//                         value={input.brand}
//                         onChange={(e) =>
//                           setInput({ ...input, brand: e.target.value })
//                         }
//                         className="border-amber-100 w-full rounded-[6px] outline-none px-[5px] py-[3px] "
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full justify-between flex">
//                     <div className="flex flex-col gap-1.5">
//                       <p>Price</p>
//                       <input
//                         type="text"
//                         name="price"
//                         value={input.price}
//                         onChange={(e) =>
//                           setInput({ ...input, price: e.target.value })
//                         }
//                         className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                       />
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                       <p>Discount</p>
//                       <input
//                         type="text"
//                         name="discount"
//                         value={input.discount}
//                         onChange={(e) =>
//                           setInput({ ...input, discount: e.target.value })
//                         }
//                         className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                       />
//                     </div>
//                   </div>
//                   <div className="w-full justify-between flex">
//                     <div className="flex flex-col gap-1.5">
//                       <p>Storage</p>
//                       <input
//                         type="text"
//                         name="storage"
//                         value={input.storage}
//                         onChange={(e) =>
//                           setInput({ ...input, storage: e.target.value })
//                         }
//                         className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                       />
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                       <p>Stock Quantity</p>
//                       <input
//                         type="text"
//                         name="stockQuantity"
//                         value={input.stockQuantity}
//                         onChange={(e) =>
//                           setInput({
//                             ...input,
//                             stockQuantity: e.target.value,
//                           })
//                         }
//                         className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <p>Description</p>
//                     <textarea
//                       name=""
//                       id=""
//                       value={input.description}
//                       onChange={(e) =>
//                         setInput({ ...input, description: e.target.value })
//                       }
//                       className="border w-full rounded-[6px] outline-none px-[5px] py-[3px]"
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className="w-28 h-11 font-semibold  bg-[radial-gradient(circle_at_center,_#3fdad7_0%,_#2bb6b1_35%,_#0f5f63_60%,_#061a2d_100%)] text-white rounded-xl cursor-pointer"
//               >
//                 Add Product
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Categories = () => {
  const [input, setInput] = useState({
    images: [],
    name: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    storage: "",
    stockQuantity: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "Something went wrong");
      }

      alert("Product Added Successfully");

      setInput({
        images: [],
        name: "",
        category: "",
        brand: "",
        price: "",
        discount: "",
        storage: "",
        stockQuantity: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setInput((prev) => ({
        ...prev,
        images: [reader.result],
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className=" bg-gray-50 py-10 px-10">
      <div className="max-w-6xl mx-auto">
        {/* <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create New Product
          </h2>

          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow transition">
            <AiOutlinePlus />
            Add Product
          </button>
        </div> */}

        <div className="bg-white border border-gray-200 rounded-2xl mt-20 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label
                  htmlFor="upload"
                  className="flex items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-teal-500 transition"
                >
                  {input.images.length === 0 ? (
                    <span className="text-gray-500 text-sm">
                      Click to Upload Product Image
                    </span>
                  ) : (
                    <img
                      src={input.images[0]}
                      alt="Preview"
                      className="h-full object-contain rounded-lg"
                    />
                  )}
                </label>

                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={input.category}
                      onChange={(e) =>
                        setInput({ ...input, category: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    >
                      <option value="">Select Category</option>
                      <option value="iphone">iPhone</option>
                      <option value="samsung">Samsung</option>
                      <option value="ipad">iPad</option>
                      <option value="macbook">MacBook</option>
                      <option value="airpods">AirPods</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={input.brand}
                      onChange={(e) =>
                        setInput({ ...input, brand: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={input.price}
                      onChange={(e) =>
                        setInput({ ...input, price: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={input.discount}
                      onChange={(e) =>
                        setInput({ ...input, discount: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage
                    </label>
                    <input
                      type="text"
                      value={input.storage}
                      onChange={(e) =>
                        setInput({ ...input, storage: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={input.stockQuantity}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          stockQuantity: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={input.description}
                    onChange={(e) =>
                      setInput({ ...input, description: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
