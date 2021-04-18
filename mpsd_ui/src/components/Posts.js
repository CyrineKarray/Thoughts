import React, { useEffect, useState } from "react";
import CoolTabs from "react-cool-tabs";
import "./css/Posts.css";
import Axios from "axios";
import Post from "./Post";
import JwtDecode from "jwt-decode";

const AllPosts = ({ posts }) => {
  // eslint-disable-next-line no-lone-blocks
  return (
    <div>
      {posts.map((post) => (
        <Post
          id={post._id}
          title={post.title}
          author={post.author}
          content={post.content}
          date={post.date}
          likes={post.rate}
        />
      ))}
    </div>
  );
};
const MyPosts = ({ myposts }) => {
  return (
    <div>
      {myposts.map((post) => (
        <Post
          id={post._id}
          title={post.title}
          author={post.author}
          content={post.content}
          date={post.date}
          likes={post.rate}
        />
      ))}
    </div>
  );
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [myposts, setMyPosts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(`http://localhost:9000/posts/${token}`)
      .then((resp) => {
        console.log(resp.data);
        setPosts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get(`http://localhost:9000/posts/myposts/${token}`)
      .then((resp) => {
        console.log(resp.data);
        setMyPosts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginTop: "25px" }}>
        Welcome {JwtDecode(token).username}{" "}
      </h1>
      <CoolTabs
        tabKey={"1"}
        style={{
          marginTop: 100,
          width: "100%",
          height: "3000px",
          background: "white",
        }}
        activeTabStyle={{ background: "white", color: "black" }}
        unActiveTabStyle={{ background: "white", color: "black" }}
        activeLeftTabBorderBottomStyle={{ background: "blue", height: 2 }}
        activeRightTabBorderBottomStyle={{ background: "blue", height: 2 }}
        tabsBorderBottomStyle={{ background: "white", height: 4 }}
        leftContentStyle={{ background: "white" }}
        rightContentStyle={{ background: "white" }}
        leftTabTitle={"All Posts"}
        rightTabTitle={"My Posts"}
        leftContent={<AllPosts posts={posts} />}
        rightContent={<MyPosts myposts={myposts} />}
        contentTransitionStyle={"transform 0.6s ease-in"}
        borderTransitionStyle={"all 0.6s ease-in"}
      />
    </div>
  );
}
