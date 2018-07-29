import React, {Component} from 'react';
import {connect} from 'react-redux';

class Sidebar extends Component {



    render() {
        const stations = this.props.stations;
        return (
            <div>
                {stations && stations.map((station) => (
                        <li className="stations" key={station.id} onClick={() => this.props.onToggleOpen(station)}>
                            {station.name}
                        </li>
                    )
                )}
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

export default connect(mapStateToProps)(Sidebar)