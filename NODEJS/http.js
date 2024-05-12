const http = require("http")
const fileSystem = require("fs")


const url = "http://jsonplaceholder.typicode.com/posts/10"

// http.get(url, (response) => {
//   let data = ''

//   response.on('data', (chunk) => {
//     data += chunk
//   });

//   response.on('end', () => {
//     console.log(JSON.parse(data))
//   });
// }).on('error', (error) => {
//   console.log('Error:' + error.message)
// })

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `https://${req.headers.host}`)

  const routes = {
    '/':'<h1>Home Page</h1><p>Hello Welcome All to My Page</p>',
    '/about':'<h1>About Us</h1><p>We are a Dedicated Team...</p>',
    '/contact':'<h1>Contact Us</h1><p>You Can reach out to Us Via...</p>',
    '/404':'<h1>Not Found</h1><p>The page you are looking for does not exist...</p>',
  }

  if (routes[url.pathname]) {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    res.end(routes[url.pathname])
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html'})
    res.end(routes[url.pathname])
  }
})


const server2 = http.createServer((request, response) => {
  
  if (request.method === 'GET') {
    response.writeHead(200, {'Content-Type':'text/plain'})
    response.end('Data retrieved Successfully..!!!')
    console.log('Data Fetched Successfully...')
  }

  else if (request.method === 'POST' && request.url=='/home') {

    // let data = ''

    // request.on('data', (chunk) => {
    //   data += chunk.toString()
    // })

    // request.on('end', () => {
    //   const parsedData = JSON.parse(data)

    //   const dummyData = {
    //     name:'Sandeep',
    //     age:24,
    //     email:'sandeep@gmail.com'
    //   }

    //   response.writeHead(200, {'Content-Type':'text/plain'})
    //   response.write(dummyData)
    //   response.end()
    //   console.log('Data Posted Successfully')
      
    // })
    response.write(request.body.test)
  } 

  else if (request.method === 'PUT') {
    let body = ''

    request.on('data', (chunk) => {
      data += chunk.toString()
    })

    request.on('end', () => {
      const parsedData = JSON.parse(data)

      const updatedData = {
        name:'Updted Name',
        age:'Updated Age',
        email:'updated@gmail.com'
      }

      response.writeHead(200, {'Content-Type':'text/plain'})
      response.end(updatedData)
    })
  }

  else if (req.method === 'DELETE') {

    const deletedData = {
      message: 'Data deleted successfully'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(deletedData));
  }
})

http.get(url, (response) => {
  let data = ''

  response.on('data', (chunk) => {
    data += chunk
  });

  response.on('end', () => {
    console.log(JSON.parse(data))
  });
}).on('error', (error) => {
  console.log('Error:' + error.message)
})

server.listen(3000, () => {
  console.log('Echo server listening on port 3000');
});

