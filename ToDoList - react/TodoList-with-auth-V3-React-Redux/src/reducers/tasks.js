import {
    GET_TASKS,
    ADD_TASK,
    ADD_TASK_ERRORED,
    RETURN_FILTER_TASKS,
    FILTER_TASKS,
    SORTED_TASKS,
    DELETED_TASKS,
    EDIT_TASK,
    EDIT_DESCRIPTION_ERRORED
} from '../actions/tasksActions';

const initialState = {
    tasks: null,
    error: {
      errorEdit: '',
      errorAdd: '',
    },
    filteredTasks: null,
    name: '',
};

export default function tasks(state = initialState, action) {
    switch (action.type) {

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks,
                name: action.payload.name,
            };

        case ADD_TASK:
            return {
                ...state,
                tasks: action.payload,
                error: {
                    errorEdit: '',
                    errorAdd: '',
                },
            };

        case ADD_TASK_ERRORED:
            return {
                ...state,
                error: {
                    errorEdit: '',
                    errorAdd: action.payload,
                },
            };

        case RETURN_FILTER_TASKS:
            return {
                ...state,
                tasks: action.payload,
                filteredTasks: null,
            };

        case FILTER_TASKS:
            return {
                ...state,
                tasks: action.payload.newTasks,
                filteredTasks: action.payload.filteredTasks,
            };

        case SORTED_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };

        case DELETED_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };

        case EDIT_TASK:
            return {
                ...state,
                tasks: action.payload,
                error: {
                    errorEdit: '',
                    errorAdd: '',
                },
            };

        case EDIT_DESCRIPTION_ERRORED:
            return {
                ...state,
                error: {
                    errorEdit: action.payload,
                    errorAdd: '',
                },
            };

        default:
            return state;
    }
}
