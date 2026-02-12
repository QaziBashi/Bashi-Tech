"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

const SimpleCheckoutForm = ({ items, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const total = items.reduce((sum, item) => sum + item.fullData.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create checkout session directly with your existing working API
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create checkout session");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Hosted Checkout (bypasses blocked js.stripe.com)
      window.location.href = data.url;
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.fullData.name} x {item.quantity}</span>
              <span>${(item.fullData.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Checkout Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Simple Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Processing...
          </div>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      {/* Security Note */}
      <div className="text-center text-sm text-gray-600 flex items-center justify-center">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 11-4 0V7a5 5 0 0110 0v2a2 2 0 11-4 0zm-1 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0zm0 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0z" clipRule="evenodd" />
        </svg>
        Secure checkout powered by Stripe
      </div>
    </div>
  );
};

export default SimpleCheckoutForm;