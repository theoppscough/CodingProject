//const app = express();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json()) // parse incoming JSON requests

// Routes
app.use('/api/users', userRoutes);

//Server Listening
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

