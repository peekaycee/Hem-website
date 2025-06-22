"use client";

import Image from 'next/image';
import Button from '../../components/Button';
import styles from "./announcement.module.css";
import Hero from "@/app/components/Hero";
import { useRouter } from "next/navigation";
import { Image11, Image12, Image13, Image14 } from '../../../../public/images';
import ProgramData from '../../data/announcements.json';

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

export default function Announcement() {
  const router = useRouter();

  const imageMap: Record<string, any> = {
    Image11,
    Image12,
    Image13,
    Image14,
  };

  const enrichedPrograms = ProgramData.map((program) => ({
    ...program,
    image: imageMap[program.image] || Image12,
  }));

  const nextProgram = enrichedPrograms[enrichedPrograms.length - 1];
  const scheduledPrograms = enrichedPrograms.slice(0, -1);

  return (
    <section className={styles.announcementPage}>
      <Hero title="Programs" id={styles.announcement} />
      <div className={styles.announcementWrapper}>
        <div className={styles.next}>
          <h1>Next Program</h1>
          <div className={styles.nextAnnouncement}>
            <div className={styles.announcementThumbnail}>
              <Image src={nextProgram.image} alt={nextProgram.title} />
            </div>
            <div className={styles.announcementBriefs}>
              <h2>{nextProgram.title} <span>- happening @{nextProgram.venue}</span></h2>
              <p>{formatDate(nextProgram.date)} | {formatTime(nextProgram.time)}</p>
              <p>{nextProgram.description}</p>
              <div className={styles.seeMoreButton}>
                <Button tag="See Details" onClick={() => router.push(`/announcements/${nextProgram.id}`)} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scheduled}>
          <h1>Scheduled Programs</h1>
          {scheduledPrograms.map((program) => (
            <div className={styles.nextAnnouncement} key={program.id}>
              <div className={styles.announcementThumbnail}>
                <Image src={program.image} alt={program.title} />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>{program.title} <span>- happening @{program.venue}</span></h2>
                <p>{formatDate(program.date)} | {formatTime(program.time)}</p>
                <p>{program.description}</p>
                <div className={styles.seeMoreButton}>
                  <Button tag="See Details" onClick={() => router.push(`/announcements/${program.id}`)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
