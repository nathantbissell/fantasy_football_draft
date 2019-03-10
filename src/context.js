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
  addToCart = id => {
    let tempPlayers = [...this.state.players]
    // spread function gives us a reference to all of the players
    const index = tempPlayers.indexOf(this.getPlayer(id))
    const player = tempPlayers[index]
    player.inCart = true
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
  //   increment = id => {
  //     let tempCart = [...this.state.team]
  //     const selectedPlayer = tempCart.find(player => player.id === id)

  //     const index = tempCart.indexOf(selectedPlayer)
  //     const player = tempCart[index]
  //     player.count++
  //     player.total = player.count * player.price
  //     this.setState(
  //       () => {
  //         return {
  //           team: [...tempCart]
  //         }
  //       },
  //       () => {
  //         this.addTotals()
  //       }
  //     )
  //   }
  //   decrement = id => {
  //     let tempCart = [...this.state.team]
  //     const selectedPlayer = tempCart.find(player => player.id === id)

  //     const index = tempCart.indexOf(selectedPlayer)
  //     const player = tempCart[index]
  //     player.count--
  //     if (player.count === 0) {
  //       this.removePlayer(id)
  //     } else {
  //       player.total = player.count * player.price
  //     }
  //     this.setState(
  //       () => {
  //         return {
  //           team: [...tempCart]
  //         }
  //       },
  //       () => {
  //         this.addTotals()
  //       }
  //     )
  //   }
  removePlayer = id => {
    let tempPlayers = [...this.state.players]
    let tempCart = [...this.state.team]

    tempCart = tempCart.filter(player => player.id !== id)
    const index = tempPlayers.indexOf(this.getPlayer(id))
    let removedPlayer = tempPlayers[index]
    removedPlayer.inCart = false
    removedPlayer.count = 0
    removedPlayer.total = 0
    this.setState(
      () => {
        return {
          team: [...tempCart],
          players: [...tempPlayers]
        }
      },
      () => {
        this.addTotals()
      }
    )
  }
  clearCart = () => {
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
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          removePlayer: this.removePlayer,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

const PlayerConsumer = PlayerContext.Consumer

export { PlayerProvider, PlayerConsumer }
