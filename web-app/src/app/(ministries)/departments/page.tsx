"use client";
import Hero from "@/app/components/Hero";
import styles from './departments.module.css';
import { GpPics1, GpPics2, GpPics3, GpPics4, GpPics5, GpPics6, GpPics7 } from "../../../../public/images";
import Image from 'next/image';

const departmentData = [
  {
    department: "Choir",
    text: "Ministering with grace and by the spirit of God.",
    image: GpPics2,
  },
  {
    department: "Ushers",
    text: "Cordinating and directing the affairs of the services is what we do.",
    image: GpPics4,
  },
  {
    department: "Children",
    text: "Our church is fun and we love coming to play and fellowship together",
    image: GpPics3,
  },
  {
    department: "Sanitation",
    text: "Cleanliness is next to godliness. Keep your environs clean always.",
    image: GpPics1,
  },
  {
    department: "Teachers",
    text: "Impacting lives and instilling godly character through effective teaching.",
    image: GpPics5,
  },
  {
    department: "Redeem Volunteers",
    text: "Through the power of God we safeguard the church from danger",
    image: GpPics6,
  },
  {
    department: "Teens (T4C)",
    text: "We are 'Teens for Christ - T4C'  and e uphold the name of Jesus wherever we go",
    image: GpPics7,
  },
]

// app/faq/page.tsx
export default function Departments() {
  return (
    <section className={styles.departmentPage}>
      <Hero title='Departments' id={styles.department}/>
      <div className={styles.ministers}>  
        { 
          departmentData.map( department => {
            return(
              <div className={styles.minDetails} key={department.department}>
                <div className={styles.name}>
                  <Image src={department.image} alt='New Events' width={0} height={0}/>
                  <div className={styles.nameDetail}>
                    <h3>{department.department}</h3>
                    <p>{department.text}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  );
}
