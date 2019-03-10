import React from 'react'
import TeamPlayer from './TeamPlayer'

export default function TeamList({ value }) {
  const { team } = value
  console.log(value, team)

  return (
    <div className='container-fluid'>
      {team.map(player => {
        return <TeamPlayer key={player.id} player={player} value={value} />
      })}
    </div>
  )
}
