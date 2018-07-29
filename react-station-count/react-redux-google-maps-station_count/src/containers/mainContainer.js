import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addActiveObject} from "../actions/sessionActions";
import Map from '../components/map'
import Sidebar from '../components/sidebar/index.js'


class MainContainer extends Component {

    state = {
        zoom: 16,
        center: {
            lat: 59.909697, lng: 30.285432000000014
        },
        activeObject: {},
    }

    chooseMarker = (object) => {

        this.props.addActiveObject(object);

        this.setState({
            zoom: 16,
            center: {
                lat: object.lat, lng: object.lng
            },
            activeObject: object,
        })
    }

    render() {
        const objects = this.props.objects;
        const {zoom, center, activeObject} = this.state;
        return (
            <div className="main">

                <div className="map">
                    <Map
                        zoom={zoom}
                        center={center}
                        activeObject={activeObject}
                        chooseMarker={this.chooseMarker}
                        objects={objects}
                    />
                </div>
                <Sidebar chooseMarker={this.chooseMarker}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        objects: state.session.objects,
    }
}

const mapDispatchToProps =  {
    addActiveObject
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
