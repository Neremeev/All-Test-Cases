import React from 'react';
import DeleteTask from '../containers/taskContainers/DeleteTask';
import { Link } from "react-router-dom";


export default function Tasks({ data }) {

    return (

            data !== null && <Article data={data} />

    );

}

function Article({ data }) {
    let tasks = data;
    let newsTemplate = tasks.map(function (task) {
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
                    <DeleteTask task={task}/>
                </div>
            </div>
        );
    });

  return (
      <div className="allPage">
          <h3 className="title">Всего задач: {tasks.length}</h3>
          {newsTemplate}
      </div>
  );
}