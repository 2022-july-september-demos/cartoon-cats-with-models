const express = require('express');
const path = require('path');
const { nextTick } = require('process');
const app = express();

// Built in middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// App routes

app.use('/cats', require('./controllers/cats'));

app.use('/my-middleware', (req, res, next) => {
  console.log('i am in my middleware function');
  next({ message: 'this is an error' });
});

// app.use((req, res, next) => {
//   console.log('in another middleware');
//   res.json({ message: 'everything is awesome' });
// });

// app.use((req, res, next) => {
//   console.log('a middle middleware');
//   next();
// });
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
