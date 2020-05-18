import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createPost } from '../api';

const PostForm = ({ userId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = e => {
    const { title, content, tags } = e.target.elements;
    e.preventDefault();
    setIsCreating(true);
    createPost({
      authorId: userId,
      title: title.value,
      content: content.value,
      tags: tags.value
    })
      .then(() => setIsCreated(true))
      .catch(response => {
        setIsCreating(false);
        setErrorMsg(response.error.message);
      });
  };

  if (isCreated) {
    return <Redirect to="/news" />;
  }

  return (
    <>
      {errorMsg && <Alert>{errorMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control id="title" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content">Content</Form.Label>
          <Form.Control as="textarea" id="content" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="tags">Tags</Form.Label>
          <Form.Control id="tags" />
        </Form.Group>
        <Button type="submit" disabled={isCreating}>
          Save
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  userId: PropTypes.number.isRequired
};

export default PostForm;
