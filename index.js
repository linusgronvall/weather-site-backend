const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

// CORS middleware
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 minutes
  max: 1000,
});

app.use(limiter);
app.set('trust proxy', 1);

app.use('/api', require('./routes/weather'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
