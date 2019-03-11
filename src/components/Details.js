import React, { Component } from 'react'
import { PlayerConsumer } from '../context'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button.js'

export default class Details extends Component {
  render() {
    return (
      <PlayerConsumer>
        {value => {
          const {
            id,
            team,
            img,
            stats,
            price,
            name,
            onTeam
          } = value.detailPlayer
          return (
            <div className='container py-5'>
              {/* name */}
              <div className='row'>
                <div className='col-10 mx-auto text-center text-slanted text-blue my-5'>
                  <h1>{name}</h1>
                </div>
              </div>
              {/* end name */}
              {/* player stats */}
              <div className='row'>
                <div className='col-10 mx-auto col-md-6 text-capitalize'>
                  <img src={img} className='img-fluid' alt='player' />
                </div>
                {/* player text */}
                <div className='col-10 mx-auto col-md-6 text-capitalize'>
                  <h2>Name: {name}</h2>
                  <h4 className='text-name text-uppercase text-muted mt-3 mb-2'>
                    Team : <span className='text-uppercase'>{team}</span>
                  </h4>
                  <h4 className='text-blue'>
                    <strong>
                      price: <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className='text-capitalize font-weight-bold mt-3 mb-0'>
                    Stats
                  </p>
                  <p className='text-muted lead'>{stats}</p>
                  {/* buttons below */}
                  <div className='add-buttons'>
                    <Link to='/players'>
                      <ButtonContainer>back to players</ButtonContainer>
                    </Link>

                    <ButtonContainer
                      team
                      disabled={onTeam ? true : false}
                      onClick={() => {
                        value.addToCart(id)
                        value.openModal(id)
                      }}
                    >
                      {onTeam ? 'onTeam' : 'add to team'}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </PlayerConsumer>
    )
  }
}
