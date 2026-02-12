"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ items, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment intent on your backend
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const { clientSecret } = await response.json();

    // Confirm payment with Stripe
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Customer Name", // You can add form fields for this
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-lg border">
        <CardElement
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
      
      {error && (
        <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${items.reduce((sum, item) => sum + item.fullData.price * item.quantity, 0).toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const PaymentForm = ({ items }) => {
  const handleSuccess = (paymentIntent) => {
    console.log("Payment successful!", paymentIntent);
    // Redirect to success page
    window.location.href = "/payment-success";
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm items={items} onSuccess={handleSuccess} />
    </Elements>
  );
};

export default PaymentForm;