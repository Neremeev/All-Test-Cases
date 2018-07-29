import React, { Component } from 'react';
import {connect} from "react-redux";
import {TasksSorted} from "../../actions/tasksActions";

class SortTasks extends Component {

        state = {
            buttonSort: true
        };


    onBtnClickSort = (event) => {
        event.preventDefault();
        this.setState({buttonSort: !this.state.buttonSort});
        const value = this.state.buttonSort;
        let sortObject = this.props.tasks.slice();
        if (value === true) {

            function compareABC(a,b) {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1;
                return 0;
            }

            sortObject.sort(compareABC);

        } else {

            function compareZYX(a,b) {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return 1;
                if (a.name.toLowerCase() > b.name.toLowerCase())
                    return -1;
                return 0;
            }

            sortObject.sort(compareZYX);
        }
        this.props.TasksSorted(sortObject);
    }


    render() {
        let name;
        if (this.state.buttonSort === true) {
            name = "^";
        } else if (this.state.buttonSort === false) {
            name = "V";
        }
        return (
            <button className="sortButton"
                    onClick={this.onBtnClickSort}
            >
                Сортировка по имени задачи {name}
            </button>
        );
    }

};


export default connect(
    state => ({
        tasks: state.data.tasks,
    }),
    dispatch => ({
        TasksSorted(sorted) {
            dispatch(TasksSorted(sorted));
        }
    })
)(SortTasks);
