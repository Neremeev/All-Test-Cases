import React, { Component } from 'react';

export default class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSort: true
        };
    }

    onBtnClickSort = (event) => {
        event.preventDefault();
        this.setState({buttonSort: !this.state.buttonSort});
        let value = this.state.buttonSort;
        window.taskSort.emit('Sort', value);
    }

    render() {
        let name;
        if (this.state.buttonSort === true) {
            name = "^";
        } else if (this.state.buttonSort === false) {
            name = "V";
        }
        return (
            <button className="sortButton"
                    onClick={this.onBtnClickSort}
            >
                Сортировка по имени задачи {name}
            </button>
        );
    }

};