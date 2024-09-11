// // require('dotenv').config();

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors'); // Import cors
// // const workoutRoutes = require('./routes/workouts');
// // const userRoutes = require('./routes/user');

// // // express app
// // const app = express();

// // // middleware
// // app.use(express.json());

// // // Use CORS middleware
// // app.use(cors({
// //     origin: 'http://localhost:3000', // Replace with your frontend URL
// //     methods: 'GET,POST,PUT,DELETE',
// //     allowedHeaders: 'Content-Type',
// // }));

// // app.use((req, res, next) => {
// //     console.log(req.path, req.method);
// //     next();
// // });

// // // routes
// // app.use('/api/workouts/', workoutRoutes);
// // app.use('/api/user', userRoutes);

// // // connect to db
// // mongoose.connect(process.env.MONGO_URI)
//     // .then(() => {
//     //     // listen for requests
//     //     app.listen(process.env.PORT, () => {
//     //         console.log('connected to db & listening on port', process.env.PORT);
//     //     });
//     // })
//     // .catch((error) => {
//     //     console.log(error);
//     // }); 
    
// //     .then(() => {
// //         console.log('Connected to the database');

// //         // Check if running locally and start listening
// //         if (process.env.NODE_ENV !== 'production') {
// //             const port = process.env.PORT || 4000;
// //             app.listen(port, () => {
// //                 console.log('Server running on port', port);
// //             });
// //         }
// //     })
// //     .catch((error) => {
// //         console.error('Database connection error:', error);
// //     });


// // module.exports = app;  //new


// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); 
// const workoutRoutes = require('./routes/workouts');
// const userRoutes = require('./routes/user');

// // express app
// const app = express();

// // middleware
// app.use(express.json());

// // Use CORS middleware
// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type',
// }));

// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

// // routes
// app.use('/api/workouts/', workoutRoutes);
// app.use('/api/user', userRoutes);

// // connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('Connected to the database');

//         // Start the server
//         const PORT = process.env.PORT || 4000;
//         const HOST = '0.0.0.0'; // Bind to all network interfaces

//         app.listen(PORT, HOST, () => {
//             console.log(`Server running on http://${HOST}:${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('Database connection error:', error);
//     });

    

// module.exports = app;

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

// Middleware
app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://workout-app-frontend-spn5.onrender.com' // Frontend URL in production
      : 'http://localhost:3000', // Frontend URL for local development
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Workout App API!');
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');

    // Start server and bind to 0.0.0.0 to accept connections from any IP
    const port = process.env.PORT || 4000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


module.exports = app;