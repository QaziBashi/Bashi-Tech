"use client";
import React, { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      setError(null);

      // try to get session_id from query string first, fallback to localStorage
      let sessionId = null;
      try {
        const params = new URLSearchParams(window.location.search);
        sessionId =
          params.get("session_id") || localStorage.getItem("lastSessionId");
      } catch (err) {
        sessionId = localStorage.getItem("lastSessionId");
      }

      if (!sessionId) {
        setError(
          "No session id found. If you completed payment, try refreshing or check your orders page.",
        );
        setLoading(false);
        return;
      }

      try {
        const resp = await fetch(
          `${BACKEND_URL}/api/stripe/session/${encodeURIComponent(sessionId)}`,
        );
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || "Failed to fetch session");

        setSession(data.session);
        setOrder(data.order || null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch session");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  if (loading) return <div className="p-8">Loading payment details...</div>;

  if (error)
    return (
      <div className="p-8">
        <h3 className="text-xl font-semibold">Payment</h3>
        <p className="text-red-600">{error}</p>
        <p className="mt-4">
          If you completed the payment in Stripe, the webhook may still be
          processing — try refreshing this page in a few seconds.
        </p>
      </div>
    );

  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold mb-4">Payment Successful ✅</h3>

      <div className="mb-4">
        <h4 className="font-medium">Stripe Session</h4>
        <p>
          Session ID: <code>{session.id}</code>
        </p>
        <p>
          Payment status: <strong>{session.payment_status}</strong>
        </p>
        <p>
          Amount total:{" "}
          <strong>
            {session.amount_total
              ? `$${(session.amount_total / 100).toFixed(2)}`
              : "N/A"}
          </strong>
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Billing / Customer</h4>
        {session.customer_details ? (
          <div>
            <p>{session.customer_details.name}</p>
            <p>{session.customer_details.email}</p>
            <p>{session.customer_details.phone}</p>
          </div>
        ) : (
          <p>No customer details available.</p>
        )}
      </div>

      <div>
        <h4 className="font-medium">Order</h4>
        {order ? (
          <div className="mt-2">
            <p>
              Order ID: <strong>{order.orderId}</strong>
            </p>
            <p>
              Status: <strong>{order.status}</strong>
            </p>
            <p>
              Total amount:{" "}
              <strong>
                {order.totalAmount ? `$${order.totalAmount.toFixed(2)}` : "N/A"}
              </strong>
            </p>

            {order.items && order.items.length > 0 && (
              <div className="mt-2">
                <h5 className="font-medium">Items</h5>
                <ul className="list-disc ml-6">
                  {order.items.map((it, idx) => (
                    <li key={idx}>
                      {it.name} — {it.quantity} × ${it.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>
            No linked order found yet. If you just completed payment, refresh in
            a few seconds or check your orders page.
          </p>
        )}
      </div>
    </div>
  );
}
