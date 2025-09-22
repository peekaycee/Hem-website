import { supabase } from "@/app/lib/supabaseClient";

interface PaymentMetadata {
  fullName?: string;
  phone?: string;
  category?: string;
}

interface Payment {
  reference: string;
  status: string;
  amount: number;
  currency: string;
  paid_at: string;
  channel: string;
  gateway_response: string;
  customer: {
    email: string;
  };
  metadata?: PaymentMetadata;
}

export async function saveDonation(payment: Payment) {
  const paymentRecord = {
    transaction_id: payment.reference,
    status: payment.status,
    amount: payment.amount / 100, // kobo → NGN
    currency: payment.currency,
    paid_at: payment.paid_at,
    channel: payment.channel,
    gateway_response: payment.gateway_response,
    donor_email: payment.customer.email,
    donor_name: payment.metadata?.fullName || null,
    donor_phone: payment.metadata?.phone || null,
    category: payment.metadata?.category || null,
  };

  const { error } = await supabase
    .from("donations")
    .upsert(paymentRecord, { onConflict: "transaction_id" });

  if (error) {
    console.error("Supabase upsert error:", error);
    throw new Error("Database save failed");
  }

  return paymentRecord;
}
