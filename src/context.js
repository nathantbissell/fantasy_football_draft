import React, { Component } from 'react'
import { playerPool, detailPlayer } from './data'

const PlayerContext = React.createContext()
// context object comes with 2 components
// Provider (provides all the info for entire app)
// Consumer (implements the provider's information)

class PlayerProvider extends Component {
  state = {
    players: [],
    detailPlayer: detailPlayer,
    team: [],
    modalOpen: false,
    modalPlayer: detailPlayer,
    teamTotal: 0
  }
  componentDidMount() {
    this.setPlayers()
  }

  setPlayers = () => {
    //   we need this because grabbing playerPool and placing them in state, we are
    // just grabbing the actual reference to the data, and changing it through life cycle
    // of app. We should be COPYING the playerPool, that way we do not change the data.
    let tempPlayers = []
    playerPool.forEach(player => {
      const singlePlayer = { ...player }
      tempPlayers = [...tempPlayers, singlePlayer]
    })
    this.setState(() => {
      return { players: tempPlayers }
    })
  }

  getPlayer = id => {
    const player = this.state.players.find(player => player.id === id)
    return player
  }

  handleDetail = id => {
    const player = this.getPlayer(id)
    this.setState(() => {
      return { detailPlayer: player }
    })
  }
  addToTeam = id => {
    let tempPlayers = [...this.state.players]
    // spread function gives us a reference to all of the players
    const index = tempPlayers.indexOf(this.getPlayer(id))
    const player = tempPlayers[index]
    player.inTeam = true
    const price = player.price
    player.total = price
    this.setState(
      () => {
        return { players: tempPlayers, team: [...this.state.team, player] }
      },
      () => {
        this.addTotals()
      }
    )
  }

  openModal = id => {
    const player = this.getPlayer(id)
    this.setState(() => {
      return { modalPlayer: player, modalOpen: true }
    })
  }

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false }
    })
  }

  removePlayer = id => {
    let tempPlayers = [...this.state.players]
    let tempTeam = [...this.state.team]

    tempTeam = tempTeam.filter(player => player.id !== id)
    const index = tempPlayers.indexOf(this.getPlayer(id))
    let removedPlayer = tempPlayers[index]
    removedPlayer.inTeam = false
    removedPlayer.count = 0
    removedPlayer.total = 0
    this.setState(
      () => {
        return {
          team: [...tempTeam],
          players: [...tempPlayers]
        }
      },
      () => {
        this.addTotals()
      }
    )
  }
  clearTeam = () => {
    this.setState(
      () => {
        return { team: [] }
      },
      () => {
        this.setPlayers()
        this.addTotals()
      }
    )
  }
  addTotals = () => {
    let total = 0
    this.state.team.map(player => (total += player.total))
    this.setState(() => {
      return {
        teamTotal: total
      }
    })
  }

  render() {
    return (
      <PlayerContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToTeam: this.addToTeam,
          openModal: this.openModal,
          closeModal: this.closeModal,
          removePlayer: this.removePlayer,
          clearTeam: this.clearTeam
        }}
      >
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

const PlayerConsumer = PlayerContext.Consumer

export { PlayerProvider, PlayerConsumer }
