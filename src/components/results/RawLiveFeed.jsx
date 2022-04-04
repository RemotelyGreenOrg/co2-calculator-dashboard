import ConnectWebSocket from './ConnectWebSocket';

export function DisplayRawList({data}){
    return <>
      <ul>
      {data && Object.entries(data).map(([key, value]) => {
        return (
          <li key={key}>
          <b>{key}</b> {
            (typeof(value) === 'object') ? (
              <ul>
              {Object.entries(value).map(([k, v]) => {
                return (<li key={k}>
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

function RawLiveFeed({event_id, participant_id}){
  return ConnectWebSocket(event_id, participant_id, DisplayRawList);
}

export default RawLiveFeed;
