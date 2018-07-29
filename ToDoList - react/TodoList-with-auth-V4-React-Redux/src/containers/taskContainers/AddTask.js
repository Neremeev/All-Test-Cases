import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Header, Modal } from 'semantic-ui-react';
import {addTasks, addTaskErrored} from '../../actions/tasksActions';
import {errors} from '../../errorTexts';



class AddTask extends Component {

    state = {
            addName: '',
            addDescription: '',
            addPriority: '',
            modalOpen: false
    };


    addToTask = (event) => {
        event.preventDefault();
        if ( this.addName.value.length < 1
            || this.addDescription.value.length < 1
            || this.addPriority.value.length < 1
        ) {
            return this.props.addTaskErrored();
        }
        let task = {
            id: String(+new Date()),
            name: this.addName.value,
            description: this.addDescription.value,
            status: "В процессе",
            priority: this.addPriority.value,
            date: new Date().toLocaleString()
        };
        let newTasks = this.props.tasks.slice();
        newTasks.push(task);
        this.props.addTasks(newTasks);
        this.addName.value = '';
        this.addDescription.value = '';
        this.setState({ modalOpen: false })
    }

    onFieldChange = (fieldName, event) => {
        let next = {};
        if (event.target.value.trim().length > 0) {
            next[fieldName] = false;
            this.setState(next);
        } else {
            next[fieldName] = true;
            this.setState(next);
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const error = this.props.error;
        return (
            <div className="addShow">
                <Modal
                    trigger={
                        <Button
                            style={{
                                background: "#4dc1dc",
                                color: "#FFFFFF",
                                borderRadius: "20px 20px",
                                border: "1px solid #ffffff",
                                width: "100%"
                            }}
                            onClick={this.handleOpen}
                        >
                            Добавить новую задачу
                        </Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    className="scrolling"
                    size='small'
                >
                    <Header icon='browser' content='Добавьте новую задачу' />
                    <Modal.Content style={{'marginBottom': '200px'}}>
                        {error && <p>{errors.add_task}</p>}
                        <form className='add_f'>
                            <input
                                type='text'
                                className='textbox_name'
                                onChange={this.onFieldChange.bind(this, 'addName')}
                                placeholder='Название задачи'
                                ref={(input) => this.addName = input}
                            />
                            <textarea
                                className='textbox_desc'
                                onChange={this.onFieldChange.bind(this, 'addDescription')}
                                placeholder='Описание задачи'
                                ref={(input) => this.addDescription = input}
                            >
                            </textarea>
                            <select
                                className="selectPriority"
                                onChange={this.onFieldChange.bind(this, 'addPriority')}
                                ref={(input) => this.addPriority = input}
                            >
                                <option value="">Выберите приоритет</option>
                                <option value="Высокий">Высокий</option>
                                <option value="Средний">Средний</option>
                                <option value="Низкий">Низкий</option>
                            </select>
                            <button
                                className='buttonAdd'
                                onClick={this.addToTask}
                                ref='alert_button'
                            >
                                Добавить задачу
                            </button>
                        </form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }

}



export default connect(
        state => ({
            tasks: state.data.tasks,
            error: state.data.error.errorAdd
        }),
    dispatch => ({
        addTasks(task) {
            dispatch(addTasks(task));
        },
        addTaskErrored() {
            dispatch(addTaskErrored());
        },
    })
)(AddTask);
