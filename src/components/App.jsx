import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import AuthForm from './AuthForm';
import Home from './Home';

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
      <Route
        exact
        path="/"
        render={() => <Home user={user} logout={handleLogout} />}
      />
      <Route
        path="/signin"
        render={() => <AuthForm endpoint="signin" onSuccess={setUser} />}
      />
      <Route
        path="/signup"
        render={() => <AuthForm endpoint="signup" onSuccess={setUser} />}
      />
    </Switch>
  );
};

export default App;
