"use client";
import React from "react";
import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ items, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.fullData.price * item.quantity,
    0,
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    // /api/create-payment-intent
    // Create payment intent on backend
    const response = await fetch(
      "http://localhost:4000/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      },
    );

    const { clientSecret } = await response.json();

    if (!clientSecret) {
      setError("Failed to initialize payment");
      setLoading(false);
      return;
    }

    // Confirm payment with all card details
    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: formData.country,
            },
          },
        },
      });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
    } else {
      setLoading(false);
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Information</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IN">India</option>
            <option value="PK">Pakistan</option>
          </select>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <div className="p-3 border rounded-lg">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
                placeholder: "4242 4242 4242 4242",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Expiry Date
            </label>
            <div className="p-3 border rounded-lg">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <div className="p-3 border rounded-lg">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.fullData.name} x {item.quantity}
              </span>
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
          <p className="font-medium">Payment Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      {/* Security Note */}
      <div className="text-center text-sm text-gray-600 flex items-center justify-center">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 11-4 0V7a5 5 0 0110 0v2a2 2 0 11-4 0zm-1 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0zm0 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0zm0 0a7 7 0 0114 0v2a3 3 0 11-6 0V7a7 7 0 0114 0v2a3 3 0 11-6 0z"
            clipRule="evenodd"
          />
        </svg>
        Your payment information is encrypted and secure
      </div>
    </form>
  );
};

const CustomPaymentWrapper = ({ items }) => {
  const [stripe, setStripe] = useState(null);

  // Initialize Stripe with error handling
  React.useEffect(() => {
    const initStripe = async () => {
      try {
        const { loadStripe } = await import("@stripe/stripe-js");
        if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
          const stripeInstance = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          );

          if (stripeInstance) {
            setStripe(stripeInstance);
            console.log("Stripe initialized successfully");
          }
        }
      } catch (error) {
        console.error("Stripe initialization failed:", error);
      }
    };

    initStripe();
  }, []);

  const handleSuccess = (paymentIntent) => {
    console.log("Payment successful!", paymentIntent);
    window.location.href = "/payment-success";
  };

  if (!stripe) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading payment system...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripe}>
      <CheckoutForm items={items} onSuccess={handleSuccess} />
    </Elements>
  );
};

export default CustomPaymentWrapper;
