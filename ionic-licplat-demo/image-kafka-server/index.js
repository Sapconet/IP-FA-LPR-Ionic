const express = require("express");
const bodyParser = require("body-parser");
var kafka = require("kafka-node");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");
var config = require("./config");

const app = express();

var originsWhitelist = ["http://localhost:8100"];

var corsOptions = {
  origin: function(origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

app.use("*", cors(corsOptions));

const port = config.PORT;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(logger("dev"));
app.use(methodOverride());
app.use(cors());

var path = require("path"); /*,
  http = require("http"),
  fs = require("fs")*/

app.post("/send-img", (req, res) => {
  console.log("Request received");
  console.log("Request body :" + JSON.stringify(req.body));

  var message = JSON.stringify(req.body.photo);

  var Producer = kafka.Producer;
  var client = new kafka.KafkaClient({
    kafkaHost: config.KAFKA_HOST,
    requestTimeout: 10000
  });

  var producer = new Producer(client);

  var payloads = [{ topic: "test", messages: message }];

  try {
    producer.on("ready", function() {
      producer.send(payloads, function(err, data) {
        console.log("Data: " + data);
        console.log("Error on data: " + err);

        res.send("I received your image..." + message);
      });
    });
    producer.on("error", function(err) {
      console.log(err);

      res.send("Nothing...");
    });
  } catch (err) {
    res.send(err);
  }

  // res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", (req, res) => {
  console.log("API call detected...");
  res.send("hi");
});

app.post("/errors", (req, res) => {
  console.log(req.body);
  res.send();
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
