
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// reservation (DATA)
// =============================================================
var tables = [];
var waitList = [];

//keep track of any page views
var pageViews = 0;

// Routes
// =============================================================

// home page
app.get("/", function(req, res) {
  pageViews++;
  res.sendFile(path.join(__dirname, "index.html"));
});

// view tables
app.get("/tables", function(req, res) {
   pageViews++;
  res.sendFile(path.join(__dirname, "tables.html"));
});

// make reservation
app.get("/reserve", function(req, res) {
   pageViews++;
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// api/tables
app.get("/api/tables", function(req, res) {
  res.json(tables);
});

// api/waitlist
app.get("/api/waitlist", function(req, res) {
  res.json(waitList);
});

app.get("/api/pageviews", function(req, res) {
  res.json(pageViews);
});

// Catch all in no paths from above are used.
app.get("*", function(req, res) {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.write("<h1>404 Are You Lost?</h1>");
  res.end("The page you were looking for can not be found ");
});
 
// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  
  console.log("new was hit");
  var newReservation = req.body;

  if(tables.length < 5)
  {
    tables.push(newReservation);
    console.log("reservation pushed to tables");
  }
  else
  {
    waitList.push(newReservation);
    console.log("reservation pushed to waitlist");
  } 

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
