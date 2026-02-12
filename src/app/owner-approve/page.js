"use client";

import { useEffect } from "react";

export default function OwnerApprovePage() {
  useEffect(() => {
    const approveAdmin = async () => {
      const confirmApprove = confirm(
        "Do you really want to give this user admin access?",
      );
      if (!confirmApprove) return;

      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userId");

      if (!userId) {
        alert("User ID missing");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}approve-admin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          },
        );

        const data = await res.json();
        alert(data.message);
      } catch (err) {
        console.error(err);
        alert("Approval failed");
      }
    };

    approveAdmin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Processing approval...</h1>
    </div>
  );
}
