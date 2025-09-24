"use client";

import { useState, useEffect } from "react";
import Hero from "@/app/components/Hero";
import styles from './give.module.css';
import Button from "@/app/components/Button";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(() =>
  import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function Give() {
  const [formTitle, setFormTitle] = useState("Offering"); // default to Offering
  const [activeCategory, setActiveCategory] = useState<string | null>("Offering"); // ✅ open Offering on load
  const [isMobile, setIsMobile] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const subaccountMap: Record<string, string> = {
    // Offering: "ACCT_yxr9wcq3bjitw8w",
    Offering: "ACCT_sg0ocq2xfk9irny",
    Tithe: "ACCT_eal1s4xwrolnldl",
    "Building Project": "ACCT_XXXXX3",
    Mission: "ACCT_XXXXX4",
    Welfare: "ACCT_XXXXX5",
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Ensure Offering is always open on load
  useEffect(() => {
    setActiveCategory("Offering");
  }, []);

  const handleCategoryClick = (category: string) => {
    setFormTitle(category);
    if (isMobile) {
      setActiveCategory(activeCategory === category ? null : category); // toggle open/close
    }
  };

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAmount("");
  };

  // Prevously handling clents alone
  // const handleSuccess = (ref: { reference: string }) => {
  //   alert("Payment successful! Reference: " + ref.reference);
  //   clearForm();
  // };

  //======================================================================
  // Verifying from API route
  const handleSuccess = async (ref: { reference: string }) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref.reference }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Payment verified successfully!");
        clearForm();
        console.log("Verified payment:", result.data);
      } else {
        alert("Payment could not be verified. Please contact support.");
        console.error(result.error);
      }
    } catch (err) {
      alert("An error occurred while verifying payment.");
      console.error(err);
    }
  };
//======================================================================

  // please modify for redirect please
  const handleClose = () => {
    alert("Payment closed.");
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount) * 100,
    publicKey,
    subaccount: subaccountMap[formTitle],
    metadata: {
      custom_fields: [
        { display_name: "Full Name", variable_name: "fullName", value: fullName },
        { display_name: "Phone Number", variable_name: "phone", value: phone },
        { display_name: "Category", variable_name: "category", value: formTitle },
      ],
    },
  };

  return (
    <section className={styles.givePage}>
      <Hero title="Give" id={styles.give} />

      <section className={styles.giveContainer}>
        <div className={styles.leftSide}>
          {["Offering", "Tithe", "Building Project", "Mission", "Welfare"].map((category) => (
            <div key={category} style={{ width: "100%" }}>
              <Button
                tag={category}
                className={styles.categoryBtn}
                onClick={() => handleCategoryClick(category)}
              />

              {/* ✅ Mobile: show form under clicked button */}
              {isMobile && activeCategory === category && (
                <div className={styles.rightSide}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <h1>{formTitle}</h1>

                    <div className={styles.formDivs}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formDivs}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formDivs}>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formDivs}>
                      <input
                        type="number"
                        placeholder="Amount (NGN)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={1000}
                        step={100}
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
              )}
            </div>
          ))}
        </div>

        {/* ✅ Desktop: form on the right side only */}
        {!isMobile && (
          <div className={styles.rightSide}>
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>{formTitle}</h1>

              <div className={styles.formDivs}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formDivs}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formDivs}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formDivs}>
                <input
                  type="number"
                  placeholder="Amount (NGN)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={1000}
                  step={100}
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
        )}
      </section>
    </section>
  );
}
