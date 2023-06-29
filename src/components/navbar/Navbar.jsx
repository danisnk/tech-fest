"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Text from "public/text.png";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Gallery",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Events",
    url: "/events",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  // {
  //   id: 6,
  //   title: "Dashboard",
  //   url: "/dashboard",
  // },
];

const Navbar = () => {
  const session = useSession();

  return (
    <div className={styles.container}>
    <Link href="/" passHref>
    <Image src={Text} alt="" className={styles.logo} />
    </Link>
    <div className={styles.links}>
      <DarkModeToggle />
      {links.map((link) => (
        <Link key={link.id} href={link.url} passHref>
          <span className={styles.link}>{link.title}</span>
        </Link>
      ))}
      {session.status === "authenticated" && (
        <button className={styles.logout} onClick={signOut}>
          Logout
        </button>
      )}
    </div>
  </div>
  );
};

export default Navbar;
