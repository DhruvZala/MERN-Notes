const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

// With help of this code everyfiles ware defined in public statically
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.send("hello express");
// });

app.get("/", function (req, res) {
  res.render("index", { age: 21 });
});

app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/error", function (req, res) {
    res.render("error");
  });

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
