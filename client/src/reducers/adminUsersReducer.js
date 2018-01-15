import { FETCH_ADMIN_USERS, ADD_NEW_STUDENT, ADD_NEW_PROFESSOR } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_USERS:
            return action.payload || false;
        case ADD_NEW_STUDENT:
            return state.concat(action.payload) || false;
        case ADD_NEW_PROFESSOR:
            return state.concat(action.payload) || false;
        default:
            return state;
    }
}
