import React, { Component } from 'react'
import Player from './Player'
import Title from './Title'
import { PlayerConsumer } from '../context'
export default class PlayerList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='py-5'>
          <div className='container'>
            <Title title='Player List' />
            <div className='row'>
              <PlayerConsumer>
                {value => {
                  return value.players.map(player => {
                    if (player.pos === 'wr') {
                      return <Player key={player.id} player={player} />
                    }
                  })
                }}
              </PlayerConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
