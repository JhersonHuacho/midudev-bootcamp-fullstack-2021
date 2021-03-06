const http = require('http');

let notes = [
  {
    'id': 1,
    'content': 'HTML is easy',
    'date': '2019-05-30T17:30:31.098Z',
    'important': true
  },
  {
    'id': 2,
    'content': 'Browser can execute only JavaScript',
    'date': '2019-05-30T18:39:34.091Z',
    'important': false
  },
  {
    'id': 3,
    'content': 'GET and POST are the most important methods of HTTP protocol',
    'date': '2019-05-30T19:20:14.298Z',
    'important': true
  },
  {
    'content': 'Javascript is functional',
    'date': '2021-11-10T20:28:27.911Z',
    'important': false,
    'id': 4
  },
  {
    'content': 'Javascript is functional',
    'date': '2021-11-10T20:28:27.911Z',
    'important': false,
    'id': 5
  },
  {
    'content': 'huacho',
    'date': '2021-11-10T20:32:56.491Z',
    'important': false,
    'id': 6
  }
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);



