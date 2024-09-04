require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts/', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    }); 
//     .then(() => {
//         console.log('Connected to the database');

//         // Check if running locally and start listening
//         if (process.env.NODE_ENV !== 'production') {
//             const port = process.env.PORT || 4000;
//             app.listen(port, () => {
//                 console.log('Server running on port', port);
//             });
//         }
//     })
//     .catch((error) => {
//         console.error('Database connection error:', error);
//     });


// module.exports = app;  //new