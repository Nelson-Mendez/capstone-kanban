import mysql from 'mysql';
import config from '../config';

import Users from './users';

export const Connection = mysql.createCo0nnection(config);

Connection.connect(err => {
    if(err) console.log(err);
})

export default {
    Users
}


