let client = null;

function googleAssistantService(ws, req) {
    ws.on("message", msg => {
        console.log(msg);
        if (msg.includes("client")) {
            client = ws;
        } else if (client !== null) {
            client.send(msg);
        }
    });

    ws.on("close", () => {
        console.log("Google Assistant Service Disconnected");
        if (client === ws){
            client = null;
        }
    })
}

module.exports = googleAssistantService;
