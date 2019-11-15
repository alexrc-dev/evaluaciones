import {reducer as reduxAsyncConnect} from "redux-connect";
import teachers from './teachers'
import users from "./users";
import userSession from './userSession.js';

const reducers = {
    reduxAsyncConnect,
    teachers,
    users,
    userSession,
};

export default reducers;