import React, { PropTypes } from 'react';
import history from '../store/history'

class Sidebar extends React.Component {


  onClickLogOut(event) {
    event.preventDefault()
    this.props.onLogOut()
  }

  onClickNewConnexion(event) {
    event.preventDefault()
    history.push('/connect')
  }

  onClickDashboard(event) {
    event.preventDefault()
    history.push('/main')
  }

  render() {
    const name = this.props.name
    const photo = this.props.photo

    return (
      <div className="nav-side-menu">
        <div className="brand">
          <img src={photo} className="img-circle" height="50" width="50" />
          {name}
        </div>
          <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

          <div className="menu-list">

            <ul id="menu-content" className="menu-content collapse out active">
                <li className="collapsed active" onClick={ (event) => this.onClickDashboard(event) }>
                  <a href="#">
                  <i className="fa fa-dashboard fa-lg" ></i> Dashboard
                  </a>
                </li>
                
                <li className="collapsed active" onClick={ (event) => this.onClickNewConnexion(event) }>
                  <a href="#">
                  <i className="fa fa-paper-plane fa-lg" ></i> Connexion
                  </a>
                </li>                                
            </ul>
     </div>
</div>
    )
  }
}

Sidebar.proptipes = {
  name: PropTypes.STRING,
  photo: PropTypes.STRING,
  onLogOut: PropTypes.func,
}

export default Sidebar
