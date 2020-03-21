const router = require("express").Router();
const mysql = require('mysql');
const configStuff = require("../config");


const SELECT_ALL_PROJECTS = 'SELECT * FROM projects';

const connection = mysql.createConnection({
    host: configStuff.host,
    user: configStuff.user,
    password: configStuff.password,
    database: configStuff.database,
})

connection.connect(err => {if (err) return err});

var del = connection._protocol._delegateError;

connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};


// TEST TO SEE IF CONNECTION IS WORKING PROPERLY //
router.get('/', (req, res) =>{
    
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
       
})
///////////////////////////////////////////////////

router.post('/user', (req, res) => {
    // console.log(req)

    // const { id, displayName } = req.body;

    let id = "id goes here"
    let displayName = "display name goes here"

    // connection.query(`INSERT INTO users VALUES (${id}, ${displayName})`);
    return (res.send(req))
    // return res.send(`user (probably) added with info: ${id}, ${displayName}`)
})

router.post('/projects/new', (req, res) => {

    console.log('accessed post request to /projects/new');
    console.log(req.body)

    // return res.send(req.body);

    const { projectId, projectName } = req.body;

    console.log(projectId);

    const INSERT_PROJECT_QUERY = `INSERT INTO projects (ProjectId, ProjectName) VALUES ('${projectId}', '${projectName}')`;

    connection.query(INSERT_PROJECT_QUERY, (error, results) =>{
        if (error) return res.send(error)
        else return res.send(`successfully added project with id and name of ${projectId} and ${projectName}`)
    })
})

router.get('/projects', (req, res) => {

    connection.query('SHOW TABLES ', (err, result) => {
        if (err) return res.send(err); 
        else{
            return res.json({
                data: result,
            })
        }
    })

});

// POST REQUEST TO USER-PROJECT TABLE
router.post('/projects/join', (req, res) => {

    const { userId, projectId } = req.body;
    const INSERT_PROJECT_USER_QUERY = `INSERT INTO user_project (UserId, ProjectId) VALUES (${userId}, ${projectId})`;

    connection.query(INSERT_PROJECT_USER_QUERY, (error, results) => {
        if (error) return res.send(error)
        else return res.send(`success on user-project`)        
    });
})

router.post('/projects/ticket', (req, res) => {
    const { id, title, user, description, color, status, project } = req.body;

    connection.query(`INSERT INTO tickets 
    (TicketId, ProjectId, UserId, Title, Status, Description, Color) 
    VALUES (${id}, ${project}, ${user}, ${title}, ${status}, ${description}, ${status})`);

    return res.send(`probably added a whole buncha shit do a ticket table`)
})

module.exports = router