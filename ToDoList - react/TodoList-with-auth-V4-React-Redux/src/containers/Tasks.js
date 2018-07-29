import React from 'react';
import Scrum from './List/Scrum';
import List from './List/List';


export default function Tasks({ data}) {
    let view = data.view,
        tasks = data.tasks,
        list;
    if (view) {
        list = <Scrum tasks={tasks}/>;
    } else {
        list = <List tasks={tasks}/>;

    }
    return (
        <div>
            {list}
        </div>
    )
}

