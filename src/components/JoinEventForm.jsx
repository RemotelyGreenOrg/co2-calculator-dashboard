import React, { useState } from 'react'

const JoinEventForm = () => {
  const [data, setData] = useState({
    join_mode: '',
    lon: '',
    lat: '',
    active: '',
    event_id: '',
  })

  const onFormChange = (event) => {
    setData({
      ...data,

    })
  }

  const handleSubmit = (event) => {
    const config = {
      method: 'post',
      url: '',
      data,
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={onFormChange}>
        <label>
          Joinmode:
          <input>
          </input>
        </label><br/>
        <label>
          Longitude:
          <input>
          </input>
        </label><br/>
        <label>
          Latitude:
          <input>
          </input>
        </label><br/>
        <label>
          Active?:
          <input>
          </input>
        </label><br/>
        <label>
          Event id:
          <input>
          </input>
        </label><br/>
      </form>
    </div>
  )
}

export default JoinEventForm