"use client";

import { useState, useEffect } from "react";
import Hero from "@/app/components/Hero";
import styles from './give.module.css';
import Button from "@/app/components/Button";

export default function Give() {
  const [formTitle, setFormTitle] = useState("Offering");
  const [activeCategory, setActiveCategory] = useState<string | null>("Offering");
  const [isMobile, setIsMobile] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  // ✅ Map each category to its subaccount
  const subaccountMap: Record<string, string> = {
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

  useEffect(() => {
    setActiveCategory("Offering");
  }, []);

  const handleCategoryClick = (category: string) => {
    setFormTitle(category);
    if (isMobile) {
      setActiveCategory(activeCategory === category ? null : category);
    }
  };

  // ✅ Handle donation via backend initialize route
  const handleDonate = async () => {
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: Number(amount), // NGN
          subaccount: subaccountMap[formTitle],
          metadata: {
            fullName,
            phone,
            category: formTitle,
          },
        }),
      });

      const result = await res.json();

      if (result.success && result.data?.authorization_url) {
        // Redirect donor to Paystack checkout
        window.location.href = result.data.authorization_url;
      } else {
        alert(`Error: ${result.error || "Could not start payment"}`);
        console.error("Initialize error:", result);
      }
    } catch (err) {
      alert("Something went wrong while starting payment.");
      console.error(err);
    }
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

              {isMobile && activeCategory === category && (
                <div className={styles.rightSide}>
                  <form onSubmit={(e) => { e.preventDefault(); handleDonate(); }}>
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
                        min={500}
                        step={100}
                        required
                      />
                    </div>

                    <div className={styles.formDivs}>
                      <button type="submit" className={styles.giveButton}>
                        Make Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>

        {!isMobile && (
          <div className={styles.rightSide}>
            <form onSubmit={(e) => { e.preventDefault(); handleDonate(); }}>
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
                  min={500}
                  step={100}
                  required
                />
              </div>

              <div className={styles.formDivs}>
                <button type="submit" className={styles.giveButton}>
                  Make Payment
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </section>
  );
}
