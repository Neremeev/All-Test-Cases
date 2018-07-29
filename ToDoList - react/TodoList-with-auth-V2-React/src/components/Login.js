import React, { Component } from 'react';
import {
    Redirect,
    withRouter
} from "react-router-dom";
import fakeAuth from './fakeAuth'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            myObject: [],
            login: "",
            pass: ""
        };
    }

    componentDidMount(){
        fetch('http://www.mocky.io/v2/5b11e9be3000005900861082') // http://www.mocky.io/v2/5b0d80c431000058009d5710
            .then(response => response.json())
            .then(data => {
                this.setState({myObject: data})
            })
    }

    onBtnClickLogin = (event) => {

        event.preventDefault();

        for ( let key in this.state.myObject ) {

            if (this.login.value === key) {
                let login = this.login.value;

                if (this.state.myObject[login].pass === this.pass.value) {
                    window.mockyData = this.state.myObject[login].tasks;
                    let tasksMocky = this.state.myObject[login].tasks;
                    window.authLogin.emit('Login', tasksMocky);
                    fakeAuth.authenticate(() => {
                        this.setState({ redirectToReferrer: true });
                    });
                    return alert('Хорошего дня, ' + this.login.value + '!')

                } else {
                    return alert('Неправильный пароль');
                }

            } else {
                continue;
            }
        }

        return alert('Неправильный логин');
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/tasks" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return(
            <form className='form-1'>
                <AuthComp />
                <p className="field">
                    <input
                        type='text'
                        className=''
                        placeholder='Ваш логин'
                        ref={(input) => this.login = input}
                    />
                    <i className="icon-user icon-large"></i>
                </p>
                <p className="field">
                    <input
                        type='password'
                        className=''
                        placeholder='Ваш пароль'
                        ref={(input) => this.pass = input}
                    />
                    <i className="icon-lock icon-large"></i>
                </p>
                <p className="submit">
                    <button
                        className=''
                        onClick={this.onBtnClickLogin}
                    >
                        <i className="icon-arrow-right  icon-large"></i>
                    </button>
                </p>
            </form>

        )
    }
}


const AuthComp = withRouter(
    () =>
        !fakeAuth.isAuthenticated ? (
            <p className="auth">
                Пожалуйста, авторизуйтесь
            </p>
        ) : ( <p></p> )
);