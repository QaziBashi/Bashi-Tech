"use client";
import { useCart } from "@/app/cartContext/page";

const FavouriteProducts = () => {
  const { addtofavourite, handleRemoveFromFavourite, setAddtoFavourite } =
    useCart();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          Favourite Items
        </h1>
        <p className="text-gray-500">{addtofavourite.length} Items</p>
      </div>

      <div className="space-y-4 mb-10">
        {addtofavourite.length > 0 ? (
          addtofavourite.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={item.fullData.images?.[0] || "abc"} alt="product" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.fullData.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Price: ${item.fullData.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-1 hover:bg-gray-100">-</button>
                  <span className="px-3 font-medium">
                    {item.fullData.quantity || 1}
                  </span>
                  <button className="px-3 py-1 hover:bg-gray-100">+</button>
                </div>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleRemoveFromFavourite(item)}
                >
                  {/* <Trash2 className="w-5 h-5" /> */}
                  <h2>Love</h2>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            Your Favourite Item is empty
          </div>
        )}
      </div>

      {addtofavourite.length > 0 && (
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-2xl font-bold">
              $
              {addtofavourite
                .reduce(
                  (acc, item) =>
                    acc + item.fullData.price * (item.fullData.quantity || 1),
                  0,
                )
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouriteProducts;
