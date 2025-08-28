"use client";
import Hero from "@/app/components/Hero";
import styles from './departments.module.css';
import { Pic1 } from "../../../../public/images";
import Image from 'next/image';

const departmentData = [
  {
    department: "Choir",
    text: "A brief text describing the choir and their performance",
    image: Pic1
  },
  {
    department: "Ushers",
    text: "A brief text describing the ushers and their performance",
    image: Pic1
  },
  {
    department: "Treasury",
    text: "A brief text describing the treasury and their performance",
    image: Pic1
  },
  {
    department: "Sanitation",
    text: "A brief text describing the sanitation and their performance",
    image: Pic1
  },
  {
    department: "Teachers",
    text: "A brief text describing the teachers and their performance",
    image: Pic1
  },
  {
    department: "Redeem Volunteers",
    text: "A brief text describing the Redeem Volunteers and their performance",
    image: Pic1
  },
  {
    department: "Security",
    text: "A brief text describing the security and their performance",
    image: Pic1
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
                  <Image src={Pic1} alt='New Events' width={0} height={0}/>
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
