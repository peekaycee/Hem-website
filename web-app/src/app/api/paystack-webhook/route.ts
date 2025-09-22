import { NextResponse } from "next/server";
import { saveDonation } from "@/app/lib/saveDonation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Paystack webhook secret verification (optional but recommended)
    // const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
    // const signature = req.headers.get("x-paystack-signature");
    // 👉 you’d compare HMAC here if you enable webhook secret

    if (body.event === "charge.success") {
      const payment = await saveDonation(body.data);
      return NextResponse.json({ success: true, data: payment });
    }

    return NextResponse.json({ success: true, message: "Event ignored" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false, error: "Webhook error" }, { status: 500 });
  }
}
