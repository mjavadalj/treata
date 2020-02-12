const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const db = mongoose.connection;
const mongoStore = require('connect-mongo')(session);
const config = require('config');

require('dotenv').config({
    path: './server/.env'
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
// mongoose.connect('mongodb://localhost:27017/treata', { useNewUrlParser: true })
//     .then(() => {
//         console.log('database connected');
//     })
//     .catch(databaseConnectionError => {
//         console.log('Unable to connect to the database :' + databaseConnectionError);
//         return `Unable to connect to the database  : ${databaseConnectionError}`

//     });

mongoose.connect('mongodb+srv://treata:treata@cluster0-n9ikv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log('database connected');
    })
    .catch(databaseConnectionError => {
        console.log('Unable to connect to the database :' + databaseConnectionError);
        return `Unable to connect to the database  : ${databaseConnectionError}`

    });

app.use(
    session({
        secret: config.get('app.webServer.session_secret'),
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: { maxAge: 60 * 60 * 1000 } //? it's an hour - increase this !
        //cookie: { secure: true } //? for https protocol
    })
);
app.use(passport.initialize());
app.use(passport.session());

db.once('open', function () {

    app.use('/api', router);


});

module.exports = app;
