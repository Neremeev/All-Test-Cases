import React from 'react';
import Templates from './templates';


export default function Tasks ({ tasks }){

        let allTasks = tasks;
        let process, ready, plan,
            process1 = [], ready1 = [], plan1 = [];
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].status === 'Готова') {
                ready1.push(allTasks[i])
            } else if (allTasks[i].status === 'План') {
                plan1.push(allTasks[i])
            } else {
                process1.push(allTasks[i])
            }
        }
        process = process1.map(function (task) { return (
            <div key={task.id}>
                <Templates task={task} />
            </div>) });
        ready = ready1.map(function (task) { return (
            <div key={task.id}>
                <Templates task={task} />
            </div>) });
        plan = plan1.map(function (task) { return (
            <div key={task.id}>
                <Templates task={task} />
            </div>) });
        return (
            <div className="scrumContainer">
                <div className="scrumContainerProcess">
                    <h2 className="scrumTitle">В процессе</h2>
                    {process}
                </div>
                <div className="scrumContainerPlan">
                    <h2 className="scrumTitle">План</h2>
                    {plan}
                </div>
                <div className="scrumContainerReady">
                    <h2 className="scrumTitle">Готово</h2>
                    {ready}
                </div>
            </div>
        );

}