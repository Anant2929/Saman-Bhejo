const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute");
const session = require("express-session");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const oAuthRoutes = require('./routes/oAuthRoute');
const parcelRoutes = require('./routes/ParcelRoute');
const CarrierRoutes = require('./routes/CarrierRoute');
const http = require("http");
const socketIo = require("socket.io");
const passport = require('passport');
const {setupSocketHandlers} = require("./sockets/socketHandler.js");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create server for socket.io
const io = socketIo(server, {
  cors: {

    origin: "*", // Replace with your frontend URL only for development

    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Define port
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin:"*", // Adjust according to your frontend's URLt
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Session Middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

setupSocketHandlers(io);

// Routes
app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}!`);
  } else {
    res.redirect('/login');
  }
});

app.use('/oAuth', oAuthRoutes);
app.use("/user", userRoutes);
app.use("/parcel", parcelRoutes);
app.use("/carrier" , CarrierRoutes);

// Start the server using `server.listen` to enable socket.io
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
