const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a route for a home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); //Middleware to parse JSON bodies

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

app.get('/about', (req, res) => {
    res.send('About us');
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});