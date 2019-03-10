import React, { Component } from 'react'
import styled from 'styled-components'

export default class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <h1 className='mt-5'>Sportsball!</h1>
      </HomeWrapper>
    )
  }
}

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`
