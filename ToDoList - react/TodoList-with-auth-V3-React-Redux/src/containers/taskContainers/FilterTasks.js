import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterTasks, returnFilterTasks} from '../../actions/tasksActions';


class FilterTasks extends Component {

    state = {
        filterName: '',
    }

    onBtnClickFilter = (event) => {
        event.preventDefault();
        const filterName = this.filterName.value.toLowerCase();
        if (filterName === '' && this.props.filteredTasks !== null) {
            let oldObject = this.props.tasks;
            let filteredTasks = this.props.filteredTasks;
            oldObject = oldObject.concat(filteredTasks);
            this.props.returnFilterTasks(oldObject)
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
            this.props.filterTasks(newTasks, filterTasksObject)
        }
        this.filterName.value = '';
    }

    render() {
        return (
            <form className='filterForm'>
                <input
                    type='text'
                    placeholder='Название задачи или часть названия'
                    ref={(input) => this.filterName = input}
                />
                <button className="filterBtn"
                        onClick={this.onBtnClickFilter}
                >
                    Фильтр по названию
                </button>
            </form>
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