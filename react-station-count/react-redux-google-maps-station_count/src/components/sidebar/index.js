import React, {Component} from 'react';
import Links from './links.js'
import Logo from './logo.js'
import Adv from './adv.js'
import Icons from './icons.js'
import Objects from './objects.js'

export default class Sidebar extends Component {

    chooseMarker = (object) => {
        this.props.chooseMarker(object);
    }

    render() {

        return (
            <div className="sidebar">
                <Logo />
                <Links />
                <Objects chooseMarker={this.chooseMarker}/>
                <Adv />
                <Icons />
            </div>
        );
    }
}