const express = require("express");
const users = require("./fake_data.json");
const app = express();
const PORT = 8001;

// Routes
app.get("/", (req, res) => {
  return res("Hello From Home!");
});

app.get("/users", (req, res) => {
  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}  
      </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put((req, res) => {
    // Edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "pending" });
  });

app.post("api/users", (req, res) => {
  // TODO: Create new user
  return res.json({ status: "pending" });
});

app.patch("api/users", (req, res) => {
  // TODO: Edit user with id
  return res.json({ status: "pending" });
});

// Rest APIS
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
