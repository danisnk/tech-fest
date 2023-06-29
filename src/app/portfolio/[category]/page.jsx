import React from "react";
import styles from "./page.module.css";
import { items } from "./data.js";

const getData = (cat) => {
  const data = items[cat];

  if (data) {
    return data;
  }

  return [];
};

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>

      <div className={styles.grid}>
        {data.map((item) => (
          <div className={styles.item} key={item.id}>
            <img className={styles.image} src={item.image} alt="" />
            <div className={styles.overlay}>
              <div className={styles.content}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
