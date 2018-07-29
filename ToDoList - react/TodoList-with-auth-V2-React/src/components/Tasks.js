import React, { Component } from 'react';
import Article from './Article';

export default class Tasks extends Component {

    render() {
        window.allObj = this.props.data;
        let tasks = this.props.data;
        let newsTemplate;
        newsTemplate = tasks.map(function (task, index) {
            return (
                <div className="art" key={index}>
                    <Article data={task}/>
                </div>
            )
        })

        return (
            <div className="allPage">
                <h3 className="title">Всего задач: {tasks.length}</h3>
                {newsTemplate}
            </div>
        )
    }
};