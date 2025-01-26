const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Import your User model
const User = require('../models/UserModel'); // Adjust the path as needed

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


console.log("Google Strategy Initialized");
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  // callbackURL: 'http://localhost:5000/oAuth/auth/google/callback' // Redirect URI
  callbackURL: 'https://saman-bhejo-backend.onrender.com/oAuth/auth/google/callback' // Redirect URI
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find user in the MongoDB database using their email
      const email = profile.emails[0].value;
      const user = await User.findOne({ email: email });
      
      if (!user) {
        // If user does not exist, return an error indicating not registered
        return done(null, false, { message: 'User not registered' });
      }

      // If user exists, proceed with login
      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize by user id
});

passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by id in the database and deserialize
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
