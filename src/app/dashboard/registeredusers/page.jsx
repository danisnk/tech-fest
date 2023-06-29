"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RegisteredUsers = () => {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/registrations");
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Sort the data array based on registered event title
    setData(prevData => [...prevData].sort((a, b) => a.title.localeCompare(b.title)));
  }, [data]); // Trigger the sorting whenever the data array changes

  if (session.status === "loading" || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Skeleton height={30} width={200} style={{ marginBottom: "10px" }} />
        <Skeleton count={10} style={{ marginBottom: "10px" }} />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
    return null;
  }

  // Group the users by registered event
  const groupedData = {};
  data.forEach((user) => {
    if (groupedData[user.title]) {
      groupedData[user.title].push(user);
    } else {
      groupedData[user.title] = [user];
    }
  });

  return (
    <div className={styles.container}>
      <h1>Registered Users</h1>
      {Object.entries(groupedData).map(([eventTitle, users]) => (
        <div key={eventTitle}>
          <div className={styles.eventContainer}>
          <h2 className={styles.eventTitle}>{eventTitle}</h2>
          </div>
          <div className={styles.gridContainer}>
            {users.map((user) => (
              <div key={user.id} className={styles.user}>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>Name: {user.name}</p>
                  <p className={styles.userEmail}>Email: {user.email}</p>
                  <p className={styles.userPhoneNumber}>Phone: {user.phoneNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisteredUsers;
