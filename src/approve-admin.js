"use client";

import { useEffect, useState } from "react";

export default function ApproveAdminPage() {
  const [message, setMessage] = useState("Processing...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (!token || !email) {
      setMessage("❌ Invalid approval link");
      return;
    }

    fetch(
      `http://localhost:3000/admin/approve-admin?token=${token}&email=${email}`,
    )
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("❌ Approval failed"));
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>{message}</h1>
      </div>
    </>
  );
}
