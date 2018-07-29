import React, { Component } from 'react';


export default  class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: true,
        };
    }

    onBtnClickFilter = (event) => {
        event.preventDefault();
        let name =  this.filterName.value.toLowerCase();
        if (name === '') {
            window.returnButton.emit('Return', '');
            window.clsBTN = false;
            this.setState({disabledInput: false});
        }
        this.filterName.value = '';
        window.nameFilter.emit('Filter', name);
        window.clsBTN = true;
    }


    onFieldChange(fieldName, event) {
        let next = {};
        if (event.target.value.trim().length > 0) {
            next[fieldName] = false;
            this.setState(next);
        } else {
            next[fieldName] = true;
            this.setState(next);
        }
    }

    render() {
        let disabledInput = this.state.disabledInput;
        return (
            <form className='filterForm'>
                <input
                    type='text'
                    disabled={disabledInput}
                    onChange={this.onFieldChange.bind(this, 'filterName')}
                    placeholder='Название задачи или часть названия'
                    ref={(input) => this.filterName = input}
                />
                <button className="filterBtn"
                        onClick={this.onBtnClickFilter}
                        ref='alert_button'
                >
                    Фильтр по названию
                </button>
            </form>
        );
    }

};