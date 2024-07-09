// server.js
const app = require('./app');
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
