
const express = require('express');
require('dotenv').config();

const app = express();
var bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');


// Route includes
const userRouter = require('./routes/user.router');
const podbeanRouter = require('./routes/podbean.router');
const wordpressRouter = require('./routes/wordpress.router');
const googleRouter = require('./routes/google.router');

// Body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */

app.use('/api/user', userRouter);
app.use('/podbean', podbeanRouter);
app.use('/wordpress', wordpressRouter);
app.use('/googleCloud', googleRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
