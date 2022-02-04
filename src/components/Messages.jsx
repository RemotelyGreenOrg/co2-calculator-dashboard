import React, { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [oneMessage, setOneMessage] = useState("");

  const [showButton, setShowButton] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const [webSocket, setWebSocket] = useState();

  //--------- form functions ---------------//

  const onDisconnect = event => {
    webSocket.close();
  };

  const onFormInputChange = event => {
    const textInput = event.target.value;
    setOneMessage(textInput);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    if (oneMessage !== "") webSocket.send(JSON.stringify({ message: oneMessage }));
    setOneMessage("");
  };

  //-------------------------------------------//
  //--------- webSocket functions ---------------//

  function onWebSocketMessage(event) {
    const data = JSON.parse(event.data);

    if (data.hasOwnProperty("message")) {
      const time = new Date().toLocaleTimeString();
      const message = `${time} \t ${data.message}`;
      setMessages(current => [...current, message]);
    }
  }

  function onWebSocketOpen(event) {
    setShowButton(true);
  }

  function onWebSocketClose(event) {
    setShowButton(false);
    setFormDisabled(true);
  }

  useEffect(() => {
    // FIXME hardcoded URLs 🙀
    const url = (window.location.protocol === "https:" ? "wss:" : "ws:") + (window.location.hostname === "localhost" ? "//localhost:8000" : "//co2-calculator-api.herokuapp.com");

    const socket = new WebSocket(url);
    socket.addEventListener("message", onWebSocketMessage);
    socket.addEventListener("close", onWebSocketClose);
    socket.addEventListener("open", onWebSocketOpen);
    setWebSocket(socket);
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={onFormSubmit}>
        <input type="text" id="message" name="message" onChange={onFormInputChange} autoComplete="off" required disabled={formDisabled} value={oneMessage} />
        <button disabled={formDisabled}>Send</button>
      </form>
      <button id="disconnect" onClick={onDisconnect} style={{ visibility: showButton ? "visible" : "hidden" }}>
        Disconnect
      </button>
    </div>
  );
};

export default Messages;
