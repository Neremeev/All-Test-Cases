import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tasks from './Tasks';
import AddTask from './taskContainers/AddTask';
import {getTasks} from '../actions/tasksActions';
import FilterTasks from './taskContainers/FilterTasks';
import SortTasks from './taskContainers/SortTasks';
import LoginButton from '../components/LoginButton';
import {chooseView} from '../actions/listActions';
import { Link } from "react-router-dom";

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

    ChooseViewList = (event) => {
        event.preventDefault();
        this.props.chooseView(!this.props.view);
    }


    render() {
        const data = {
            tasks: this.props.data.tasks,
            view: this.props.view
        }
        let buttonView;
        if(data.view) {
            buttonView = <button className="buttonView" onClick={this.ChooseViewList}>Изменить вид на обычный</button>;
        } else {
            buttonView = <button className="buttonView" onClick={this.ChooseViewList}>Изменить вид на Scrum</button>
        }
        return (
            <div>
                <LoginButton />
                <SortTasks />
                <FilterTasks />
                <AddTask/>
                {buttonView}
                {data.tasks !== null && <Tasks data={data}/>}
                <div className="basketBtn">
                    <Link to={`/basket`}>
                        <p className="basketLink"></p>
                        <p className="basketLinkText">Aрхив задач</p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        session: state.session,
        data: state.data,
        view: state.view.view,
    }),
    dispatch => ({
        getTasks(data) {
            dispatch(getTasks(data));
        },
        chooseView(view) {
            dispatch(chooseView(view));
        }
    })
)(AllTasksContainer);