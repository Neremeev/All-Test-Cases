import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tasks from '../components/Tasks';
import AddTask from './taskContainers/AddTask';
import {getTasks} from '../actions/tasksActions';
import FilterTasks from './taskContainers/FilterTasks';
import SortTasks from './taskContainers/SortTasks';
import LoginButton from '../components/LoginButton';

class AllTasksContainer extends Component {

    static propTypes = {
        data: PropTypes.shape({}),
        session: PropTypes.shape({
            data: PropTypes.shape({}),
            user: PropTypes.shape({
                id: PropTypes.number,
            }),
        }).isRequired
    }


    componentDidMount() {
        const data = this.props.session.data;
        if (this.props.data.tasks === null || this.props.session.data.name !== this.props.data.name) {
            this.props.getTasks(data);
        }
    }


    render() {
        const data = this.props.data.tasks;
        return (
            <div>
                <LoginButton />
                <SortTasks />
                <FilterTasks />
                <AddTask/>
                <Tasks data={data}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        session: state.session,
        data: state.data
    }),
    dispatch => ({
        getTasks(data) {
            dispatch(getTasks(data));
        }
    })
)(AllTasksContainer);