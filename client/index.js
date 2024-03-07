let socket = new WebSocket("ws://localhost:8080");

socket.onopen = (e) => {
    console.log("Handshake compeleted!");
    socket.send("hello from the client!");
};

socket.onmessage = (e) => {
    console.log("Message from server", e.data);
};

socket.onclose = () => {
    console.log("goodbye");
};