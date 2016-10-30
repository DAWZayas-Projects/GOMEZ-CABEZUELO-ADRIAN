import { connect } from 'react-redux';
import Register from '../components/Register';
import { registerUser } from '../actions/authed';

function mapStateToProps(state) {
  return {
  };
}

function mapActionsToProps(dispatch) {
  return {
  	onRegisterUser: data => dispatch(registerUser(data)),
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Register);
