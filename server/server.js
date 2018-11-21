var express = require('express');
var expressWs = require('express-ws');
var expressWs = expressWs(express());
var app = expressWs.app;

const motionService = require("./service/motionService");
const buttonService = require("./service/buttonService");
const PORT = 4000;

app.use(express.static('public'));
var aWss = expressWs.getWss('/');


app.get("/", (req, res) => {
  res.send("server is running");
});

app.ws("/motion", motionService);
app.ws("/button", buttonService);


app.ws('/googleAssistant', function(ws, req) {
    console.log('Socket Connected');

    ws.onmessage = function(msg) {
        console.log(msg.data);
        aWss.clients.forEach(function (client) {
            client.send(msg.data);
        });
    };
});

app.listen(PORT);
