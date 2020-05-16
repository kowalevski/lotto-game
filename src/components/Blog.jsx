import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';

const Blog = () => {
  return (
    <Container>
      <br />
      <Row>
        <Link to="/dashboard/blog/new-post">
          <Button>Create Post</Button>
        </Link>
      </Row>
      <Route path="/dashboard/blog/new-post">New Post</Route>
    </Container>
  );
};

export default Blog;
