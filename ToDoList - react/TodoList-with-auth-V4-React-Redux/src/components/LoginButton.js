import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../actions/sessionActions';

class LoginButton extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        session: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.number,
            }),
        }).isRequired,
    }

    handleClick = () => {
        if (this.props.session.user) {
            this.props.logout();
        } else {
            this.setRedirect();
        }
    }

    render() {
        return (
            <div>
                {this.props.session.user ?
                    <button className="buttonOut"
                        onClick={this.handleClick}
                    >
                        Выйти
                    </button> :

                    <buttonLink
                        to="/"
                    >
                        Войти
                    </buttonLink>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        session: state.session,
    }),
    dispatch => ({
        logout() {
            dispatch(logout());
        },
    }),
)(LoginButton);
