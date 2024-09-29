const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2)); // Parse port number

const port = args.port || 3000; // Default to port 3000 if no port is provided

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        serveFile(res, 'home.html', 'text/html');
    } else if (req.url === '/project') {
        serveFile(res, 'project.html', 'text/html');
    } else if (req.url === '/registration') {
        serveFile(res, 'registration.html', 'text/html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

function serveFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
