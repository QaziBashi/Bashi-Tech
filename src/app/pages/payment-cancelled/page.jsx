import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PaymentCancelled = () => {
  const router = useRouter();

  useEffect(() => {
    // Log the cancellation for analytics
    console.log('Payment was cancelled by user');
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your card.
        </p>
        <p className="text-gray-600 mb-8">
          You can try again whenever you're ready.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/pages/cartProduct')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Back to Cart
          </button>
          <button
            onClick={() => router.push('/pages/iphone')}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;