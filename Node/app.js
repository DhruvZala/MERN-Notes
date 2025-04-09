const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New req recieved\n`;
  fs.appendFile("logForApp.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("Dhruv Zala");
        break;
    }
    res.end("Hello from server side");
  });
});
myServer.listen(8000, () => console.log("Server is running perfectly"));
