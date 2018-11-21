const express = require('express');
let expressWs = require('express-ws');
expressWs = expressWs(express());
const app = expressWs.app;

const motionService = require("./service/motionService");
const buttonService = require("./service/buttonService");
const googleAssistantService = require("./service/googleAssistantService");
const PORT = 4000;

//app.use(express.static('public'));


app.get("/", (req, res) => {
    res.send("server is running");
});

app.ws("/motion", motionService);
app.ws("/button", buttonService);
app.ws('/googleAssistant', googleAssistantService);

app.listen(PORT);
