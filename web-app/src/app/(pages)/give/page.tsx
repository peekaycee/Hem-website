"use client";

import { useState } from "react";
import Hero from "@/app/components/Hero";
import styles from './give.module.css';
import Button from "@/app/components/Button";

// ✅ Dynamically import PaystackButton on the client side only
import dynamic from "next/dynamic";
const PaystackButton = dynamic(() =>
  import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function Give() {
  const [formTitle, setFormTitle] = useState("Offering");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  // Subaccount mapping by category
  const subaccountMap: Record<string, string> = {
    Offering: "ACCT_yxr9wcq3bjitw8w",
    Tithe: "ACCT_eal1s4xwrolnldl",
    // "Building Project": "ACCT_XXXXX3",
    // Mission: "ACCT_XXXXX4",
    // Welfare: "ACCT_XXXXX5",
  };

  const handleCategoryClick = (category: string) => {
    setFormTitle(category);
  };

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAmount("");
  };

  const handleSuccess = (ref: any) => {
    alert("Payment successful! Reference: " + ref.reference);
    clearForm(); // ✅ Clear input fields
  };

  const handleClose = () => {
    alert("Payment closed.");
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount) * 100, // kobo
    publicKey,
    subaccount: subaccountMap[formTitle], // ✅ Route to selected account
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "fullName",
          value: fullName,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: phone,
        },
        {
          display_name: "Category",
          variable_name: "category",
          value: formTitle,
        },
      ],
    },
  };

  return (
    <section className={styles.givePage}>
      <Hero title='Give' id={styles.give} />

      <section className={styles.giveContainer}>
        <div className={styles.leftSide}>
          {["Offering", "Tithe", "Building Project", "Mission", "Welfare"].map(category => (
            <Button
              key={category}
              tag={category}
              className={styles.categoryBtn}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>

        <div className={styles.rightSide}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>{formTitle}</h1>

            <div className={styles.formDivs}>
              <input
                type="text"
                id="FullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formDivs}>
              <input
                type="email"
                id="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formDivs}>
              <input
                type="tel"
                id="PhoneNumber"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className={styles.formDivs}>
              <input
                type="number"
                id="amount"
                placeholder="Amount (NGN)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className={styles.formDivs}>
              <PaystackButton
                {...paystackConfig}
                className={styles.giveButton}
                text="Make Payment"
                onSuccess={handleSuccess}
                onClose={handleClose}
              />
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
