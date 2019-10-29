const express = require('express');
const connectDB = require('./config/db');

const app = express();
var cors = require('cors');
var corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST, DELETE, OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    exposedHeaders: 'x-auth-token'
  };

// Connect DB
connectDB();

// Init middleware
app.use(express.json({extended: false}));
app.get('/', (req, res) => res.json({msg: 'Welcome to the ContactKeeper API...'}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Add corsOptions to express app
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));