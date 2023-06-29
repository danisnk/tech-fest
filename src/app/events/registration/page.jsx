"use client"
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract event title from query parameter in the URL
    const title = searchParams.get("title");
    if (title) {
      setEventTitle(title);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration happening..");

    // Create an object with the form data
    const formData = {
      name,
      email,
      phoneNumber: phone,
      title: eventTitle,
    };

    try {
      setIsRegistering(true); // Set the registering state to true

      // Send the form data to the API endpoint
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        setRegistrationSuccess(true);
        console.log("Registration successful");
        setShowPopup(true); // Show the popup
      } else {
        // Registration failed, handle the error
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsRegistering(false); // Set the registering state to false
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup
    router.push("/events")
  };

  if (isRegistering) {
    return <div className={styles.skeleton}><Skeleton count={1} height={350} width={350} style={{ marginBottom: "10px" }} /></div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registration Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.eventTitle}>{eventTitle}</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p className={styles.popupMessage}>Registration successful!</p>
            <button className={styles.closeButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
