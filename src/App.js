import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Default from './components/Default'
import PlayerList from './components/PlayerList'
import Details from './components/Details'
import Team from './components/Team'
import Modal from './components/Modal'
import Home from './components/Home.js'
import QBList from './components/QBList'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/players' component={PlayerList} />

          <Route exact path='/qb' component={QBList} />
          {/* <Route exact path='/rb' component={RBList} />
          <Route exact path='/wr' component={WRList} />
          <Route exact path='/te' component={TEList} />
          <Route exact path='/dst' component={DSTList} /> */}

          <Route exact path='/details' component={Details} />
          <Route exact path='/team' component={Team} />
          <Route exact component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    )
  }
}

export default App
