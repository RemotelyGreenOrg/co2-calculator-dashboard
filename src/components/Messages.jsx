import React, { useState, useEffect } from 'react';

const Messages = () => {
  
  const [messages, setMessages] = useState([])
  const [oneMessage, setOneMessage] = useState('')
  
  const [showButton, setShowButton] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)

  const [webSocket, setWebSocket] = useState()

  //--------- form functions ---------------//

  const onDisconnect = (event) => {
    // event.preventDefault()
    webSocket.close()
  }

  const onFormInputChange = (event) => {
    const textInput = event.target.value
    setOneMessage(textInput)
    console.log(textInput)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log(oneMessage)
    console.log(webSocket)
    if (oneMessage !== "") webSocket.send(JSON.stringify({ message: oneMessage }));
    setOneMessage('');
  }

  //-------------------------------------------//
  //--------- webSocket functions ---------------//

  function onWebSocketMessage(event) {
    console.log('on websocket message')
    const data = JSON.parse(event.data);
    
    if (data.hasOwnProperty("message")) {
      const time = new Date().toLocaleTimeString();
      const message = `${time} \t ${data.message}`
      setMessages([...messages, message])
    }
  }

  function onWebSocketOpen(event) {
    event.preventDefault()
    setShowButton(false)
  }

  function onWebSocketClose(event) {
    event.preventDefault()
    setShowButton(true)
    setFormDisabled(true)
  }

  useEffect(() => {
  console.log('new websocket')
  const webSocketUrl = (window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host;
  const socket = new WebSocket(webSocketUrl)
  socket.addEventListener("message", onWebSocketMessage);
  socket.addEventListener("close", onWebSocketClose);
  socket.addEventListener("open", onWebSocketOpen);
    setWebSocket(socket)
  }, [])

  return (
    <div>
      <h1>Messages</h1>
      <ul id="messages">
        {messages.map((m) => (
          <li>{m}</li>
        ))}
      </ul>
      <form onSubmit={onFormSubmit}>
        <input type="text" id="message" name="message" onChange={onFormInputChange} autoComplete="off" required disabled={formDisabled} value={oneMessage}/>
        <button disabled={formDisabled}>Send</button>
      </form>
      <button id="disconnect" onClick={onDisconnect} style={{ visibility: showButton ? "visible" : "hidden" }}>Disconnect</button>
    </div>
  );
};

export default Messages;
