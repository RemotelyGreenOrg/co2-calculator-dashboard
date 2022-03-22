import { useState, useEffect } from "react";
import { buildBackendURL } from '../../helpers/api';

function RawLiveFeed({event_id, participant_id}){
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

  return <>
    <ul>
    {data && Object.entries(data).map(([key, value]) => {
      return (
        <li key={key}>
        <b>{key}</b> {
          (typeof(value) === 'object') ? (
            <ul>
            {Object.entries(value).map(([k, v]) => {
                return (<li>
                  <b>{k}</b> {JSON.stringify(v)}
                </li>);
              })
            }
            </ul>
          ) : (
            JSON.stringify(value)
          )
        }
      </li>
      )}
    )}
    </ul>
    </>;
}
export default RawLiveFeed;
