import React, { Component } from 'react';
import { EventEmitter } from 'events';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import './App.css';

let mockyData = {};
window.authLogin = new EventEmitter();
window.nameFilter = new EventEmitter();
window.taskSort = new EventEmitter();
window.addTask = new EventEmitter();
window.objectLink = '';


const Menu = () => (
    <Router>
        <div>
            <ul className="menu">
                <li>
                    <Link to="/tasks"> Мои задачи</Link>
                </li>
            </ul>
            <Route path="/" component={Login} />
            <PrivateRoute path="/tasks" component={App} />
            <PrivateRoute path="/task/:id" component={TaskPage} />
        </div>
    </Router>
);

const AuthComp = withRouter(
    () =>
        !fakeAuth.isAuthenticated ? (
            <p className="auth">
                Пожалуйста, авторизуйтесь
            </p>
        ) : ( <p></p> )
);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}

        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />


            )
        }
    />
);


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            myObject: [],
            login: "",
            pass: ""
        };
        this.onBtnClickLogin = this.onBtnClickLogin.bind(this)
    }

    componentDidMount(){
        fetch('http://www.mocky.io/v2/5b0d80c431000058009d5710')
            .then(response => response.json())
            .then(data => {
                this.setState({myObject: data})
            })
    }

    onBtnClickLogin(event) {

        event.preventDefault();

        for ( let key in this.state.myObject ) {

            if (this.login.value === key) {
                let login = this.login.value;

                if (this.state.myObject[login].pass === this.pass.value) {
                    mockyData = this.state.myObject[login].tasks;
                    let tasksMocky = this.state.myObject[login].tasks;
                    window.authLogin.emit('Login', tasksMocky);
                    fakeAuth.authenticate(() => {
                        this.setState({ redirectToReferrer: true });
                    });
                    return alert('Хорошего дня, ' + this.login.value + '!')

                } else {
                    return alert('Неправильный пароль');
                }

            } else {
                continue;
            }
        }

        return alert('Неправильный логин');
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return(
                <form className='form-1'>
                    <AuthComp />
                    <p className="field">
                        <input
                            type='text'
                            className=''
                            placeholder='Ваш логин'
                            ref={(input) => this.login = input}
                        />
                        <i className="icon-user icon-large"></i>
                    </p>
                    <p className="field">
                        <input
                            type='password'
                            className=''
                            placeholder='Ваш пароль'
                            ref={(input) => this.pass = input}
                        />
                        <i className="icon-lock icon-large"></i>
                    </p>
                    <p className="submit">
                        <button
                            className=''
                            onClick={this.onBtnClickLogin}
                        >
                            <i className="icon-arrow-right  icon-large"></i>
                        </button>
                    </p>
                </form>

        )
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: mockyData,
            filter: []
        };
    }

    componentDidMount() {
        let self = this;
        window.addTask.addListener('Add', function(task) {
            let newTask = task.concat(self.state.tasks);
            self.setState({tasks: newTask});
        });
        window.authLogin.addListener('Login', function(tasksMocky) {
            let task = tasksMocky;
            self.setState({tasks: task});
        });
        window.nameFilter.addListener('Filter', function(name) {
            let filterName = name;
            let filterObject = self.state.tasks;
            let endObject = [];
            if (filterName === '') {
                self.setState({filter: []});
            } else {
                for (let i = 0; i < filterObject.length; i++) {
                    if (filterObject[i].name.indexOf(filterName) !== -1) {
                        endObject.push(filterObject[i])
                    }
                }
                self.setState({filter: endObject});
            }

        });
        window.taskSort.addListener('Sort', function(value) {
            let sortObject = self.state.tasks;
            if (value === true) {

                function compareABC(a,b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                }

                sortObject.sort(compareABC);

            } else {

                function compareZYX(a,b) {
                    if (a.name < b.name)
                        return 1;
                    if (a.name > b.name)
                        return -1;
                    return 0;
                }

                sortObject.sort(compareZYX);
            }


            self.setState({tasks: sortObject});
        });
    }

    render() {
        return (
            <div className="main">
                <Tasks data={this.state.tasks}/>
                <Filter />
                <FilterResults data={this.state.filter}/>
            </div>
        );
    }
}

class Tasks extends Component {

    render() {
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
                <Add/>
                <h3 class="title">Задач в работе: {tasks.length}</h3>
                {newsTemplate}
                <Sort />
            </div>
        )
    }
};


class FilterResults extends Component {

    render() {
        let result = this.props.data;
        let newsTemplate;
        newsTemplate = result.map(function (task, index) {
            return (
                <div key={index}>
                    <Article className="filterArticle"  data={task}/>
                </div>
            )
        })

        return (
            <div className="filterResults">
                {newsTemplate}
                <p
                    className={'news__count ' + (result.length > 0 ? '': 'none')}
                >
                    Всего найдено :{result.length}
                </p>
            </div>
        )
    }
};


