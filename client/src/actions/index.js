import axios from 'axios';
import { FETCH_USER, FETCH_CASES, UPDATE_PROFESSOR, UPDATE_STUDENT} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCases = () => async dispatch => {
    const res = await axios.get('/api/fetchAllCases');
    dispatch({ type: FETCH_CASES, payload: res.data });
};

export const handleSignUp = (values) => {
    const res = axios.post('/api/signup', {
        values
    });
};

export const updateProfessor = (values) => async dispatch => {
    const res = axios.post('/api/updateProfessor', {
        values
    });
    return {
        type: UPDATE_PROFESSOR,
        payload: res
    }
};

export const updateStudent = (values) => async dispatch => {
    const res = axios.post('/api/updateStudent', {
        values
    });
    return {
        type: UPDATE_STUDENT,
        payload: res
    }
};