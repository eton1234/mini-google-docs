import { json } from "express";
import { WebSocketServer } from "ws";

const wsserver = new WebSocketServer({ port: 8080 });

let clients = [];
let lastMessage = null;

wsserver.on("connection", (ws) => {
    clients.push(ws); // Keep track of connected clients

    // Send the last message to the new client and send till it's confirmed
    const intervalId = setInterval(() => {
        if (lastMessage) {
          ws.send(JSON.stringify({ type: 'message', data: lastMessage }));
        }
      }, 1000); // Send last message every second

      ws.on("message", (data) => {
        try { 
            const payload = JSON.parse(data);
            if (payload.type === 'message' && payload.data) {
                console.log(`message received: ${payload.data}`);
                lastMessage = payload.data; // Update last message
                // Relay the message to all other clients
                clients.forEach((client) => {
                    if (client !== ws && client.readyState === ws.OPEN) {
                        client.send(JSON.stringify({ type: 'message', data: lastMessage }));
                    }
                });
            } else if (payload.type === 'confirmation') {
                console.log('confirmation received');
                clearInterval(intervalId); // Stop sending messages once confirmation is received
            }
        } catch (e) {
            console.log('Invalid JSON');
        }
    });

    ws.on("close", () => {
        clearInterval(intervalId); // Stop sending messages when the connection is closed
        // Remove the closed client from the clients array
        clients = clients.filter((client) => client !== ws);
    });
});