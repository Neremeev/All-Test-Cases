export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASKS';
export const ADD_TASK_ERRORED = 'ADD_TASK_ERRORED';
export const FILTER_TASKS = 'FILTER_TASKS';
export const RETURN_FILTER_TASKS = 'RETURN_FILTER_TASKS';
export const SORTED_TASKS = 'SORTED_TASKS';
export const DELETED_TASKS = 'DELETED_TASKS';
export const EDIT_TASK = 'EDIT_TASK';
export const EDIT_DESCRIPTION_ERRORED = 'EDIT_DESCRIPTION_ERRORED';

export function getTasks(data) {
    return ({
        type: GET_TASKS,
        payload: {
            tasks: data.tasks,
            name: data.name
        }
    });
}


export function addTasks(task) {
    return ({
        type: ADD_TASK,
        payload: task
    });
}

export function addTaskErrored() {
    return ({
        type: ADD_TASK_ERRORED,
        payload: true
    });
}

export function editDescriptionErrored() {
    return ({
        type: EDIT_DESCRIPTION_ERRORED,
        payload: true
    });
}

export function filterTasks(newTasks, filterTasksObject) {
    return ({
        type: FILTER_TASKS,
        payload: {
            newTasks: newTasks,
            filteredTasks: filterTasksObject,
        }
    });
}


export function returnFilterTasks(oldObject) {
    return ({
        type: RETURN_FILTER_TASKS,
        payload: oldObject
    });
}


export function TasksSorted(sorted) {
    return ({
        type: SORTED_TASKS,
        payload: sorted
    });
}

export function DeletedTask(deleteTask) {
    return ({
        type: DELETED_TASKS,
        payload: deleteTask
    });
}

export function editTask(allTasks) {
    return ({
        type: EDIT_TASK,
        payload: allTasks
    });
}