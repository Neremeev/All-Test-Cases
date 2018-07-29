import React, {Component} from 'react';
import {connect} from "react-redux";
import {addNewRoute} from '../../../actions/routesActions';
import PropTypes from "prop-types";


class AddRoute extends Component {

    static propTypes = {
        markers: PropTypes.array.isRequired,
        routes: PropTypes.array.isRequired,
    }


    addRoute = () => {

        if(this.props.address !== "Введите адрес на карте") {

            const markers = this.props.markers,
                routes = this.props.routes;

            const addMarker = [{
                address: this.props.address,
                lng: this.props.lng,
                lat: this.props.lat
            }];
            const addRoute = [{
                lat: this.props.lat,
                lng: this.props.lng,
            }];
            const newMarkers = markers.concat(addMarker),
                newRoutes = routes.concat(addRoute);
            this.props.addNewRoute(newMarkers, newRoutes)

            this.setState({
                address: "Введите адрес на карте",
            })
        }

    }

    render() {

        return (
            <div className="addRoute">
                <p className="addRouteText">{this.props.address}</p>
                <button className="btnAddRoute" onClick={this.addRoute}>Добавить маршрут</button>
            </div>
        )
    }
}


export default connect(
    state => ({
        markers: state.route.markers,
        routes: state.route.routes,
    }),
    dispatch => ({
        addNewRoute(newMarkers, newRoutes) {
            dispatch(addNewRoute(newMarkers, newRoutes));
        },
    }),
)(AddRoute);