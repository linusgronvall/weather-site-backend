const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

// CORS middleware
app.use(express.json()); // New
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 minutes
  max: 1000,
});

app.use(limiter);
app.set('trust proxy', 1);

app.use('/api', require('./routes/current_weather'));
app.use('/api', require('./routes/forecast_weather'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
