import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteRoute} from '../../../actions/routesActions';
import PropTypes from "prop-types";

class DeleteRoute extends Component {

    static propTypes = {
        markers: PropTypes.array.isRequired,
        routes: PropTypes.array.isRequired,
    }


    deletePoint = () => {

        let markers = this.props.markers.slice(),
            routes = this.props.routes.slice();

        for (let i = 0; i < markers.length; i++) {

            if (markers[i].address === this.props.obj.address) {
                markers.splice(i,1);
                routes.splice(i,1);
            }
        }

        this.props.deleteRoute(markers, routes)

    }

    render() {
        return (
            <div>
                <button className="btnDeleteRoute" onClick={this.deletePoint}>Удалить точку</button>
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
        deleteRoute(markers, routes) {
            dispatch(deleteRoute(markers, routes));
        },
    }),
)(DeleteRoute);
