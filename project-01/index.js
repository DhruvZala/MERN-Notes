const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./fake_data.json");
const { type } = require("os");
const app = express();
const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/project-01")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom middlewares
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

// Logger middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,
    (err) => {
      if (err) {
        console.error("Logging failed:", err);
      }
      next();
    }
  );
});

// Home Route
app.get("/", (req, res) => {
  return res.send("Hello From Home!");
});

// HTML Users List
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// REST API - Get All Users
app.get("/api/users", (req, res) => {
  console.log(req.headers);
  return res.json(users);
});

// REST API - Get, Update, or Delete User by ID
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .put((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = { ...req.body, id };
    users[index] = updatedUser;

    fs.writeFile("./fake_data.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Failed to update user" });
      return res.json({ status: "success", user: updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users.splice(index, 1)[0];

    fs.writeFile("./fake_data.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete user" });
      return res.json({ status: "deleted", user: deletedUser });
    });
  });

// REST API - Create New User
app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_Name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ msg: "Sucess" });

  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  fs.writeFile("./fake_data.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ error: "Failed to create user" });
    return res.json({ status: "success", id: newUser.id });
  });
});

// REST API - Partially Update User
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[index] = { ...users[index], ...req.body };

  fs.writeFile("./fake_data.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ error: "Failed to update user" });
    return res.json({ status: "Updated", user: users[index] });
  });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server started at port ${PORT}`));
