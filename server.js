const express = require('express');
const { authenticateUser } = require('./src/middlewares');
const projectRoutes = require('./src/routes/projects');
const app = express();


app.use(express.json());


//auth routes (login,signup etc)

app.use(authenticateUser);  //to authenticate the user on every request
app.use('/projects', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});



app.listen(3000, () => console.log('Server started on port 3000'));