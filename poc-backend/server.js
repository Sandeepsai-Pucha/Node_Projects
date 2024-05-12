const http = require('http')
const fileSystem = require('fs')


const server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'text/html')

    let urlPath = './Views/';
    switch(request.url) {
        case '/':
            urlPath += 'index.html'
            response.statusCode = 200;
            break
        case '/about':
            urlPath += 'about.html'
            response.statusCode = 200;
            break 
        case '/about-us':
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break
        default:
            urlPath += 'notfound.html'
            response.statusCode = 404;
            break
    }

    fileSystem.readFile(urlPath, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.end(data)
        }
    })
})

server.listen(3000, 'localhost',  () => {
    console.log('Server Running on Port 3000')
})
