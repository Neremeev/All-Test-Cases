import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Links extends Component {

    render() {

        return (
            <div className='links-sidebar'>
                <Link to={`/404`}>КЕЙСЫ</Link>
                <Link to={`/404`}>ФОРМАТЫ</Link>
                <Link to={`/404`} style={{fontFamily:'MullerMedium'}}>ИЗДАТЕЛЯМ</Link>
                <Link to={`/404`}>ПЛАТФОРМА</Link>
            </div>
        );
    }
}