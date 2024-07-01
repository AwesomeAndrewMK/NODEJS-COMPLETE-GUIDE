const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>HW-1</title></heal>');
        res.write('<h1>Hello User!</h1>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Ok</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users</title></heal>');
        res.write('<ul><li>User 1</li></ul>');
        res.write('<ul><li>User 2</li></ul>');
        res.write('<ul><li>User 3</li></ul>');
        res.write('<ul><li>User 4</li></ul>');
        res.write('</html>');
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });
        
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1];
            console.log(userName);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    };
});

server.listen(3000);