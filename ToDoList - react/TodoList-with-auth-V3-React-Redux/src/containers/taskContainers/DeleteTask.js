import React, { Component } from 'react';
import {connect} from "react-redux";
import {DeletedTask} from "../../actions/tasksActions";

class DeleteTask extends Component {


    onBtnClickDelete = (event) => {
        event.preventDefault();
        const text = 'Вы хотите удалить задачу \'' + this.props.task.name + '\' ?';
        const result = window.confirm(text);
        if(result) {
            const allTasks = this.props.tasks.slice(),
                  task = this.props.task;
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i].id === task.id) {
                    allTasks.splice(i, 1);
                    this.props.DeletedTask(allTasks);
                }
            }
        }

    }


    render() {
        return (
            <p className="date">
                <button className="deleteButton"
                        onClick={this.onBtnClickDelete}
                >
                    Удалить задачу
                </button>
            </p>
        );
    }

};


export default connect(
    state => ({
        tasks: state.data.tasks,
    }),
    dispatch => ({
        DeletedTask(deleteTask) {
            dispatch(DeletedTask(deleteTask));
        }
    })
)(DeleteTask);
