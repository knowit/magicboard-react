const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const motionService = require("./service/motionService");
const buttonService = require("./service/buttonService");
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("server is running");
});

app.ws("/motion", motionService);
app.ws("/button", buttonService);

app.listen(PORT);
