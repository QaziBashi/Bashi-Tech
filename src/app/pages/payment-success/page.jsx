import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // In real implementation, you might want to verify this with backend
      setSessionData({
        sessionId,
        status: 'completed',
        message: 'Payment successful!'
      });
    }
    
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing payment...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            {sessionData && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Session ID:</strong> {sessionData.sessionId}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Status:</strong> {sessionData.status}
                </p>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/pages/cartProduct')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Back to Cart
              </button>
              <button
                onClick={() => router.push('/pages/iphone')}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;