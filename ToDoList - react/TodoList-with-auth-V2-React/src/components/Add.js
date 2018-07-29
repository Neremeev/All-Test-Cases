import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addName: true,
            addDescription: true,
            addPriority: true,
            modalOpen: false
        };
    }

    addToTask = (event) => {
        let d = new Date();
        let date = d.toISOString().substring(0, 10);
        event.preventDefault();
        if ( this.addName.value.length < 1 || this.addDescription.value.length < 1 || this.addPriority.value.length < 1 ) {
            return alert("Не все поля заполнены!")
        }
        let task = [{
            name: this.addName.value,
            description: this.addDescription.value,
            status: "Не готова",
            priority: this.addPriority.value,
            date: date
        }];
        this.addName.value = '';
        this.addDescription.value = '';
        window.addTask.emit('Add', task);
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
                    <Modal.Content>
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

};