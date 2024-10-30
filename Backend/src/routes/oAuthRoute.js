const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken"); // Ensure you import jwt for token generation
const router = express.Router();

// Google OAuth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);



router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/user/login",
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      console.log("User not found in OAuth callback");
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Generate token after successful login
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000 * 2,
    });
    // Redirect to frontend with the token as a query parameter
    res.redirect(`http://localhost:3000/home`);
  }
);




module.exports = router;
