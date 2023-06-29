import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a gallery</h1>
      <div className={styles.items}>
        <Link href="/portfolio/Proshows" className={styles.item}>
          <span className={styles.title}>Proshows</span>
        </Link>
        <Link href="/portfolio/Workshops" className={styles.item}>
          <span className={styles.title}>Workshops</span>
        </Link>
        <Link href="/portfolio/Competitions" className={styles.item}>
          <span className={styles.title}>Competitions</span>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
