import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, authHasErrored} from '../actions/sessionActions';
import {errors} from '../errorTexts';

class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        authHasErrored: PropTypes.func.isRequired,
        session: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.number,
            }),
        }).isRequired,
        location: PropTypes.shape({}),
    }

    static defaultProps = {
        location: undefined,
    }

    state = {
        login: '',
        password: '',
    }

    handleSubmitForm(event) {
        event.preventDefault();
        this.props.login(this.state);
    }

    handleChangeInput(event) {
        const {target: {name, value}} = event;

        this.setState(() => (
            {
                [name]: value,
            }
        ));
    }

    render() {
        const { session: {errors: {errorMsg, errorServer}, user}} = this.props;
        const {from} = {from: {pathname: '/tasks'}};
        const {login, password} = this.state;
        if (user !== null) {
            return <Redirect to={from}/>;
        }

        return (
            <div className="loginPage">
                <form className='form-1'>
                    {errorMsg && <p>{errors.wrong_login_or_password}</p>}
                    {errorServer && <p>{errors.server}</p>}
                    <p className="field">
                        <input
                            type="text"
                            placeholder="Введите логин"
                            name="login"
                            onChange={event => this.handleChangeInput(event)}
                            value={login}
                        />
                        <i className="icon-user icon-large"></i>
                    </p>
                    <p className="field">
                        <input className="field"
                            type="password"
                            placeholder="Введите пароль"
                            name="password"
                            onChange={event => this.handleChangeInput(event)}
                            value={password}
                        />
                        <i className="icon-lock icon-large"></i>
                    </p>
                        <p className="submit">
                        <button
                            type="submit"
                            onClick={event => this.handleSubmitForm(event)}
                        >
                        <i className="icon-arrow-right  icon-large"></i>
                    </button>
                    </p>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        session: state.session,
    }),
    dispatch => ({
        login(body) {
            dispatch(login(body));
        },
        authHasErrored(error) {
            dispatch(authHasErrored(error));
        },
    }),
)(Login);
