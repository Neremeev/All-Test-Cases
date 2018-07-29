import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpened: false,
            status: false,
            value: this.props.data.priority
        };
    }

    linkClick = () => {
        let objectLink = this.props.data;
        window.objectLink = objectLink;
    }

    render() {
        let name = this.props.data.name,
            date = this.props.data.date,
            status = this.props.data.status,
            priority = this.props.data.priority;
        return(
            <div className={'article ' + (this.props.data.status === "Готова" ? 'nn': '')}>
                <p className="task_name">
                    <Link onClick={this.linkClick} to={`/task/${name}`}>{name}</Link>
                </p>
                <p className="date">
                    Дата создания: {date}
                </p>
                <p className="date">
                    Статус задачи: {status}
                </p>
                <p className="date">
                    Приоритет:  {priority}
                </p>
            </div>

        )
    }
}