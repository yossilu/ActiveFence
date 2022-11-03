const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/rate-limiter', require('./routes/rateLimiterPlans/rateLimiterPlans'));

app.listen(port, () => console.log(`Server started on port ${port}`));