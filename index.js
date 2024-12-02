// index.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
    // Get params from URL
    const date = req.params.date;
    // Check if date passed matches YYYY-MM-DD format
    const dateRegex = /^[\d]{4}-[\d]{2}-[\d]{2}$/i;
    const unixRegex = /^[\d]+$/i;
    console.log("dateRegex: ", dateRegex.test(date), "unixRegex: ", unixRegex.test(date))
        // If date is in YYYY-MM-DD format
        if (dateRegex.test(date)) {
            console.log("if block"); // TODO: remove
            // Parse date to unix timestamp and convert date to utc string
            return res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
        } else if (unixRegex.test(date)) {
            console.log("else block"); // TODO: remove
            // Return date as Int and convert to utc date string
            return res.json({ unix: parseInt(date), utc: new Date(parseInt(date)).toUTCString() })
        } else {
        res.json({ error: "Invalid Date" });
    };
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
