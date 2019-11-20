const express = require("express");
const bodyParser = require("body-parser");
var kafka = require("kafka-node");

const app = express();
const port = 5000;
app.use(bodyParser.json());

app.post("/send-img", (req, res) => {
  console.log(req.body);

  var message = "Let's pretend that this is an image...";

  var Producer = kafka.Producer;
  var kafka_client = new kafka.KafkaClient({ kafkaHost: "52.22.40.86:9092" });

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
  });
});

app.post("/errors", (req, res) => {
  console.log(req.body);
  res.send();
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
