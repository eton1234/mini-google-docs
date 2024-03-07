import { WebSocketServer } from "ws";

const wsserver = new WebSocketServer({ port: 8080 });

let clients = [];

wsserver.on("connection", (ws) => {
    clients.push(ws); // Keep track of connected clients

    ws.on("message", (data) => {
        console.log(`message received: ${data}`);
        // Relay the message to all other clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on("close", () => {
        // Remove the closed client from the clients array
        clients = clients.filter((client) => client !== ws);
    });
});