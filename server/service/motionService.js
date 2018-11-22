const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM8", {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: "\n"}));
let client = null;


function motionService(ws, req) {
    ws.on("message", msg => {
        console.log(msg);
        if (client === null) {
            client = ws;
        }
    });

    ws.on("close", () => {
        if (ws === client) {
            client = null;
            console.log("Motion Service Disconnected")
        }
    });

    parser.on("data", data => {
        if (client !== null) {
            client.send(data)
        }
    });
}

module.exports = motionService;
