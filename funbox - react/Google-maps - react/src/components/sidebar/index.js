import React, {Component} from 'react';
import {connect} from "react-redux";
import DeleteRoute from '../../containers/editRoutes/deleteRoute/index'
import PropTypes from "prop-types";



class Sidebar extends Component {

    static propTypes = {
        markers: PropTypes.array.isRequired,
    }

    render() {
        const points = this.props.markers;
        const point = points.map((obj) => (
                <li className="routeContainer" key={obj.address}>
                    {obj.address}
                    <DeleteRoute obj={obj} newMarkers={this.newMarkers}/>
                </li>
            )
        )

        return (
            <div className="routesContainer">
                <ol>{point}</ol>
            </div>
        );
    }

}



export default connect(
    state => ({
        markers: state.route.markers,
    }),
)(Sidebar);
