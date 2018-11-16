const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM4", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

function buttonService(ws, req) {
  parser.on("data", data => ws.send(data.toString('utf-8')));
}

module.exports = buttonService;
