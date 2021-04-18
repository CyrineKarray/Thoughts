import Axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const UpdatePost = ({ show, handleClose, oldTitle, oldContent, id, rate }) => {
  const [newTitle, setNewTitle] = useState(oldTitle);
  const [newContent, setNewContent] = useState(oldContent);

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContent = {
      id: id,
      title: newTitle,
      content: newContent,
      rate: rate,
    };
    console.log(updatedContent);
    Axios.put(`http://localhost:9000/posts/${token}`, updatedContent)
      .then((resp) => {
        console.log(updatedContent);
        console.log(resp);
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
        <Modal.Title>Change your thought</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              type="text"
              placeholder="Thought title"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Thoughts</Form.Label>
            <Form.Control
              value={newContent}
              onChange={(e) => {
                setNewContent(e.target.value);
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

export default UpdatePost;
