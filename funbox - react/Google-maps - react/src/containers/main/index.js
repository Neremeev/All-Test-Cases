import React, {Component} from "react";
import Map from '../map'
import {getDefaultRoutes} from '../../actions/routesActions';
import {connect} from "react-redux";
import SideBar from '../../components/sidebar'
import AddRoute from '../editRoutes/addRoute'
import PropTypes from 'prop-types';


class Main extends Component {

    static propTypes = {
        markers: PropTypes.array.isRequired,
        routes: PropTypes.array.isRequired,
    }

    state = {
        isOpen: false,
        address: "Введите адрес на карте",
        lng: "",
        lat: ""
    }

    componentWillMount() {
        this.props.getDefaultRoutes()
    }

    onToggleOpen = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    getSearchValue = (address, lng, lat) => {
        this.setState({
            address: address,
            lng: lng,
            lat: lat
        })
    }


    render() {
        const markers = this.props.markers;
        const routes = this.props.routes;
        return (
            <div className="main">
                <div className="sidebar">
                    <AddRoute  address={this.state.address} lng={this.state.lng} lat={this.state.lat}/>
                    <SideBar/>
                </div>
                <div className="map">
                    <Map
                        routes={routes}
                        markersForRoutes={markers}
                        isOpen={this.state.isOpen}
                        onToggleOpen={this.onToggleOpen}
                        getSearchValue={this.getSearchValue}
                    />
                </div>
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
        getDefaultRoutes() {
            dispatch(getDefaultRoutes());
        },
    }),
)(Main);