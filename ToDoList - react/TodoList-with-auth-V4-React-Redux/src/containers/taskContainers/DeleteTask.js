import React, { Component } from 'react';
import {connect} from "react-redux";
import {DeletedTask} from "../../actions/tasksActions";

class DeleteTask extends Component {


    onBtnClickDelete = (event) => {
        event.preventDefault();
        const text = 'Вы хотите переместить задачу \'' + this.props.task.name + '\' в архив?';
        const result = window.confirm(text);
        const deletedTasks = this.props.deletedTasks.slice();
        if(result) {
            const allTasks = this.props.tasks.slice(),
                  task = this.props.task;
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i].id === task.id) {
                    deletedTasks.push(allTasks[i]);
                    allTasks.splice(i, 1);
                    this.props.DeletedTask(allTasks, deletedTasks);
                }
            }
        }

    }


    render() {
        return (
                <button
                        onClick={this.onBtnClickDelete}
                >
                    Переместить в архив
                </button>
        );
    }

};


export default connect(
    state => ({
        tasks: state.data.tasks,
        deletedTasks: state.data.deletedTasks,
    }),
    dispatch => ({
        DeletedTask(allTasks, deletedTasks) {
            dispatch(DeletedTask(allTasks, deletedTasks));
        }
    })
)(DeleteTask);
