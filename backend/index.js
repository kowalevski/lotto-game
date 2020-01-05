const express = require('express');
const dg = require('debug');
const cors = require('cors');
const detectPort = require('detect-port');
const bodyParser = require('body-parser');

const debug = dg('app');

const users = {};

const run = async () => {
  const appPort = process.env.PORT || (await detectPort(3000));

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const auth = (req, res, next) => {
    const headerAuth = req.headers.authorization || '';
    const bearer = 'Bearer ';
    const token = headerAuth.slice(bearer.length);

    if (!token) {
      return res.sendStatus(400);
    }

    const user = users[token];

    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    req.token = token;

    return next();
  };

  const handleSignIn = (req, res) => {
    const token = Math.random().toString();
    const user = req.body;
    users[token] = user;

    return res.json({ user: { token, ...user } });
  };

  app.get('/profile', auth, (req, res) => {
    return res.json(req.user);
  });

  app.post('/profile', auth, (req, res) => {
    Object.assign(req.user, req.body);
    return res.json(req.user);
  });

  app.get('/logout', auth, (req, res) => {
    delete users[req.token];
    res.sendStatus(200);
  });

  app.post('/signup', handleSignIn);
  app.post('/signin', handleSignIn);

  return new Promise(resolve => {
    const server = app.listen(appPort, () => {
      debug(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
};

run();
