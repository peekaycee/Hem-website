/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./announcement.module.css";
import Hero from "@/app/components/Hero";
import { Image11, Image12, Image13, Image14 } from "../../../../public/images";
import { supabase } from "@/app/lib/supabaseClient";

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  ministering: string;
  image?: string;
  fullDate?: Date;
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hr = hour % 12 || 12;
  return `${hr}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// ✅ local image mapping
const imageMap: Record<string, any> = {
  Image11,
  Image12,
  Image13,
  Image14,
};

export default function Announcement() {
  const [programs, setPrograms] = useState<Announcement[]>([]);

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
        image:
          program.image && imageMap[program.image as keyof typeof imageMap]
            ? imageMap[program.image as keyof typeof imageMap]
            : Image12, // fallback image
        fullDate: new Date(`${program.date}T${program.time}`),
      }));

      setPrograms(enriched);
    };

    fetchPrograms();
  }, []);

  if (programs.length === 0) return null;

  // ✅ show last as next, rest as scheduled
  const nextProgram = programs[programs.length - 1];
  const scheduledPrograms = programs.slice(0, programs.length - 1).reverse();

  return (
    <section className={styles.announcementPage}>
      <Hero title="Programs" id={styles.announcement} />
      <div className={styles.announcementWrapper}>
        {nextProgram && (
          <div className={styles.next}>
            <h1>Next Program</h1>
            <div className={styles.nextAnnouncement}>
              <div className={styles.announcementThumbnail}>
                <Image
                  src={nextProgram.image as string | StaticImageData}
                  alt={nextProgram.title}
                  width={500}
                  height={300}
                />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>
                  {nextProgram.title}{" "}
                  <span>- happening @{nextProgram.venue}</span>
                </h2>
                <p className={styles.dateTime}>
                  {formatDate(nextProgram.date)} |{" "}
                  {formatTime(nextProgram.time)}
                </p>
                <p className={styles.ministering}>
                  <span>Ministering :</span> {nextProgram.ministering}
                </p>
                <p className={styles.expectation}>{nextProgram.description}</p>
              </div>
            </div>
          </div>
        )}

        {scheduledPrograms.length > 0 && (
          <div className={styles.scheduled}>
            <h1>Scheduled Programs</h1>
            {scheduledPrograms.map((program) => (
              <div className={styles.nextAnnouncement} key={program.id}>
                <div className={styles.announcementThumbnail}>
                  <Image
                    src={program.image ?? Image12}
                    alt={program.title}
                    width={500}
                    height={300}
                  />
                </div>
                <div className={styles.announcementBriefs}>
                  <h2>
                    {program.title} <span>- happening @{program.venue}</span>
                  </h2>
                  <p className={styles.dateTime}>
                    {formatDate(program.date)} | {formatTime(program.time)}
                  </p>
                  <p className={styles.ministering}>
                    <span>Ministering : </span>
                    {program.ministering}
                  </p>
                  <p className={styles.expectation}>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
