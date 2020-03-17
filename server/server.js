const express = require('express');
const app = express();
const cors = require('cors');

const projectsRouter = require ('./routes/projectsRoutes');

app.use(cors());
app.use(express.json());

app.use('/project', projectsRouter);

app.listen(8080, () => {
  console.log('server running on 8080');
});