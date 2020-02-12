
const config = require('config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({

        clientID: config.get('app.webServer.GOOGLE_CLIENT_ID'),
        clientSecret: config.get('app.webServer.GOOGLE_CLIENT_SECRET'),
        callbackURL: "http://www.example.com/auth/google/callback"

    }), () => {

    }
)