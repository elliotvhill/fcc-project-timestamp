// init project
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files in Express
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Basic routing
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => { res.sendFile(__dirname + "/views/index.html"); });

// First API endpoint
app.get("/api/hello", (req, res) => {
    res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
    // Get params from URL
    const date = req.params.date;

    // Check if empty params
    if (!date) {
        // Return current date
        return res.json({
            unix: Date.parse(new Date()), utc: new Date().toUTCString()
        });
    }

    const dateRegex = /\d{4,}/i;
    // Check if valid params using regex
    if (dateRegex.test(date)) {
        if (Date.parse(date)) {
            // Params passed are unix timestamp
            return res.json({
                unix: Date.parse(date), utc: new Date(date).toUTCString()
            });
        } else {
            // Params passed were YYYY-MM-DD, MM-DD-YYYY, mmm dd YYYY, etc.
            return res.json({
                unix: Date.parse(new Date(parseInt(date)).toUTCString()), utc: new Date(parseInt(date)).toUTCString()
            });
        }
    } else {
        // Params were invalid
        return res.json({ error: "Invalid Date" });
    }
});

// Listen on PORT or default to 3000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
