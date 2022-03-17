import { buildBackendURL } from '../helpers/api';

function RawLiveFeed({event_id, participant_id}){

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
    const url = buildBackendURL("/websocket").replace("http", "ws");
    const socket = new WebSocket(url);
    socket.addEventListener("message", onWebSocketMessage);
    socket.addEventListener("close", onWebSocketClose);
    socket.addEventListener("open", onWebSocketOpen);
    setWebSocket(socket);
  }, []);
  return ;
}
export default RawLiveFeed;
