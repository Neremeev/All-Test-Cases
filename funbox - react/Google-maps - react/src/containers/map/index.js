import React from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps"
import _ from 'lodash';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';


const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8ECfIjkNyE2AVBlG4Fpd4rD2Y4q5Ytpk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                center: {
                    lat: 54.1844592, lng: 45.17379970000002
                },
                markers: [],
                zoom: 13,

                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },

                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    places.map(({ place_id, formatted_address, geometry: { location } }) =>
                        <div key={place_id}>
                            {this.props.getSearchValue(formatted_address, location.lng(), location.lat())}
                        </div>
                    )

                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));


                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                        zoom: 13
                    });
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={props.zoom}
        center={props.center}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Введите адрес"
                style={{
                    boxSizing: `border-box`,
                    border: `2px solid black`,
                    width: `80%`,
                    height: `32px`,
                    marginTop: `10px`,
                    padding: `0 12px`,
                    fontSize: `17px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
        )}
        {props.markersForRoutes.map( function (obj, index) {
            return (
                <div key={index}>
                    <Marker
                        title={obj.address}
                        position={{ lat: obj.lat, lng: obj.lng }}
                        onClick={props.onToggleOpen}
                    >
                        {props.isOpen &&
                        <InfoWindow onCloseClick={props.onToggleOpen}>
                            <div>
                                {obj.address}
                            </div>
                        </InfoWindow>
                        }
                    </Marker>
                </div>
            );
        })
        }
        <Polyline path={props.routes} />
    </GoogleMap>
);

export default Map