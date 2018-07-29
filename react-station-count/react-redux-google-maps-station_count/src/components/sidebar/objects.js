import React, {Component} from 'react';
import {connect} from "react-redux";

class Objects extends Component {

    render() {

        const objects = this.props.objects;
        const activeObject = this.props.activeObject;

        return (
            <div className='objects-sidebar'>
                {objects.map((object) => (
                        <div className={(object.lat === activeObject.lat) ? 'activeObject' : 'object'}
                             key={object.lat} onClick={() => this.props.chooseMarker(object)}
                        >
                            <div>
                                <img src={object.icon} alt=""/>
                            </div>
                            <div>
                                <span>{object.address.city}</span>
                                <span>{object.address.number}</span>
                                <span>{object.address.street}</span>
                                <span>{object.address.build}</span>
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        objects: state.session.objects,
        activeObject: state.session.activeObject
    }
}
export default connect(mapStateToProps)(Objects)