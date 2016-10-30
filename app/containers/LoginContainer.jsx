import React from 'react'
import { connect } from 'react-redux'
import { authUser } from '../actions/authed'
import history from '../store/history'

class LoginContainer extends React.Component {
    onSubmit(event) {
        event.preventDefault()
        this.props.dispatch(authUser({username:this.refs.username.value, password :this.refs.password.value}))
    }

    onClickRegister(event) {
      event.preventDefault()
      history.push('/register')
    }

    render() {
        return (

            <div className="login login-with-news-feed bg-white">



                    <div className="login-content">
                        <form  className="margin-bottom-0" onSubmit={(e) => this.onSubmit(e)}>
                            <div className="form-group m-b-15">
                                <input type="text" className="form-control input-lg" placeholder="Email Address"   ref='username'/>
                            </div>
                            <div className="form-group m-b-15">
                                <input type="password" className="form-control input-lg" placeholder="Password"  ref='password'/>
                            </div>
                            <div className="login-buttons">
                                <button type="submit" className="btn btn-block btn-social btn-lg btn-success">
                                  <span className="fa fa-user"></span>
                                  Sign in
                                </button>
                                <button onClick={(e) => this.onClickRegister(e)} className="btn btn-block btn-social btn-lg btn-info">
                                  <span className="fa fa-envelope-o"></span>
                                  Register
                                </button>
                            </div>
                            <a href="/auth/google" className="btn btn-block btn-social btn-lg btn-google">
                              <span className="fa fa-google"></span> Sign In with Google
                            </a>

                        </form>
                    </div>
            </div>
        )
     }
}

export default connect()(LoginContainer)
