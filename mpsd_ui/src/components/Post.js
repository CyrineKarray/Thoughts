import React from "react";
import { Card } from "react-bootstrap";
import "./css/Post.css";
import { convert } from "../helpers/dateFormat";
import LikeButton from "./LikeButton";
import UpdatePost from "./UpdatePost";

import JwtDecode from "jwt-decode";
import Axios from "axios";
import { useState } from "react";

const token = localStorage.getItem("token");

const deletePost = (id) => {
  Axios.delete(`http://localhost:9000/posts/${id}/${token}`)
    .then(() => {
      console.log("deleted");
      window.location.reload(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Post = ({ id, author, title, content, date, likes }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <UpdatePost
        show={show}
        handleClose={handleClose}
        oldTitle={title}
        oldContent={content}
        id={id}
        rate={likes}
      />
      <Card style={{ marginTop: "45px", width: "100%" }}>
        <Card.Header>
          <h2>{title}</h2>{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title>{author}</Card.Title>
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {content}
          </Card.Text>
          <Card.Link href="#">Read more</Card.Link>
        </Card.Body>
        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between " }}
        >
          <p className="text-muted">Posted : {convert(date)}</p>
          {JwtDecode(token).username !== author ? (
            <p>
              {" "}
              <LikeButton
                id={id}
                title={title}
                content={content}
                likes={likes}
              />{" "}
            </p>
          ) : (
            <>
              <button className="like-btn">
                <i className="fas fa-heart fa-lg" style={{ color: "red" }}></i>{" "}
                {likes}
              </button>
              <div className="actions">
                <button
                  className="action-btn"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <i className="fas fa-edit" style={{ color: "#118ab2" }}></i>{" "}
                </button>
                <button onClick={() => deletePost(id)} className="action-btn">
                  <i
                    className="fas fa-trash-alt"
                    style={{ border: "none", color: "#660708" }}
                  ></i>{" "}
                </button>
              </div>
            </>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Post;
