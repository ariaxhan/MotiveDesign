const express = require('express');
const bodyParser = require('body-parser');
const analyzeRoute = require('./routes/analyze');

const app = express();

app.use(bodyParser.json());
app.use('/api/analyze', analyzeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
