const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world!"
  });
});

app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created.....",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock User
  const user = {
    id: 1,
    username: "omar",
    email: "omar@gmail.com"
  };
  jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token
    });
  });
});

//verifyToken
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at space
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started at port 5000"));
