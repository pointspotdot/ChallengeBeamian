const express = require("express");
const server = express();
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");

//to see the logs
server.use(morgan("tiny"));

server.get("/", (request, response) => {
  console.log("Responding to root route...");
    response.sendFile(path.join(__dirname + "/HTML/index.html"));
});

server.get("/:email", (request, response) => {
  console.log("Fetching user with email: " + request.params.email);

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "challenge"
  });

  const userEmail = request.params.email;

  const queryString = "SELECT * FROM candidates WHERE email = ?";
  connection.query(queryString, [userEmail], (err, rows, fields) => {
    console.log("I think we did it.");
    response.json(rows);
  });
});

server.get("/users", (request, response) => {
  var user1 = {
    firstName: "Sara",
    lastName: "Oliveira"
  };
  response.json(user1);
});

var port = 3005;

//localhost:port
server.listen(port, () => {
  console.log("Server is up and running on port " + port + "...");
});
