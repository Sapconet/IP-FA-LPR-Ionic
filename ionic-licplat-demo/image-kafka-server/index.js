const express = require("express");
const bodyParser = require("body-parser");
var kafka = require("kafka-node");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");
var config = require("./config");

const app = express();
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

  var payloads = [
    { topic: "LicensePlateTextTopic", messages: "Tell NodeJS it was me..." }
  ];

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/errors", (req, res) => {
  console.log(req.body);
  res.send();
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
