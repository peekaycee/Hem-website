"use client";

import styles from "./home.module.css";
import Button from "./components/Button";
import Image from "next/image";
import { Min1, Min2, Min4, Min6, Testifier1, Testifier2, Testifier3, Testifier4, Testifier5, Testifier6, Testifier7, Testifier8, Testifier9, ChurchLogo, FallbackImage } from "../../public/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient";

const testifiers = [
  {
    name: "Eld. Bababfemi", 
    text: "At HEMA, God transformed my life with healing, peace, and renewed strength through worship, prayer, and the power of His Word.", 
    thumbnail: Testifier1,
  },
  {
    name: "Taiwo", 
    text: "I came broken, but through HEMA’s prayers and teachings, God restored my joy, and gave me new purpose.", 
    thumbnail: Testifier2,
  },
  {
    name: "Deac. Oludayo", 
    text: "Through heartfelt worship at HEMA, I encountered God’s presence deeply, and found strength to overcome life’s challenges victoriously.", 
    thumbnail: Testifier3,
  },
  {
    name: "Sis. Jumoke", 
    text: "HEMA has been a source of hope, and spiritual growth, helping me draw closer to God and experience lasting transformation.", 
    thumbnail: Testifier4,
  },
  {
    name: "Peter Wey", 
    text: "Prayer services at HEMA connected me to God’s power, miracles, and testimonies I never imagined possible in my life.", 
    thumbnail: Testifier5,
  },
  {
    name: "Princess Faith", 
    text: "Through fellowship and prayer at HEMA, I found healing, and strength to keep walking in God’s divine purpose daily.", 
    thumbnail: Testifier6,
  },
  {
    name: "Chelsea", 
    text: "My faith was strengthened at HEMA through Bible study, worship, and filling me with courage, hope, and spiritual renewal.", 
    thumbnail: Testifier7,
  },
  {
    name: "Odinaka", 
    text: "God answered my long-awaited prayers during a HEMA service, proving His mercy, and love to me in miraculous ways.", 
    thumbnail: Testifier8,
  },
  {
    name: "Min. Adeyemo", 
    text: "Attending HEMA filled my heart with gratitude, joy, and peace as God lifted my burdens and gave me fresh direction.", 
    thumbnail: Testifier9,
  },
]

const ministersData = [
  {
    name: "Deac. Godwin",
    position: "Asst. Pastor",
    imageSrc: Min1, 
  },
  {
    name: "Min. Sanjo",
    position: "Minister/Hospitality",
    imageSrc: Min2,
  },
  {
    name: "Min. Peter",
    position: "Church Admin",
    imageSrc: Min4,
  },
  {
    name: "Min. Kolawole",
    position: "Minister",
    imageSrc: Min6,
  },
]

