const router = require("express").Router();
const mysql = require('mysql');
const configStuff = require("../config");

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

    console.log('post to /user')
    console.log(req.body);;

    const { userId, displayName } = req.body;

    console.log(userId, displayName);
    const TEST_USER_QUERY = `SELECT * FROM users WHERE UserId = '${userId}'`;
    const INSERT_USER_QUERY = `INSERT INTO users (UserId, DisplayName) VALUES ('${userId}', '${displayName}')`;

    connection.query(TEST_USER_QUERY, (err, results) => {
        if (err) return res.send(err)
        if (!results.length) {
            connection.query(INSERT_USER_QUERY, (error, resultss) => {
                if (error) return res.send(error)
                else return res.send(`User added to database!`)
            })
        }
        else return res.send(`User already exists!`)
    })
})

router.post('/projects/new', (req, res) => {

    const { projectId, projectName } = req.body;
    const INSERT_PROJECT_QUERY = `INSERT INTO projects (ProjectId, ProjectName) VALUES ('${projectId}', '${projectName}')`;

    connection.query(INSERT_PROJECT_QUERY, (error, results) => {
        if (error) return res.send(error)
        else return res.send(`Successfully created new project!`)
    })
})

router.get('/projects/:userId', (req, res) => {

    const { userId } = req.params;

    const SELECT_PROJECTS_QUERY = `SELECT * FROM kanban.user_project
    LEFT JOIN kanban.projects
    ON kanban.projects.ProjectId = kanban.user_project.ProjectId
    where UserId = '${userId}'`

    connection.query(SELECT_PROJECTS_QUERY, (err, result) => {
        if (err) return res.send(err); 
        else return res.json({result})
    })

});

// POST REQUEST TO USER-PROJECT TABLE
router.post('/projects/join', (req, res) => {
            
    const { UserId, ProjectId } = req.body;
    const TEST_PROJECT_QUERY = `SELECT * FROM projects WHERE UserId = '${userId}'`;

    const INSERT_PROJECT_USER_QUERY = `INSERT INTO user_project (UserId, ProjectId) VALUES ('${UserId}', '${ProjectId}')`;

    connection.query(INSERT_PROJECT_USER_QUERY, (error, results) => {
        if (error) return res.send(error)
        else return res.send(`Added User-Project relation!`)        
    });
})

router.get('/tickets/:projectId', (req, res) => {
    
    const { projectId } = req.params;
    const SELECT_TICKETS_QUERY = `SELECT * FROM tickets WHERE ProjectId = '${projectId}'`;

    connection.query(SELECT_TICKETS_QUERY, (error, results) => {
        if (error) return res.send(error)
        else return res.json({results})
    });
})

router.put('/tickets', (req, res) => {

    const { TicketId, Status } = req.body;
    const UPDATE_TICKET_QUERY =  `UPDATE tickets SET Status = '${Status}' WHERE TicketId = '${TicketId}'`;

    connection.query(UPDATE_TICKET_QUERY, (error, response) => {
        if (error) return res.send(error)
        else return res.send('updated ticket!') 
    })
})

router.post('/tickets', (req, res) => {

    const  { ticketId, projectId, user, title, status, description, color } = req.body;
    const INSERT_TICKET_QUERY = `INSERT INTO tickets (TicketId, ProjectId, User, Title, Status, Description, Color) 
    VALUES ('${ticketId}', '${projectId}', '${user}', '${title}', '${status}', '${description}', '${color}')`

    connection.query(INSERT_TICKET_QUERY, (error, response) => {
        if (error) return res.send(error)
        else return res.send('t was a good job!')  
    });
})

module.exports = router