const express = require('express');
const bodyParser = require('body-parser');
const analyzeRouter = require('./routes/analyze');

const app = express();
const port = 3000;

// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/analyze', analyzeRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
