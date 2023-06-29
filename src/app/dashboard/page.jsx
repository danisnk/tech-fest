"use client"
import {useState} from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  if (session.status === "loading") {
    return <div className={styles.loadingContainer}>
    <Skeleton  count={1} height={120} width={250} style={{ marginBottom: "10px" }} />
    <Skeleton count={1}  height={120} width={250} style={{ marginTop: "10px" }} />
  </div>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
    return null;
  }

  const handleAddNewEvent = () => {
    setIsButtonClicked(true);
    router.push("/dashboard/addevent");
  };

  const handleSeeRegisteredUsers = () => {
    setIsButtonClicked(true);
    router.push("/dashboard/registeredusers");
  };

  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${isButtonClicked && styles.clicked}`} onClick={handleAddNewEvent}>
        Add New Event
      </button>
      <button className={`${styles.seebutton} ${isButtonClicked && styles.clicked}`} onClick={handleSeeRegisteredUsers}>
        See Registered Users
      </button>
    </div>
  );
};

export default Dashboard;
