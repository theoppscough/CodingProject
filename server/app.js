//const app = express();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();
app.use(express.json()) // parse incoming JSON requests

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(eer => console.log(err));

// Routes
app.use('/api/users', userRoutes);

//Server Listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log('Server running on port ${PORT}');
});

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

