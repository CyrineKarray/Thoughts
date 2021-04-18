import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Axios from "axios";

const AddModal = ({ show, handleClose }) => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      content: post,
    };
    Axios.post(`http://localhost:9000/posts/${token}`, newPost)
      .then(() => {
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal show={show}>
      <Modal.Header closeButton={handleClose}>
        <Modal.Title>Adding Tought</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Thought title"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Thoughts</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPost(e.target.value);
              }}
              as="textarea"
              rows={3}
              placeholder="Your thoughts goes here"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
