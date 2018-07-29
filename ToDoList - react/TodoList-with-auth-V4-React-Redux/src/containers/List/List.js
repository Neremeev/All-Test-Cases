import React from 'react';
import DeleteTask from '../../containers/taskContainers/DeleteTask';
import { Link } from "react-router-dom";



export default function Tasks ({ tasks }) {

        const allTasks = tasks;
        let template = allTasks.map(function (task) {
            return (
                <div className="art" key={task.id}>
                    <div className={'article ' + (task.status === "Готова" ? 'nn': '')}>
                        <p className="task_name">
                            <Link to={`/task/${task.id}`}>{task.name}</Link>
                        </p>
                        <p className="date">
                            Дата создания: {task.date}
                        </p>
                        <p className="date">
                            Статус задачи: {task.status}
                        </p>
                        <p className="date">
                            Приоритет:  {task.priority}
                        </p>
                        <p className="deleteButton">
                            <DeleteTask task={task}/>
                        </p>
                    </div>
                </div>
            );
        });
        return (
            <div>
                {template}
            </div>
        );

}