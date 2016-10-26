
import React from 'react'

import InitialContainer from '../containers/InitialContainer';

import { Router, Route , Redirect} from 'react-router';
import history from '../store/history';

class App extends React.Component {

  componentDidMount() {

  }

  render() {

    return (
          <Router history={history} >
              <Route path='/' component={InitialContainer}/>
          </Router>
    )
  }
}

export default App
