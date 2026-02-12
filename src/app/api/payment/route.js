import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { items } = await request.json();
    
    console.log("Frontend API: Creating payment session for items:", items);
    
    // Call your backend to create checkout session
    const response = await fetch('http://localhost:4000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    
    const session = await response.json();
    
    console.log("Backend session response:", session);
    
    if (!response.ok) {
      return NextResponse.json({ error: session.error || 'Failed to create session' }, { status: response.status });
    }
    
    return NextResponse.json({ clientSecret: session.clientSecret });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}