const http = require("http"); 
const HOSTNAME = "localhost";
const PORT = 8000;
const fs = require("fs");



const server = http.createServer(requestHandler);
function requestHandler(req, res) {
  console.log('Request was made: ' + req.url);
  if (req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'content-type':'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }else if (req.url === '/contact'){
    res.writeHead(200, {'content-type':'text/html'});
    fs.createReadStream(__dirname + '/contact.html').pipe(res)
  } else if (req.url === '/api/info'){
    const info = [
        {name:'Joel',
        age:30,
        ['Job Description']:'Surveyor, GIS Developer/Analyst',
        },

        {name:'Chris',
        age:30,
        ['Job Description']:'Surveyor, GIS Developer/Analyst',
        }
    ]
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(info))
  } else{
    res.writeHead(404, {'content-type':'text/html'});
    fs.createReadStream(__dirname + '/404.html').pipe(res)
  }
}

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server started successfully at http://${HOSTNAME}:${PORT}/`);
});