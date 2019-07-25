const express = require("express");
const Datastore = require("nedb");
const app = express();
// const fs = require("fs");

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static(__dirname + "/public/"));

app.use(express.json({ limit: "1mb" }));

const db = new Datastore("clientLocations.db");
db.loadDatabase();

let requestCount = 0;
app.post("/api", (request, response) => {
  requestCount++;

  if (requestCount > 1) {
    console.log("Got another request!");
  } else {
    console.log("First request!");
  }
  const data = JSON.stringify(request.body);
  const timeStamp = Date();
  data.timeStamp = timeStamp;
  var imgData = data.image64;

  // fs.writeFileSync("synchronous.txt", data);
  db.insert(data);
  response.json(data);
});

app.get("/api", (request, response) => {
  db.find({}, (err, data) => {
    response.json(data);
  });
});
