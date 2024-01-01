import React from 'react'

const PlayerItem = ({player}) => {
  return (
    <div>
      <span>{player.id}</span>
      <h3>{player.name}</h3>
      <p>{player.country}</p>
      <hr />
    </div>
  )
}

export default PlayerItem