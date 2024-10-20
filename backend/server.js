

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://saiswaroopnakka:nakkasaiswaroop@cluster0.wl3xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/rules', ruleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
