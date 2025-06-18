"use client";

import Hero from "@/app/components/Hero";
import styles from './faq.module.css';

// app/contact/page.tsx
export default function Faq() {
  return (
    <section className={styles.faqPage}>
      <Hero title='FAQ' id={styles.faq}/>
      {/* Map, Form, Clergy Info */}
      <div className={styles.faqBox}>
        <div className={styles.faqQst}>
         <h3>1.What Are Your Service Times?</h3>        
        </div> 
        <div className={styles.ans}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, magnam unde. Distinctio aspernatur aliquid veritatis deserunt praesentium iusto soluta, maiores ipsam consectetur eos pariatur dolorem provident debitis vero dolores incidunt?</p>
        </div>                      
      </div>                                          
     

    {/* Please delete these lines of code when you are done looking through them */}
    {/* Please use an object containing id, question and answer as properties and map through it */}
    {/* checkout my format below */}

    {/* const faq = [
      {
        'id': 1,
        'question': '1. what is your name?',
        'answer': 'My name is Kalu',
      },
      {
        'id': 2,
        'question': '2. what is your name?',
        'answer': 'My name is Kalu',
      },
      {
        'id': 3,
        'question': '3. what is your name?',
        'answer': 'My name is Kalu',
      },
    ] */}
    {/* <section className={styles.checkout}>
      <div className={styles.qstbox}>
        <div className={styles.qst}>
          <h3>1. What is your name?</h3>  
        </div>
        <div className={styles.ans}>
          <p>My name is Kalu. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis incidunt quam voluptates saepe eos eveniet praesentium corrupti amet eum quis, iure obcaecati nemo ducimus officiis libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, omnis!
          </p> 
        </div>
      </div>
    </section> */}


    </section>
  );
}
                                              