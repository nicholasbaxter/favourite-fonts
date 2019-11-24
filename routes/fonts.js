var express = require("express");
var router = express.Router();
var request = require("request");
require("dotenv").config();

console.log(process.env.DB_HOST);

const options = {
  url: `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.GOOGLE_KEY}`,
  method: "GET",
  json: true
};
let fetchedData;
router.get("/", function(req, res) {
  request(options, function(error, response, body) {
    // console.log("error:", error);
    // console.log("statusCode:", response && response.statusCode);
    // console.log("body:", body);
    // console.log(body);
    fetchedData = body;
    res.json(body);
  });
});

//For real API call
router.get("/search", (req, res) => {
  console.log(req.query.q.toLowerCase());
  const results = fetchedData.items.filter(item =>
    item.family.toLowerCase().includes(req.query.q.toLowerCase())
  );
  res.json(results);
});

//Font dummy data
// var fontData = require("../fontData.json");

// router.get("/test", (req, res) => {
//   const results = fontData.items;
//   res.json(results);
// });

// Dummy Search (with static data)
// router.get("/search", (req, res) => {
//   console.log(req.query.q.toLowerCase());
//   const results = fontData.items.filter(item =>
//     item.family.toLowerCase().includes(req.query.q.toLowerCase())
//   );
//   res.json(results);
// });

module.exports = router;
