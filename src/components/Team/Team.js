import React, { Component } from 'react'
import Title from '../Title'
import TeamColumns from './TeamColumns'
import ClearTeam from './ClearTeam'
import List from './List'
import TeamTotals from './TeamTotals'
import { PlayerConsumer } from '../../context'
export default class Team extends Component {
  render() {
    return (
      <section>
        <PlayerConsumer>
          {value => {
            const { team } = value
            if (team.length > 0) {
              return (
                <React.Fragment>
                  <Title name='My' title='team' />
                  <TeamColumns />
                  <List value={value} />
                  <TeamTotals value={value} />
                </React.Fragment>
              )
            } else {
              return <ClearTeam />
            }
          }}
        </PlayerConsumer>
      </section>
    )
  }
}
