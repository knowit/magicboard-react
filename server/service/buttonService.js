const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM3", {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: "\n"}));
let client = null;

function buttonService(ws, req) {

    ws.on("message", msg => {
        console.log(msg);
        if (client === null) {
            client = ws;
        }
        /*
        else {
            if (ws !== client) {
                client = ws;
            }
        }*/
    });

    ws.on("close", () => {
        if (ws === client) {
            client = null;
            console.log("Button Service Disconnected")
        }
    });

    parser.on("data", data => {
        if (client !== null) {
            client.send(data.toString('utf-8'))
        }
    });
}

module.exports = buttonService;
