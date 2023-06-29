"use client"

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Blog = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/posts", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegister = (title) => {
    setIsButtonClicked(true);
    const registrationRoute = `/events/registration?title=${encodeURIComponent(title)}`;
    router.push(registrationRoute);
  };

  if (isLoading) {
    return <div>
      <Skeleton count={10} height={40} style={{marginBottom: "10px"}} />
    </div>;
  }

  // Group events by category
  const categorizedEvents = {};
  data.forEach(item => {
    const category = item.desc;
    if (!categorizedEvents[category]) {
      categorizedEvents[category] = [];
    }
    categorizedEvents[category].push(item);
  });

  return  (
    <div className="div">
      <h1 className={styles.Head}>Unlock Your Potential, Register for Our Exciting Event</h1>
   
  <div className={styles.mainContainer}>
    {Object.entries(categorizedEvents).map(([category, events]) => {
      let isFirstCategory = true; // Variable to track the first category

      return (
        <React.Fragment key={category}>
          <div className={styles.categoryContainer}>
          <h2 className={`${styles.categoryHeading} ${isFirstCategory ? styles.centeredHeading : ""}`}>
            {isFirstCategory && <br />} {/* Add a line break for the first category heading */}
            {category}
          </h2>
          </div>
          <div className={styles.rowContainer}>
            {events.map((item) => (
              <div className={styles.container} key={item.id}>
                <div className={styles.imageContainer}>
                  <Image src={item.img} alt="" width={400} height={250} className={styles.image} />
                </div>
               
                <div className={styles.content}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <p className={styles.content}>{item.content}</p>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.registerButton} ${isButtonClicked && styles.clicked}`}
                    onClick={() => handleRegister(item.title)}
                  >
                    Register
                  </button>
                </div>
                </div>
            ))}
          </div>
        </React.Fragment>
      );
    })}
  </div>
   </div>
);
  }

export default Blog;


