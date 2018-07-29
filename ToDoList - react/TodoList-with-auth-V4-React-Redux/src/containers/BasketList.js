import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearBasketList} from '../actions/tasksActions';
import { Link } from "react-router-dom";

class BasketList extends Component {

    deleteBasket = () => {
        const text = 'Вы хотите очистить архив?';
        const result = window.confirm(text);
        if (result) {this.props.clearBasketList()}
    }



    render() {
        const deletedTasks = this.props.deletedTasks;
        let template = deletedTasks.map(function (task) {
            return (
                <div>
                    <div className="basketArticle" key={task.id}>
                        <p className="basketArticleName">
                            {task.name}
                        </p>
                        <p className="basketArticleDesc">
                            {task.date}
                        </p>
                    </div>
                </div>
            );
        });
        let title,template3;
        if (deletedTasks.length === 0) {
            title = <h1 className="basketArticleTitle">Архив пуст</h1>
                } else {
            title = <h1 className="basketArticleTitle">В вашем архиве {deletedTasks.length} задач</h1>;
            template3 = <button className="basketArticleBtn" onClick={this.deleteBasket}>Очистить архив</button>
        }
        return (
            <div>
                {title}
                <button className="basketArticleOut">
                    <Link to={`/tasks`}>Вернуться к задачам</Link>
                </button>
                {template}
                {template3}
            </div>
        );
    }
}

export default connect(
    state => ({
        allTasks: state.data.tasks,
        deletedTasks: state.data.deletedTasks,
    }),
    dispatch => ({
        clearBasketList() {
            dispatch(clearBasketList());
        },
    })
)(BasketList);