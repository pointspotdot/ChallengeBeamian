const express = require("express");
const server = express();
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");

//to see the logs
server.use(morgan("tiny"));

server.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/HTML/index.html"));
});

server.get("/index.css", (request, response) => {
  response.sendFile(path.join(__dirname + "/HTML/index.css"));
});

server.get("/index.js", (request, response) => {
    response.sendFile(path.join(__dirname + "/HTML/index.js"));
});

server.get("/:para", (request, response) => {
  console.log("Fetching user with name: " + request.params.para);

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "challenge"
  });

  var userName = request.params.para.split(/(?<= name=)(.*)(?=&)/);

  console.log(userName);

  const queryString = "SELECT * FROM candidates WHERE name = " + userName;
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("An error has occured: " + err);
      response.sendStatus(500);
      return;
    }
    console.log("I think we did it.");
    console.log(typeof rows);
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
