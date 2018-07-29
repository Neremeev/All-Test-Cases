import React from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'



const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8ECfIjkNyE2AVBlG4Fpd4rD2Y4q5Ytpk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `720px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({

        state: {
            center: null,
        },

        componentWillMount() {

            this.setState({
                center: this.props.center,
                zoom: this.props.zoom,
            })
        },

        shouldComponentUpdate(nextProps) {

            if ( this.state.center !== nextProps.center) {
                return true;
            } else {
                return false;
            }

        },

        componentWillUpdate(nextProps) {

            this.setState({
                center: nextProps.center,
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
        {props.objects.map( function (object) {
            return (
                <div key={object.lat}>
                    <Marker
                        position={{ lat: object.lat, lng: object.lng }}
                        onClick={() => props.chooseMarker(object)}
                        icon={{
                            url: object.icon,
                        }}
                    >
                    <InfoBox
                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                    >
                        <div className="infobox">
                            <span className='icon-logo'/>
                        </div>
                    </InfoBox>
                    </Marker>
                </div>
            );
        })
        }
    </GoogleMap>
);

export default Map