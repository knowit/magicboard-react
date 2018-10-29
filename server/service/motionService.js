const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

function motionService(ws, req) {
  parser.on("data", data => ws.send(data));
}

module.exports = motionService;