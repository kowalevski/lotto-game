import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import PostForm from './PostForm';

const News = () => {
  return (
    <Container>
      <br />
      <Row>
        <Link to="/dashboard/news/new-post">
          <Button>Create New Post</Button>
        </Link>
      </Row>
      <Route path="/dashboard/news/new-post">
        <PostForm userId={123} />
      </Route>
    </Container>
  );
};

export default News;
