const user = require("../models/UserModel.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const generateToken = require("../utils/jwtutils.js")

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id); // Store only the user ID in session
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await user.findById(id); // Find the user by ID
    done(null, user); // Pass the user to the done callback
  } catch (error) {
    done(error, null); // Call done with error if user not found
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let userexist = await user.findOne({ email: profile.emails[0].value });
        if (!userexist) {
          return done(null, false, { message: "User does not exist, please sign up." });
        }
        const token = generateToken(userexist);
        return done(null, { user: userexist, token }); 
      } catch (error) {
        console.error("Error in login:", error);
        return done(error,null);
      }
    }
  )
);