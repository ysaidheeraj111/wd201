const express = require('express');
const path = require('path');
const minimist = require('minimist');

const app = express();
const PORT = minimist(process.argv.slice(2)).port || 3000; // Default port 3000

// Serve static files (like HTML, CSS, JS)
app.use(express.static('http-server'));

// Route for registration page
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



const http = require('http');
const fs = require('fs');
const minimist = require('minimist');

// Parse the command line arguments for the port number
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;  // Default port is 3000 if none is provided

http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('home.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading home.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/projects') {
        fs.readFile('project.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading project.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/registration') {
        fs.readFile('registration.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading registration.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
}).listen(port, () => {
    console.log(`Server running on port ${port}`);
});

