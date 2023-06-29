"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when the data changes
  }, [data]);

  if (session.status === "loading") {
    return (
      <div>
        <Skeleton count={10} style={{ marginBottom: "8px" }} />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      alert("An error occurred");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        mutate();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? (
            <div>
              <Skeleton count={10} height={40} style={{ marginBottom: "10px" }} />
            </div>
          ) : (
            <>
              {currentPosts?.map((post) => (
                // Render individual post components
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <div className={styles.postDetails}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postDesc}>{post.desc}</p>
                  </div>
                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {data?.length === 0 && <p>No events found.</p>}
            </>
          )}
          {/* Pagination */}
          <div className={styles.pagination}>
            {data && data.length > postsPerPage && (
              <ul className={styles.pageNumbers}>
                {Array(Math.ceil(data.length / postsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className={currentPage === index + 1 ? styles.active : ""}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Event</h1>
          <input type="text" placeholder="Title" className={styles.input} required />
          <select className={styles.input} required>
            <option value="">Choose an option</option>
            <option value="Technical Event">Technical Event</option>
            <option value="Proshow">Proshow</option>
            <option value="Esports">Esports</option>
            <option value="Competition">Competition</option>
            <option value="Fun">Fun</option>
          </select>
          <input type="text" placeholder="Image" className={styles.input} required />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
            required
          ></textarea>
          <button className={styles.button}>Add Event</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
