const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Debugging message for router loading
console.log("Auth routes loaded");

// Google OAuth routes
router.get(
  "/auth/google",
  (req, res, next) => {
    console.log("Google OAuth initiated");
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log("OAuth callback triggered");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/user/login",
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      console.error("OAuth callback error: User not found");
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("User authenticated successfully:", req.user);

    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      // domain: process.env.NODE_ENV === "production" ? ".saman-bhejo-backend.onrender.com" : "localhost",
      domain: "localhost",
    });

    res.cookie("id", req.user.id, { 
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.redirect(`http://localhost:3000/home`);
  }
);

module.exports = router;
