import Axios from "axios";
import React, { useState } from "react";
import "./css/HeartButton.css";

const LikeButton = ({ id, title, content, likes }) => {
  const [postlike, setpostlike] = useState(likes);

  const token = localStorage.getItem("token");

  const addLike = () => {
    const x = postlike + 1;
    setpostlike(x);

    const newRate = {
      id,
      title,
      content,
      rate: x,
    };
    console.log(newRate);
    Axios.put(`http://localhost:9000/posts/${token}`, newRate)
      .then((resp) => {
        console.log(newRate);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (postlike === 0) {
    return (
      <button className="button" onClick={addLike}>
        <i className="far fa-heart fa-lg" style={{ color: "#33c3f0" }}></i>
      </button>
    );
  }
  if (postlike === 1) {
    return (
      <div>
        <button className="button">
          <i className="fas fa-heart fa-lg" style={{ color: "red" }}></i>{" "}
          {postlike}
        </button>
      </div>
    );
  }
};

export default LikeButton;
