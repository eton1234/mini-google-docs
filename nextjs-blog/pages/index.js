import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [input, setInput] = useState('');
    //the web socket
    const ws = useRef(null);
    // when a new connection is established, the client will receive the last message sent by the server : hasreceivedFirstMessage is a flag to enable that
    const hasReceivedFirstMessage = useRef(false);

    //receive changes
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080');
      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'message') {
          setInput(message.data);
          ws.current.send(JSON.stringify({ type: 'confirmation' }));
        }
      };
    
      return () => {
        ws.current.close();
      };
    }, []);
    //sending changes
    useEffect(() => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
          console.log("Sending message: ", input);  
          ws.current.send(JSON.stringify({ type: 'message', data: input }));
        }
    }, [input]);

    return (
        <div>
            <textarea style={{ width: '100%', height: '80vh' }} value={input} onChange={e => setInput(e.target.value)} />
        </div>
    );
}

export default App;