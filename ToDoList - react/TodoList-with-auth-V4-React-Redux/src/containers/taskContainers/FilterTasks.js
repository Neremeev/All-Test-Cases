import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterTasks, returnFilterTasks} from '../../actions/tasksActions';


class FilterTasks extends Component {

    state = {
        filterName: '',
    }

    handleChangeInput (event) {
        event.preventDefault();
        const filterName = event.target.value.toLowerCase();
        if (filterName === '' && this.props.filteredTasks !== null) {
            let oldObject = this.props.tasks;
            let filteredTasks = this.props.filteredTasks;
            oldObject = oldObject.concat(filteredTasks);
            this.props.returnFilterTasks(oldObject);
            this.setState({filterName: event.target.value});
        } else {
            let stateObject = this.props.tasks;
            let filterTasksObject = this.props.filteredTasks || [];
            let newTasks = [];
            for (let i = 0; i < stateObject.length; i++) {
                if (stateObject[i].name.toLowerCase().indexOf(filterName) !== -1) {
                    newTasks.push(stateObject[i])
                } else {
                    filterTasksObject.push(stateObject[i]);
                }
            }
            this.setState({filterName: event.target.value});
            this.props.filterTasks(newTasks, filterTasksObject)
        }
    }


    render() {
        const filter = this.state.filter;
        return (
                <input
                    type='text'
                    className='filterForm'
                    placeholder='Фильтр по названию'
                    onChange={event => this.handleChangeInput(event)}
                    value={filter}
                />
        );
    }

};


export default connect(
    state => ({
        tasks: state.data.tasks,
        filteredTasks: state.data.filteredTasks,
    }),
    dispatch => ({
        filterTasks(newTasks, filterTasksObject) {
            dispatch(filterTasks(newTasks, filterTasksObject));
        },
        returnFilterTasks(oldObject) {
            dispatch(returnFilterTasks(oldObject));
        },
    })
)(FilterTasks);