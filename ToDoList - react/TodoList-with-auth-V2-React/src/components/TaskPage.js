import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageProps: window.objectLink,
            valPriority: window.objectLink.priority,
            valStatus: window.objectLink.status
        };
    }

    choosePriority = (event) => {
        this.setState({valPriority: event.target.value});
        let obj = this.state.pageProps;
        obj.priority = event.target.value;
        window.taskPagePriority.emit('Priority', obj);
    }

    chooseStatus = (event) => {
        this.setState({valStatus: event.target.value});
        let obj = this.state.pageProps;
        obj.status = event.target.value;
        window.taskPageStatus.emit('Status', obj);
    }

    setObj = (event) => {
        event.preventDefault();
        let newObj = window.allObj;
        window.setObj.emit('setObj', newObj);
    }

    render() {
        let pageProps = this.state.pageProps;
        return (
                <table className="pageTask">
                    <tbody>
                        <tr>
                            <th>Подробная страница задачи</th>
                        </tr>
                        <tr>
                            <th>Задача: </th>
                            <th>{pageProps.name}</th>
                        </tr>
                        <tr>
                            <th>Статус задачи:</th>
                            <th>
                                <select value={this.state.valStatus} onChange={this.chooseStatus}>
                                    <option value="Готова">Готова</option>
                                    <option value="Не готова">Не готова</option>
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th>Дата создания: </th>
                            <th>{pageProps.date}</th>
                        </tr>
                        <tr>
                            <th>Приоритет:</th>
                            <th>
                                <select value={this.state.valPriority} onChange={this.choosePriority}>
                                    <option value="Высокий">Высокий</option>
                                    <option value="Средний">Средний</option>
                                    <option value="Низкий">Низкий</option>
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th>Подробное описание</th>
                            <th>{pageProps.description}</th>
                        </tr>
                        <tr>
                            <th style={{opacity: '0'}}></th>
                            <th>
                            <button className='return' onClick={this.setObj}>
                                <Link to="/tasks">Вернуться к задачам</Link>
                            </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
        )
    }
}