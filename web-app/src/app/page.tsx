"use client";

import styles from './home.module.css';
import Button from './components/Button';
import Image from 'next/image';
import { Pic1, ChurchLogo } from '../../public/images';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { announcementImages } from '../app/(services)/announcements/page.tsx';

export default function Home() {
  const router = useRouter();

  const redirectToGivePage = () => {
    router.push("/give");
  };
  const redirectToAnnouncement = () => {
    router.push("/announcements");
  };
  const redirectToPrayer = () => {
    router.push("/prayers");
  };

  const previousTestimonies = () => {
    setTestimony((prev) => Math.max(prev - 1, 1));
  };

  const nextTestimonies = () => {
    setTestimony((prev) => Math.min(prev + 1, 3));
  };

  const [testimony, setTestimony] = useState(1);

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.video}>
          <video src="/videos/Hema-vid.mp4" loop autoPlay muted playsInline></video>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.details}>
          <div className={styles.detailImage}></div>
          <div className={styles.pastorsDetails}>
            <h3>Pastor & Mrs. Gbdegheshin</h3>
            <abbr>PICA</abbr>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <h2>About HEMA </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi iste quas hic, harum magni placeat consequatur laboriosam, nemo vel nulla alias aut quod debitis eaque, quasi rem! Quaerat rerum eaque tenetur quis, id accusamus tempora error nulla tempore officiis, eligendi aliquam quisquam. Incidunt repellat nisi facere labore amet. Velit?
          </p>
        </div>
      </section>

      {/* Church Project Section */}
      <section className={styles.prototype}>
        <div className={styles.projectContent}>
          <h2>Join Us To Make The Church Building A Reality.</h2>
          <p>Partner With Us Today!</p>
          <Button tag="Donation" onClick={redirectToGivePage} />
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.event}>
        <h2>Upcoming Programs</h2>
        {/* <div className={styles.events}>
          {[...announcementImages].reverse().map((img, index) => (
            <div key={index}>
              <Image src={img} alt="New Events" width={0} height={0} />
            </div>
          ))}
        </div> */}
        <Button tag="view all" onClick={redirectToAnnouncement} />
      </section>

      {/* Ministers Section */}
      <section className={styles.minister}>
        <h2>Meet Our Ministers</h2>
        <div className={styles.ministers}>
          {[1, 2, 3, 4].map((n) => (
            <div className={styles.minDetails} key={n}>
              <div className={styles.name}>
                <Image src={Pic1} alt="New Events" width={0} height={0} />
                <h3>Bro {["Godwin", "Peter", "Sanjo", "Sanjo"][n - 1]}</h3>
                <p>{["Asst. Parish Pastor", "Church Admin", "Hospitality", "Hospitality"][n - 1]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonies Section */}
      <section className={styles.testimony}>
        <h2>Testimonies</h2>
        <div className={styles.testifiersDetails}>
          <ChevronLeft size={24} className={styles.dir} onClick={previousTestimonies} />
          {[1, 2, 3].map((n) =>
            testimony === n ? (
              <div className={`${styles.testimonyWrapper} ${styles.first}`} key={n}>
                {[...Array(3)].map((_, i) => (
                  <div className={styles.testimonies} key={i}>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, iste.
                      </p>
                    </div>
                    <div className={styles.testifier}>
                      <h3>John Doe {n}</h3>
                      <Image src={Pic1} alt="testifier" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
          <ChevronRight size={24} className={styles.dir} onClick={nextTestimonies} />
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
