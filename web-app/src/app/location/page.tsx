"use client";

import dynamic from "next/dynamic";
import styles from "./location.module.css";
import Hero from "../components/Hero";
import { useState, useEffect } from "react";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

export default function LocationPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay for skeleton (until map fully mounts)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero title="Our Location" id={styles.location} />
      <div className={styles.locationWrapper}>
        {/* Map with skeleton fallback */}
        <div className={styles.mapCard}>
          {loading ? (
            <div className={`${styles.mapContainer} ${styles.skeleton}`} />
          ) : (
            <LocationMap />
          )}
        </div>

        {/* Info card */}
        <div className={styles.infoCard}>
          <h3 className={styles.heading}>📍 Visit Us</h3>
          <p className={styles.address}>
            9, Redeemed Avenue Street, Off Remlek Bus-stop, Badore, Ajah, Lagos.
          </p>

          <h4 className={styles.subheading}>🛣️ How to Get Here</h4>
          <p>From Ajah, follow these steps:</p>
          <ul className={styles.steps}>
            <li>
              Board a tricycle heading towards <strong>Badore</strong>.
            </li>
            <li>
              Alight at <strong>Remlek Bus-stop</strong>.
            </li>
            <li>
              Enter <strong>Royal Palm Will Estate</strong>.
            </li>
            <li>
              Board another tricycle going towards{" "}
              <strong>Goodness Estate</strong>.
            </li>
            <li>
              Alight at the junction and turn <strong>right</strong>.
            </li>
            <li>Walk straight down to our church.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
