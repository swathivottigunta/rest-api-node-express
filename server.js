const express = require('express');

const PORT = process.env.PORT || 4000;

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/ping', require('./routes/api/ping'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
