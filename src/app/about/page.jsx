/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://i.ibb.co/bFWvWTR/proshow3.jpg"
          fill={true}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Welcome to MESMERA</h1>
          <p className={styles.desc}>
            Welcome to MESMERA, an exciting celebration of innovation, creativity, and technological prowess! We are thrilled to present an extraordinary platform where brilliant minds come together to showcase their talents, exchange knowledge, and explore the frontiers of technology.
            <br />
            <br />
            At MESMERA, we believe in the power of imagination and the limitless possibilities that technology brings. Whether you're a student, professional, or technology enthusiast, MESMERA offers a diverse range of events, competitions, and workshops tailored to inspire and challenge you.
            <br />
            <br />
            From robotics and artificial intelligence to virtual reality and cybersecurity, MESMERA covers a broad spectrum of disciplines that redefine the future. Join us on this exhilarating journey of discovery and transformation as we pave the way for a more connected and innovative world.
            <br />
            <br />
            Experience the electrifying atmosphere, the camaraderie of passionate individuals, and the thrill of witnessing groundbreaking ideas come to life. MESMERA is where dreams become reality, where innovation takes center stage, and where the possibilities are truly limitless.
            <br />
            <br />
            Join us at MESMERA and be part of an extraordinary celebration of technology, creativity, and the boundless human spirit. Together, let's embrace the future and shape a world driven by imagination and innovation.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Unleash Your Potential</h1>
          <p className={styles.desc}>
            Unleash Your Potential at MESMERA! Whether you are a budding technologist, a seasoned professional, or simply curious about the latest tech trends, our event has something for everyone. Be prepared to witness breakthrough inventions, awe-inspiring demonstrations, and gain invaluable insights from experts in various fields.
            <br />
            <br />
            Discover groundbreaking inventions that push the boundaries of what's possible. Immerse yourself in captivating demonstrations that showcase the latest advancements across diverse fields. From robotics and artificial intelligence to augmented reality and blockchain, MESMERA covers a wide array of cutting-edge technologies that will leave you in awe.
            <br />
            <br />
            But MESMERA isn't just about witnessing innovation; it's about experiencing it firsthand. Engage in interactive workshops led by industry experts, where you can acquire new skills, learn about emerging trends, and gain practical insights that can shape your future.
            <br />
            <br />
            Network with like-minded individuals, connect with industry professionals, and forge valuable collaborations that can propel your career to new heights. MESMERA is not just an event; it's a vibrant community where passionate individuals come together to inspire and support each other.
            <br />
            <br />
            So, mark your calendars and get ready to unleash your potential at MESMERA. Ignite your imagination, fuel your ambition, and embark on an extraordinary journey of self-discovery. The possibilities are limitless, and your journey starts here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
