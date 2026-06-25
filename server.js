require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const User = require("./models/User");
const Alert = require("./models/Alert");
const Contact = require("./models/Contact");

// CONNECT DB
connectDB();

const app = express();
const server = http.createServer(app);

// SOCKET
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ======================
// HEALTH
// ======================

app.get("/", (req, res) => {
  res.send("Women Safety Backend Running");
});

// ======================
// REGISTER
// ======================

app.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fill all fields",
      });
    }

    const exists =
      await User.findOne({
        email,
      });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hash,
      });

    res.status(201).json({
      message: "Registration Success",
      user: {
        id: user._id,
        name: user.name,
      },
    });

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }
});

// ======================
// LOGIN
// ======================

app.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET || "SECRET",
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,
      name: user.name,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login Failed",
    });

  }
});

// ======================
// CREATE SOS
// ======================

app.post("/sos", async (req, res) => {
  try {

    const alert =
      await Alert.create({
        lat: req.body.lat,
        lng: req.body.lng,
        status: "ACTIVE",
      });

    io.emit(
      "new-alert",
      alert
    );

    res.status(201).json(
      alert
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "SOS Failed",
    });

  }
});

// ======================
// GET ALERTS
// ======================

app.get("/alerts", async (req, res) => {

  try {

    const alerts =
      await Alert
        .find()
        .sort({
          createdAt: -1,
        });

    res.json(alerts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Fetch Failed",
    });

  }

});

// ======================
// UPDATE ALERT
// ======================

app.put("/alerts/:id", async (req, res) => {

  try {

    const alert =
      await Alert.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!alert) {
      return res.status(404).json({
        message: "Alert Not Found",
      });
    }

    io.emit(
      "alert-updated",
      alert
    );

    res.json(alert);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update Failed",
    });

  }

});

// ======================
// CONTACTS
// ======================

app.post("/contacts", async (req, res) => {

  try {

    const contact =
      await Contact.create(
        req.body
      );

    res.status(201).json(
      contact
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Save Failed",
    });

  }

});

app.get("/contacts", async (req, res) => {

  try {

    const contacts =
      await Contact.find();

    res.json(
      contacts
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Fetch Failed",
    });

  }

});

// ======================
// START SERVER
// ======================

const PORT =
process.env.PORT || 5000;

server.listen(
  PORT,
  () => {
    console.log(
      `Server Started on ${PORT}`
    );
  }
);