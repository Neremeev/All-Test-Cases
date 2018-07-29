import React, { Component } from 'react';

import Filter from './Filter';
import Sort from './Sort';
import Add from './Add';
import Tasks from './Tasks';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: window.mockyData,
            returnButton: false
        };
    }

    componentDidMount() {
        let self = this;
        window.addTask.addListener('Add', function(task) {
            let newTask = task.concat(self.state.tasks);
            self.setState({tasks: newTask});
        });
        window.setObj.addListener('setObj', function(newObj) {
            let newTask = newObj;
            window.allObj2 = newTask;
        });
        window.authLogin.addListener('Login', function(tasksMocky) {
            let task = tasksMocky;
            self.setState({tasks: task});
        });
        window.nameFilter.addListener('Filter', function(name) {
            let filterName = name;
            let filterObject = self.state.tasks;
            let endObject = [];
            for (let i = 0; i < filterObject.length; i++) {
                if (filterObject[i].name.toLowerCase().indexOf(filterName) !== -1) {
                    endObject.push(filterObject[i])
                } else {
                    window.oldFilterObj.push(filterObject[i]);
                }
            }
                self.setState({tasks: endObject});
        });
        window.returnButton.addListener('Return', function() {
            self.setState({returnButton: true});
        });
        window.taskSort.addListener('Sort', function(value) {
            let sortObject = self.state.tasks;
            if (value === true) {

                function compareABC(a,b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase())
                        return 1;
                    return 0;
                }

                sortObject.sort(compareABC);

            } else {

                function compareZYX(a,b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase())
                        return 1;
                    if (a.name.toLowerCase() > b.name.toLowerCase())
                        return -1;
                    return 0;
                }

                sortObject.sort(compareZYX);
            }


            self.setState({tasks: sortObject});
        });
        window.taskPagePriority.addListener('Priority', function(obj) {
            let newObj = obj,
                newArr = self.state.tasks;
            for (let i = 0; i < newArr.length - 1; i++) {
                if (newObj.name === newArr[i].name) {
                    newArr[i].priority = newObj.priority
                } else {
                    continue;
                }
                self.setState({tasks: newArr});
            }
        });
        window.taskPageStatus.addListener('Status', function(obj) {
            let newObj = obj,
                newArr = self.state.tasks;
            for (let i = 0; i < newArr.length - 1; i++) {
                if (newObj.name === newArr[i].name) {
                    newArr[i].status = newObj.status
                } else {
                    continue;
                }
                self.setState({tasks: newArr});
            }
        });
    }

    render() {
        let result = [];
        nextInput:
            for (let i = 0; i < window.oldFilterObj.length; i++) {
                let str = window.oldFilterObj[i];
                for (let j = 0; j < result.length; j++) {
                    if (result[j].name === str.name) continue nextInput;
                }
                result.push(str);
            }
        window.oldFilterObj = result;
        let task;
        if (window.allObj2.length > 0) {
            task = window.allObj2;
            this.setState({tasks: window.allObj2});
            window.allObj2 = [];
        } else {
            task = this.state.tasks;
        }
        if (this.state.returnButton === true ) {
            task = this.state.tasks.concat(window.oldFilterObj);
            this.setState({tasks: task});
            window.oldFilterObj = [];
            this.setState({returnButton: false});
        }
        return (
            <div className="main">
                <Sort />
                <Filter />
                <Add />
                <Tasks data={task}/>
            </div>
        );
    }
}