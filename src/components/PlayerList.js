import React, { Component } from 'react'
import Player from './Player'
import Title from './Title'
import { PlayerConsumer } from '../context'
export default class PlayerList extends Component {
  render() {
    console.log('playerList', this.props.location)
    return (
      <React.Fragment>
        <div className='py-5'>
          <div className='container'>
            <Title name='our' title='players' />
            <div className='row'>
              <PlayerConsumer>
                {value => {
                  return value.players.map(player => {
                    return <Player key={player.id} player={player} />
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
