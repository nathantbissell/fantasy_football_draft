import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PlayerConsumer } from '../context'
import PropTypes from 'prop-types'

export default class Player extends Component {
  render() {
    const { id, name, img, price, onTeam } = this.props.player
    return (
      <PlayerWrapper className='col-9 mx-auto col-md-6 col-lg-3'>
        <div className='card'>
          <PlayerConsumer>
            {value => (
              <div
                className='img-container p-5'
                onClick={() => value.handleDetail(id)}
              >
                <Link to='/details'>
                  <img src={img} alt='player img' className='card-img-top' />
                </Link>
                <button
                  className='cart-btn'
                  disabled={onTeam ? true : false}
                  onClick={() => {
                    value.addToCart(id)
                    value.openModal(id)
                  }}
                >
                  {onTeam ? (
                    <p className='text-capitalize mb-0' disabled>
                      in cart
                    </p>
                  ) : (
                    <i className='fas fa-cart-plus' />
                  )}
                </button>
              </div>
            )}
          </PlayerConsumer>
          {/* card footer */}
          <div className='card-footer d-flex justify-content-between'>
            <p className='align-self-center mb-0'>{name}</p>
            <h5 className='text-blue font-italic mb-0'>
              <span className='mr-1'>$</span>
              {price}
            </h5>
          </div>
        </div>
      </PlayerWrapper>
    )
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    onTeam: PropTypes.bool
  }).isRequired
}

const PlayerWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border:0.04 rem solid rgba(0,0,0,0.2)
      box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2)
    }
    .card-footer {
      background: rgba(247,247,247)
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
  }
  .img-container:hover .card-img-top {
    transform:scale(1.2);
  }

  .card-img-top{
    transition all 1s linear;
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    // top / bottom, 0.4 left and right
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    // right left border 0.5
    transform: translate(100%, 100%);
    // moves the bottom all the way to the bottom right, now we need to establish hover
    transition: all 1s linear;
    // transition makes all changes happen over 1 second time
  }

  .img-container:hover .cart-btn {
    transform: translate(0,0);
  }

  .cart-btn:hover{
    color:var(--mainBlue);
    cursor: pointer;
  }
`
