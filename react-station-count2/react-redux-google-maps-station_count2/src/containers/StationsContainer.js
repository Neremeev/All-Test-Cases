import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addActiveObject} from "../actions/sessionActions";
import Map from '../components/map'
import Sidebar from '../components/sidebar'
import {getProps} from '../actions/sessionActions';



class StationsContainer extends Component {

    state = {
        isOpen: false,
        zoom: 10,
        center: {
            lat: 59.9556476416, lng: 30.3556802886
        },
        activeObject: {},
    }

    componentWillMount() {
        this.props.getProps();
    }

    onToggleOpen = (object) => {

        this.props.addActiveObject(object);

        this.setState({
            isOpen: true,
            zoom: 13,
            center: {
                lat: Number(object.lat), lng: Number(object.lng)
            },
            activeObject: object,
        })
    }

    onToggleClose = () => {

        this.setState({
            isOpen: false,
            zoom: 10,
            center: {
                lat: 59.9556476416, lng: 30.3556802886
            },
            activeObject: {},
        })
    }

    render() {
        const stations = this.props.stations;
        const {isOpen, zoom, center, activeObject} = this.state;
        return (
            <div className="main">

                <div className="map">
                    <Map
                        isOpen={isOpen}
                        zoom={zoom}
                        center={center}
                        activeObject={activeObject}
                        onToggleOpen={this.onToggleOpen}
                        onToggleClose={this.onToggleClose}
                        stations={stations}
                    />
                </div>

                <div className="sidebar">
                    <Sidebar onToggleOpen={this.onToggleOpen} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stations: state.session.stations,
        check_ins: state.session.check_ins
    }
}

const mapDispatchToProps =  {
    addActiveObject,
    getProps
}

export default connect(mapStateToProps, mapDispatchToProps)(StationsContainer)