class Article extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpened: false,
            status: false,
            value: this.props.data.priority
        };
        this.openDescription = this.openDescription.bind(this);
        this.linkClick = this.linkClick.bind(this);
        this.setTaskStatus = this.setTaskStatus.bind(this);
        this.choosePriority = this.choosePriority.bind(this)
    }

    openDescription() {
        this.setState({isOpened: !this.state.isOpened});
    }

    linkClick() {
        let objectLink = this.props.data;
        window.objectLink = objectLink;
    }

    setTaskStatus() {
        this.setState({status: !this.state.status});
    }

    choosePriority(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let name = this.props.data.name,
            description = this.props.data.description,
            date = this.props.data.date;
        let descriptionText;
        if (this.state.isOpened) {
            descriptionText = <p className='news__big-text'>{description}</p>
        }
        return(
            <div className={'article ' + (this.state.status === true ? 'nn': '')}>
                <p className="task_name">
                    <Link onClick={this.linkClick} to={`/task/${name}`}>{name}</Link>
                </p>
                <label className="labelTask">
                    Статус задачи:{'  '}
                    <input type='checkbox' defaultChecked={this.state.status} onChange={this.setTaskStatus} />
                </label>
                <p className="date">
                    Дата создания: {date}
                </p>
                <p className="priority">
                    Приоритет:{"  "}
                    <select value={this.state.value} onChange={this.choosePriority}>
                        <option value="Высокий">Высокий</option>
                        <option value="Средний">Средний</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                </p>
                <p className="task_desc" onClick={this.openDescription}>
                    Подробное описание
                    <strong className="strongTask">{descriptionText}</strong>
                </p>
            </div>

        )
    }
}


class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageProps: [],
            value: window.objectLink.priority
        };
        this.choosePriority = this.choosePriority.bind(this)
    }

    choosePriority(event) {
        this.setState({value: event.target.value});
    }


    render() {
        this.state.pageProps = window.objectLink;
        let pageProps = this.state.pageProps;
        return (
            <table className="pageTask">
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
                        <label className="labelTask">
                            <input type='checkbox' defaultChecked={pageProps.status} />
                        </label>
                    </th>
                </tr>
                <tr>
                    <th>Дата создания: </th>
                    <th>{pageProps.date}</th>
                </tr>
                <tr>
                    <th>Приоритет:</th>
                    <th>
                        <select value={this.state.value} onChange={this.choosePriority}>
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
            </table>
        )
    }
}


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addName: true,
            addDescription: true,
            addPriority: true,
        };
        this.addToTask = this.addToTask.bind(this);
    }

    addToTask(event) {
        let d = new Date();
        let date = d.toISOString().substring(0, 10);
        event.preventDefault();
        let task = [{
            name: this.addName.value,
            description: this.addDescription.value,
            status: false,
            priority: this.addPriority.value,
            date: date
        }];
        this.addName.value = '';
        this.addDescription.value = '';
        window.addTask.emit('Add', task);
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
        return (
            <form className='add_f'>
                <input
                    type='text'
                    className='textbox_name'
                    onChange={this.onFieldChange.bind(this, 'addName')}
                    placeholder='Название задачи'
                    ref={(input) => this.addName = input}
                />
                <textarea
                    className='textbox_desc'
                    onChange={this.onFieldChange.bind(this, 'addDescription')}
                    placeholder='Описание задачи'
                    ref={(input) => this.addDescription = input}
                >
                </textarea>

                    <select
                        className="selectPriority"
                        onChange={this.onFieldChange.bind(this, 'addPriority')}
                        ref={(input) => this.addPriority = input}
                    >
                        <option value="">Выберите приоритет</option>
                        <option value="Высокий">Высокий</option>
                        <option value="Средний">Средний</option>
                        <option value="Низкий">Низкий</option>
                    </select>

                <button
                    className='buttonAdd'
                    onClick={this.addToTask}
                    ref='alert_button'
                >
                    Добавить задачу
                </button>
            </form>
        );
    }

};



class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSort: true
        };
        this.onBtnClickSort = this.onBtnClickSort.bind(this);
    }

    onBtnClickSort(event) {
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
                Сортировать {name}
            </button>
        );
    }

};


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: true
        };
        this.onBtnClickFilter = this.onBtnClickFilter.bind(this);
    }

    onBtnClickFilter(event) {
        event.preventDefault();
        let name =  this.filterName.value;
        this.filterName.value = '';
        window.nameFilter.emit('Filter', name);
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
        return (
            <div>
                <form className='filterForm'>
                    <input
                        type='text'
                        className='add__author'
                        onChange={this.onFieldChange.bind(this, 'filterName')}
                        placeholder='Название задачи'
                        ref={(input) => this.filterName = input}
                    />
                    <button className="filterBtn"
                        onClick={this.onBtnClickFilter}
                        ref='alert_button'
                    >
                        Фильтр по названию
                    </button>
                </form>
                <div class="titleFilter">
                    <p>Найденные задачи:</p>
                </div>
            </div>
        );
    }

};




export default Menu;
