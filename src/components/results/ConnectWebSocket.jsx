import { useState, useEffect } from "react";
import { buildBackendURL } from '../../helpers/api';


export default function ConnectWebSocket({event_id, participant_id, Component}){
  const [data, setData] = useState();

  useEffect(() => {
    const url = buildBackendURL("/").replace("http", "ws");
    const socket = new WebSocket(url);

    function onWebSocketMessage(event) {
      const data = JSON.parse(event.data);
      setData(data);
      console.log("Received data", data);
    }

    function onWebSocketOpen(event) {
          const data = { event_id, participant_id };
          console.log("socket.send", data);
          socket.send(JSON.stringify(data));
    }

    function onWebSocketClose(event) {
          console.log("onWebSocketClose", JSON.stringify(socket));
    }

    socket.addEventListener("message", onWebSocketMessage);
    socket.addEventListener("close", onWebSocketClose);
    socket.addEventListener("open", onWebSocketOpen);

    return () => {
        socket.close();
    }
  }, []);

  return <Component data={data} />;
}
