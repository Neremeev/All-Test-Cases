import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {editTask} from "../actions/tasksActions";
import {editDescriptionErrored} from "../actions/tasksActions";
import {errors} from "../errorTexts";
import { Button, Header, Modal } from 'semantic-ui-react';
import LoginButton from "../components/LoginButton";

class PersTaskContainer extends Component {

    state = {
        pageObject: [],
        modalOpen: false,
    }

    componentDidMount() {
        const allTasks = this.props.tasks;
        const id = this.props.match.params.id;
        for(let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id === id) {
                this.setState({pageObject: allTasks[i]})
            }
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })




    choosePriority = (event) => {
        this.setState({pageObject: {
                ...this.state.pageObject,
                priority: event.target.value,
            }
        });
        const allTasks = this.props.tasks;
        const task = this.state.pageObject;
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id === task.id) {
                allTasks[i].priority = event.target.value;
            }
        }
        this.props.editTask(allTasks);
    }

    chooseStatus = (event) => {
        this.setState({pageObject: {
                ...this.state.pageObject,
                status: event.target.value,
            }
        });
        const allTasks = this.props.tasks;
        const task = this.state.pageObject;
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id === task.id) {
                allTasks[i].status = event.target.value;
            }
        }
        this.props.editTask(allTasks);
    }

    editDescription = (event) => {
        event.preventDefault();
        if ( this.editedDescription.value.length < 1) {
            return this.props.editDescriptionErrored();
        }
        this.setState({pageObject: {
                ...this.state.pageObject,
                description: this.editedDescription.value,
            }
        });
        const allTasks = this.props.tasks;
        const task = this.state.pageObject;
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id === task.id) {
                allTasks[i].description = this.editedDescription.value;
            }
        }
        this.props.editTask(allTasks);
        this.setState({ modalOpen: false })
    }


    render() {
        const { name, status, priority, date, description } = this.state.pageObject;
        const error = this.props.error;
        return (
            <div>
                <LoginButton />
                <table className="pageTask">
                    <tbody>
                    <tr>
                        <th>Подробная страница задачи</th>
                    </tr>
                    <tr>
                        <th>Задача: </th>
                        <th>{name}</th>
                    </tr>
                    <tr>
                        <th>Статус задачи:</th>
                        <th>
                            <select value={status} onChange={this.chooseStatus}>
                                <option value="Готова">Готова</option>
                                <option value="Не готова">Не готова</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Дата создания: </th>
                        <th>{date}</th>
                    </tr>
                    <tr>
                        <th>Приоритет:</th>
                        <th>
                            <select value={priority} onChange={this.choosePriority}>
                                <option value="Высокий">Высокий</option>
                                <option value="Средний">Средний</option>
                                <option value="Низкий">Низкий</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Подробное описание</th>
                        <th>{description}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Modal
                                trigger={
                                    <Button
                                        style={{
                                            background: "#4dc1dc",
                                            color: "#FFFFFF",
                                            borderRadius: "10px 10px",
                                            border: "1px solid #ffffff",
                                            width: "100%",
                                            height: "40px",
                                            fontFamily: " 'Lato', Calibri, Arial, sans-serif",
                                        }}
                                        onClick={this.handleOpen}
                                    >
                                        Редактировать описание
                                    </Button>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                className="scrolling"
                                size='small'
                            >
                                <Header icon='browser' content='Редактировать описание' />
                                <Modal.Content style={{'marginBottom': '50%'}}>
                                    {error && <p>{errors.edit_task}</p>}
                                    <form className='add_f'>
                                            <textarea
                                                className='textbox_desc'
                                                placeholder='Описание задачи'
                                                ref={(input) => this.editedDescription = input}
                                                defaultValue={description}
                                            >
                                            </textarea>
                                        <button
                                            className='buttonAdd'
                                            onClick={this.editDescription}
                                            ref='alert_button'
                                        >
                                            Редактировать описание
                                        </button>
                                    </form>
                                </Modal.Content>
                            </Modal>
                        </th>
                        <th>
                            <button className='return'>
                                <Link to="/tasks">Вернуться к задачам</Link>
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default connect(
    state => ({
        tasks: state.data.tasks,
        error: state.data.error.errorEdit
    }),
    dispatch => ({
        editTask(allTasks) {
            dispatch(editTask(allTasks));
        },
        editDescriptionErrored() {
            dispatch(editDescriptionErrored());
        }
    }),
)(PersTaskContainer);