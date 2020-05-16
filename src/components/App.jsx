import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import AuthForm from './AuthForm';
import Home from './Home';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [user, setUser] = React.useState(null);
  const token = window.localStorage.getItem('user_token');

  useEffect(() => {
    if (user) {
      return;
    }
    axios({
      method: 'GET',
      url: 'http://localhost:3000/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      response => setUser(response.data),
      () => {
        window.localStorage.removeItem('user_token');
        setUser(null);
      }
    );
  }, [token, user]);

  const handleLogout = () => {
    window.localStorage.removeItem('user_token');
    setUser(null);
  };

  if (!user && token) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard">
        <ErrorBoundary>
          <Home user={user} logout={handleLogout} />
        </ErrorBoundary>
      </Route>
      <Route path="/signin">
        <AuthForm endpoint="signin" onSuccess={setUser} />
      </Route>
      <Route path="/signup">
        <AuthForm endpoint="signup" onSuccess={setUser} />
      </Route>
    </Switch>
  );
};

export default App;
