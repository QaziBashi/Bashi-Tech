import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { items } = await request.json();
    
    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.fullData.price * item.quantity, 0);
    const amountInCents = Math.round(totalAmount * 100);

    // Call your backend to create payment intent
    const response = await fetch('http://localhost:4000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        items,
        amount: totalAmount,
        currency: 'usd'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || 'Failed to create payment intent' }, { status: response.status });
    }

    const paymentIntent = await response.json();
    
    console.log("Payment Intent Created:", paymentIntent);
    
    return NextResponse.json({ 
      clientSecret: paymentIntent.clientSecret,
      amount: totalAmount 
    });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}