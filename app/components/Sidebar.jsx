import React, { PropTypes } from 'react';

class Sidebar extends React.Component {


  onClickLogOut(event) {
    event.preventDefault()
    this.props.onLogOut()
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
                <li className="collapsed active">
                  <a href="#">
                  <i className="fa fa-dashboard fa-lg"></i> Dashboard
                  </a>
                </li>

                <li data-toggle="collapse" data-target="#user" className="collapsed">
                   <a href="#">
                     <i className="fa fa-user fa-lg"></i> User <span className="arrow"></span>
                   </a>
                 </li>
                 <ul className="sub-menu collapse" id="user">
                     <li><a href="#">Profile</a></li>
                     <li onClick={ (event) => this.onClickLogOut(event)}><a href="#" >LogOut</a></li>
                 </ul>

                <li  data-toggle="collapse" data-target="#tracked" className="collapsed">
                  <a href="#"><i className="fa fa-globe fa-lg"></i> History Tracked</a>
                </li>

                <li data-toggle="collapse" data-target="#new" className="collapsed">
                  <a href="#"><i className="fa fa-reply fa-lg"></i> New <span className="arrow"></span></a>
                </li>
                <ul className="sub-menu collapse" id="new">
                  <li>New New 1</li>
                  <li>New New 2</li>
                  <li>New New 3</li>
                </ul>
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