// Reusable fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  const router = useRouter();
  const [testimony, setTestimony] = useState(1);
  type Program = {
    id: number;
    title: string;
    date: string;
    image?: string;
    [key: string]: unknown;
  };
  const [programs, setPrograms] = useState<Program[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Hero video autoplay setup
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.setAttribute("muted", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");

      setTimeout(() => {
        video.play().catch((err) => console.warn("Autoplay prevented:", err));
      }, 200);
    }
  }, []);

  // Fetch announcements from Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching announcements:", error);
        return;
      }

      const enriched = (data || []).map((program) => ({
        ...program,
        image: program.image || "", // leave blank, handle in render with fallback
      }));

      setPrograms(enriched);
    };

    fetchPrograms();
  }, []);

  const redirectToGivePage = () => router.push("/give");
  const redirectToAnnouncement = () => router.push("/announcements");
  const redirectToDepartment = () => router.push("/departments");
  const redirectToPrayer = () => router.push("/prayers");

  const previousTestimonies = () =>
    setTestimony((prev) => Math.max(prev - 1, 1));
  const nextTestimonies = () =>
    setTestimony((prev) => Math.min(prev + 1, 3));

  // Smooth infinite scroll setup
  const [, setTrackWidth] = useState(0);
  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2); // half because we duplicate items
    }
  }, [programs]);

  return (
    <main>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.video}>
          <video
            ref={videoRef}
            src="/videos/Hema-vid.mp4"
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className={styles.about}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.details}>
          <div className={styles.detailImage}></div>
          <div className={styles.pastorsDetails}>
            <h3>Pastor & Mrs. Gbadegeshin</h3>
            <abbr>PICA</abbr>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <h2>About HEMA </h2>
          <p>
            We are a faith-driven ministry dedicated to inspiring hope, nurturing
            spiritual growth, and transforming lives. Through heartfelt worship,
            fervent prayer, engaging bible study, and impactful community
            outreach, HEMA empowers individuals to draw closer to God, live
            victoriously, and positively influence the world with unwavering
            faith.
          </p>
        </div>
      </motion.section>
      {/* Church Project Section */}
      <div className={styles.mobileChurch}></div>
      <motion.section
        className={styles.prototype}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        <div className={styles.projectContent}>
          <div className={styles.overlay}></div>
          <h2>Join Us To Make The Church Building A Reality.</h2>
          <p>Partner With Us Today!</p>
          <Button tag="Donate" onClick={redirectToGivePage} />
        </div>
      </motion.section>

      {/* Events Section (Infinite Scroll, Continuous, No Flicker) */}
      <section className={styles.event}>
        <h2>Upcoming Programs</h2>
        <div className={styles.eventsWrapper}>
          {typeof window !== "undefined" && programs.length > 0 && (
            <motion.div
              className={styles.track}
              animate={{ x: ["0%", "-50%"] }} // scroll by half the track since we duplicated
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {[...programs.filter(p => p.image), ...programs.filter(p => p.image)].map(
                (program, index) => (
                  <div
                    className={styles.eventImageWrapper}
                    key={`program-${program.id}-${index}`}
                  >
                    <Image
                      src={program.image || FallbackImage.src}
                      alt={program.title || "Announcement image"}
                      width={200} 
                      height={200}              
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "var(--br-2)",
                      }}
                      priority={false}          // optional, prevents preloading all
                    />
                  </div>

                )
              )}
            </motion.div>

          )}
        </div>
        <Button tag="View all" onClick={redirectToAnnouncement} />
      </section>

      {/* Ministers Section */}
      <section className={styles.minister}>
        <h2>Meet Our Ministers</h2>
        <div className={styles.ministers}>
          {/* {[1, 2, 3, 4].map((n) => ( */}
          {ministersData.map((n) => (
            <div className={styles.minDetails} key={n.name}>
              <div className={styles.name}>
                <Image src={n.imageSrc} alt="New Events" width={0} height={0}/>
                <h3>{n.name}</h3>
                <p>{n.position}</p>
              </div>
            </div>
          ))}
        </div>
        <Button tag="Meet others" onClick={redirectToDepartment} />
      </section>

      {/* Testimonies Section */}
      <section className={styles.testimony}>
  <h2>Testimonies</h2>
  <div className={styles.testifiersDetails}>
    <ChevronLeft
      size={24}
      className={styles.dir}
      onClick={previousTestimonies}
    />
    {[1, 2, 3].map((n) =>
      testimony === n ? (
        <div
          className={`${styles.testimonyWrapper} ${styles.first}`}
          key={n}
        >
          {testifiers
            .slice((n - 1) * 3, n * 3)
            .map((person, i) => (
              <div className={styles.testimonies} key={i}>
                <div>
                  <p>{person.text}</p>
                </div>
                <div className={styles.testifier}>
                  <h3>{person.name}</h3>
                  <Image src={person.thumbnail} alt={person.name} />
                </div>
              </div>
            ))}
        </div>
      ) : null
    )}
    <ChevronRight
      size={24}
      className={styles.dir}
      onClick={nextTestimonies}
    />
  </div>
</section>


      {/* Prayer CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Need Someone To Pray With?</h2>
          <Button tag="Reach Out To Us" onClick={redirectToPrayer} />
        </div>
      </section>

      {/* Church Logo */}
      <section className={styles.churchLogo}>
        <Image src={ChurchLogo} alt="New Events" />
      </section>
    </main>
  );
}
