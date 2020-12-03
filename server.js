// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date?", (req, res) => {
  const date = req.params.date;
  let utcDate;
  // If date is empty, utcDate = new Date() to return the current time in unix format and utc format
  if (!date) {
    utcDate = new Date();
  } else {
    // If date is not empty, evaluate if date is an integer
    if (!isNaN(date)) {
      // If date is an integer in string, convert to integer and utc format, and assign to utcDate
      utcDate = new Date(parseInt(date));
    } else {
      // Assign to utcDate
      utcDate = new Date(date);
    };
  };
  // If the utcDate is invalid, return json response error
  if (utcDate.toString() === 'Invalid Date') {
    res.json({
      error: "Invalid Date"
    });
  } else {
    // Return JSON response in the format:
    // {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
    res.json({
      unix: utcDate.getTime(), 
      utc: utcDate.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

