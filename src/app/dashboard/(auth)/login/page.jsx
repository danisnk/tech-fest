"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <div className={styles.loadingContainer}>
    <Skeleton  count={1} height={120} width={250} style={{ marginBottom: "10px" }} />
    <Skeleton count={1}  height={120} width={250} style={{ marginTop: "10px" }} />
  </div>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    setIsButtonClicked(true); // Set isButtonClicked to true on button click

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button
          className={`${styles.button} ${isButtonClicked && styles.clicked}`} // Add styles.clicked class when button is clicked
        >
          Login
        </button>
        {error && error}
      </form>
      {/* Remaining code */}
    </div>
  );
};

export default Login;
