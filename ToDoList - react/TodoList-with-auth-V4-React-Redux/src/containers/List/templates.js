import React, {Component} from 'react';
import DeleteTask from '../taskContainers/DeleteTask';
import {Link} from "react-router-dom";


export default class Templates extends Component {


    state = {
        isOpened: false,
    };



    openDescription = () => {
        this.setState({isOpened: !this.state.isOpened});
    }

    render() {
        let task = this.props.task;
        let descriptionText;
        if (this.state.isOpened) {
            descriptionText = <p>{task.description}</p>
        }
        return (
                <div className="scrumTask">
                    <p className="scrumTextTitle">
                        <Link to={`/task/${task.id}`}>{task.name}</Link>
                    </p>
                    <p className="scrumText">
                        Дата создания: {task.date}
                    </p>
                    <p className="scrumText">
                        Приоритет: {task.priority}
                    </p>
                    <p className="scrumTextDescription" onClick={this.openDescription}>
                        Подробное описание
                        <strong className="scrumText">{descriptionText}</strong>
                    </p>
                    <p className="scrumButton">
                        <DeleteTask task={task}/>
                    </p>
                </div>
        );
    }

}