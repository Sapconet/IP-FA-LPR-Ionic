const express = require("express");
const bodyParser = require("body-parser");
var kafka = require("kafka-node");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");

const app = express();
const port = 5000;
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
  // console.log("Request body :" + JSON.stringify(req.body));

  var message = JSON.stringify(req.body.photo);

  /*var Producer = kafka.Producer;
  var kafka_client = new kafka.KafkaClient({ kafkaHost: "18.209.92.224:9092" });

  var kafka_user_producer = new Producer(kafka_client);

  var payloads = [
    { topic: "LicensePlateTextTopic", messages: JSON.stringify(message) }
  ];

  kafka_user_producer.on("ready", function() {
    kafka_user_producer.send(payloads, function(err, data) {
      console.log("Data: " + data);
      console.log("Error on data: " + err);
    });
  });
  kafka_user_producer.on("error", function(err) {
    console.log(err);
  });*/

  res.send("I received your image..." + message);
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
