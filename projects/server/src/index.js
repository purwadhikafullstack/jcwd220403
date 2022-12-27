require('dotenv/config');
const express = require('express');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { join } = require('path');
const database = require('./models');
const verifyJWT = require('./middlewares/verifyJWT');
const { authRouters, userRouters, refresh, logout } = require('./routers');
const cookieParser = require('cookie-parser');
const PORT = process.env.SERVER_PORT || 8000;
const app = express();
const allowOrigins = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowOrigins.includes(origin)) return callback(null, true);

    callback(new Error('Not allowed by CORS'));
  },
};
app.use(
  cors(corsOptions)
  // cors()
  // {
  //   origin: [
  //     process.env.WHITELISTED_DOMAIN &&
  //       process.env.WHITELISTED_DOMAIN.split(','),
  //   ],
  // }
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bearerToken());
app.use(cookieParser());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.use(authRouters);
app.use(refresh);
app.use(logout);

//routes that need token
app.use(verifyJWT);
app.use(userRouters);

app.get('/api', (req, res) => {
  res
    .cookie('cookie', 'api', {
      maxAge: 50000,
      httpOnly: false,
      path: '/api',
    })
    .send(`Hello, this is my API`);
});

app.get('/api/greetings', (req, res, next) => {
  res.status(200).json({
    message: 'Hello, Student !',
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes('/api/')) {
    res.status(404).send('Not found !');
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes('/api/')) {
    console.error('Error : ', err.stack);
    res.status(500).send('Error !');
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = '../../client/build';
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

// const user = database.user;

// user.sync({ alter: true });
