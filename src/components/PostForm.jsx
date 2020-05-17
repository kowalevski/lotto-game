import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createPost } from '../api';

const PostForm = ({ userId }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const handleSubmit = e => {
    const { title, content, tags } = e.target.elements;
    e.preventDefault();
    setIsPosting(true);
    createPost({
      authorId: userId,
      title: title.value,
      content: content.value,
      tags: tags.value
    }).then(() => setIsPosted(true));
  };

  if (isPosted) {
    return <Redirect to="/blog" />;
  }

  return (
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
      <Button type="submit" disabled={isPosting}>
        Save
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  userId: PropTypes.string.isRequired
};

export default PostForm;
