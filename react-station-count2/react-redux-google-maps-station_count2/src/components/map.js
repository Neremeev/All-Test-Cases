import React from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Graphic from './graphic';
const markerOk = require('../image/metro1.png');
const markerActive = require('../image/metro2.png');


const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8ECfIjkNyE2AVBlG4Fpd4rD2Y4q5Ytpk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({

        state: { center: null,
            zoom: null,
            isOpen: false,
            stations: null
        },

        componentWillMount() {

            this.setState({
                center: this.props.center,
                zoom: this.props.zoom,
            })
        },

        shouldComponentUpdate(nextProps) {

            if ( this.state.center !== nextProps.center ||
                this.state.isOpen !== nextProps.isOpen ||
                this.state.stations !== nextProps.stations)
            {
                return true;
            } else {
                return false;
            }

        },

        componentWillUpdate(nextProps) {

            this.setState({
                center: nextProps.center,
                zoom: nextProps.zoom,
                isOpen: nextProps.isOpen,
                stations: nextProps.stations
            })
        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        zoom={props.zoom}
        center={props.center}
    >
        {props.stations && props.stations.map( function (obj) {
            return (
                <div key={obj.id}>
                    <Marker
                        position={{ lat: Number(obj.lat), lng: Number(obj.lng) }}
                        onClick={() => props.onToggleOpen(obj)}
                        icon={{
                            url: markerOk,
                        }}
                    >
                    </Marker>
                </div>
            );
        })
        }
        <Marker
            position={{ lat: Number(props.activeObject.lat), lng: Number(props.activeObject.lng) }}
            icon={{
                url: markerActive,
            }}
        >
            {props.isOpen &&
            <InfoWindow onCloseClick={props.onToggleClose}>
                <div className="infoWindow">
                    <Graphic />
                </div>
            </InfoWindow>
            }
        </Marker>
    </GoogleMap>
);

export default Map