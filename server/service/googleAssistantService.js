let client = null;

function googleAssistantService(ws, req) {
    ws.on("message", msg => {
        console.log(msg);

        if (msg.includes("client")) {
            console.log("Client connected");
            if(client === null) {
                client = ws;
            }
        } else if (client !== null) {
            client.send(msg);
        }
    });

    ws.on("close", () => {
        if (client === ws){
            console.log("Google Assistant Service Client Disconnected");
            client = null;
        }
    })
}

module.exports = googleAssistantService;
