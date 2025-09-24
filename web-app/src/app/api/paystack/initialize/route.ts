import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, subaccount, metadata } = body;

    if (!email || !amount) {
      return NextResponse.json(
        { success: false, error: "Email and amount are required" },
        { status: 400 }
      );
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      console.error("Missing PAYSTACK_SECRET_KEY in environment variables");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Convert NGN to kobo (Paystack requires amount in kobo)
    const payload = {
      email,
      amount: Number(amount) * 100,
      subaccount, // ✅ send subaccount
      metadata,   // ✅ include custom metadata (name, phone, category)
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify`, // optional: your callback/redirect
    };

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Paystack initialize response:", data);

    if (data.status && data.data?.authorization_url) {
      return NextResponse.json({ success: true, data: data.data });
    } else {
      return NextResponse.json(
        { success: false, error: "Initialization failed", details: data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Initialize route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
