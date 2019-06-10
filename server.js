const express = require("express");
const server = express();

const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

function getMySQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "challenge"
  });
}

server.use(morgan("short"));
server.use(bodyParser.urlencoded({ extended: false }));

server.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/HTML/index.html"));
});

server.get("/index.css", (request, response) => {
  response.sendFile(path.join(__dirname + "/HTML/index.css"));
});

server.get("/index.js", (request, response) => {
  response.sendFile(path.join(__dirname + "/HTML/index.js"));
});

server.post("/", (request, response) => {
  let name = request.body.name;
  let birthdate = request.body.birthdate;
  let filename = request.body.file;

  let queryString =
    "INSERT INTO candidates (name, birthdate, filename) VALUES (?, ?, ?)";
  getMySQLConnection().query(
    queryString,
    [name, birthdate, filename],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err);
        response.end();
        return;
      }
      console.log("Inserted new user.");
      response.end();
    }
  );
});

server.get("/candidate", (request, response) => {
  let name = "'" + request.query.name + "'";

  let queryString = "SELECT * FROM candidates WHERE name = " + name;
  getMySQLConnection().query(queryString, (err, results, fields) => {
    if (err) {
      console.log("Failed to retrieve user: " + err);
      response.end();
      return;
    }
    console.log(results);
    response.json(results);
  });
});

let port = 3005;
//localhost:port
server.listen(port, () => {
  console.log("Server is up and running on port " + port + "...");
});
