import { NextResponse } from "next/server";
import { saveDonation } from "@/app/lib/saveDonation";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    if (!reference) {
      return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 });
    }

    // Call Paystack verify
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status && data.data.status === "success") {
      const payment = await saveDonation(data.data);
      return NextResponse.json({ success: true, data: payment });
    } else {
      return NextResponse.json(
        { success: false, error: "Verification failed", raw: data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verify route error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
