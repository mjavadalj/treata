const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv');

passport.use(
    new GoogleStrategy({

        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"

    }), () => {

    }
)