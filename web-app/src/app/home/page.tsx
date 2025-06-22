"use client";
import styles from './home.module.css';
import Button from '../components/Button';
import Image from 'next/image';
import { Image9, Image10, Image11, Image12, Image13, Image14, Pic1, ChurchLogo } from '../../../public/images';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter()

  const redirectToGivePage = () => {
    router.push("/pages/give");
  }
  const redirectToAnnouncement = () => {
    router.push("/services/announcements")
  }
  const redirectToPrayer = () => {
    router.push("/pages/prayers")
  }
    const previousTestimonies = () => {
    setTestimony(prev => Math.max(prev - 1, 1));
  };

  const nextTestimonies = () => {
    setTestimony(prev => Math.min(prev + 1, 3));
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

      {/* About section */}
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
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae deleniti expedita quasi iusto consequatur temporibus reiciendis eos? Facere ipsum dolores ut facilis recusandae corporis, laudantium possimus optio provident sed magni consequatur eveniet similique et suscipit reiciendis aut molestias cum consequuntur ratione? Similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum est ea ipsa officiis provident animi modi, amet adipisci iure, voluptas quas aspernatur delectus nam aut veniam minus quos suscipit voluptatibus! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        </section>
        
        {/* Church Project Section */}
        <section className={styles.prototype}>
          <div className={styles.projectContent}>
            <h2>Join Us To Make The Church Building A Reality.</h2>
            <p>Partner With Us Today!</p>
            <Button tag='Donation' onClick={redirectToGivePage}/>
          </div>
        </section>
        
        {/* Events Section */}
        <section className={styles.event}>
          <h2>Upcoming Programs</h2>
          <div className={styles.events}>
            <div>
              <Image src={Image12} alt='New Events' width={0} height={0}/>
            </div>
            <div>
              <Image src={Image13} alt='New Events' width={0} height={0}/>
            </div>
            <div>
              <Image src={Image14} alt='New Events' width={0} height={0}/>
            </div>
            <div>
              <Image src={Image9} alt='New Events' width={0} height={0}/>
            </div>
            <div>
              <Image src={Image10} alt='New Events' width={0} height={0}/>
            </div>
            <div>
              <Image src={Image11} alt='New Events' width={0} height={0}/>
            </div>
          </div>
          <Button tag='view all' onClick={redirectToAnnouncement}/>
        </section>
        
        {/* Ministers Section */}
        <section className={styles.minister}>
          <h2>Meet Our Ministers</h2>
          <div className={styles.ministers}>
            <div className={styles.minDetails}>
              <div className={styles.name}>
                <Image src={Pic1} alt='New Events' width={0} height={0}/>
                <h3>Bro Godwin</h3>
                <p>Asst. Parish Pastor</p>
              </div>
            </div>
            <div className={styles.minDetails}>
              <div className={styles.name}>
                <Image src={Pic1} alt='New Events' width={0} height={0}/>
                <h3>Bro Peter</h3>
                <p>Church Admin</p>
              </div>
            </div>
            <div className={styles.minDetails}>
              <div className={styles.name}>
                <Image src={Pic1} alt='New Events'/>
                <h3>Bro Sanjo</h3>
                <p>Hospitality</p>
              </div>
            </div>
            <div className={styles.minDetails}>
              <div className={styles.name}>
                <Image src={Pic1} alt='New Events'/>
                <h3>Bro Sanjo</h3>
                <p>Hospitality</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonies Section */}
        <section className={styles.testimony}>
          <h2>Testimonies</h2>
          <div className={styles.testifiersDetails}>
            <ChevronLeft size={24} className={styles.dir} onClick={previousTestimonies}/>
            {// first
              testimony === 1 && 
              (<div className={`${styles.testimonyWrapper} ${styles.first}`}>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 1</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 1</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 1</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
            </div>)
            }
            {// second
              testimony === 2 && 
              (<div className={`${styles.testimonyWrapper} ${styles.first}`}>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 2</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 2</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 2</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
            </div>)
            }
            {// Third
              testimony === 3 && 
              (<div className={`${styles.testimonyWrapper} ${styles.first}`}>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 3</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 3</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
              <div className={styles.testimonies}>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate.
                  </p>
                </div>
                <div className={styles.testifier}>
                  <h3>John Doe 3</h3>
                  <Image src={Pic1} alt='testifier'/>
                </div>  
              </div>
            </div>)
            } 
            <ChevronRight size={24} className={styles.dir} onClick={nextTestimonies}/>
          </div>
          <div className={styles.direction}>
          </div>

        </section>

        {/* Prayer CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Need Someone To Pray With?</h2>
            <Button tag={'Reach Out To Us'} onClick={redirectToPrayer}/>
          </div>
        </section>

        {/* Church Logo */}
        <section className={styles.churchLogo}>
          <Image src={ChurchLogo} alt='New Events'/>
        </section>
      {/* Events Teaser */}
    </main>
  );
}
