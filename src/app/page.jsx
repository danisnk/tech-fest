import Image from "next/image";
import styles from "./page.module.css";
import Logo from "public/logo.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
        Igniting Brilliance at MESMERA Fest!
        </h1>
        <p className={styles.desc}>
        Empowering Innovation, Unleashing Creativity: MESITAM Presents its Spectacular Technical Cultural Fest!
        </p>
        <Button url="/portfolio" text="See Our Gallery"/>
      </div>
      <div className={styles.item}>
        <Image src={Logo} alt="" className={styles.img} />
      </div>
    </div>
  );
}
