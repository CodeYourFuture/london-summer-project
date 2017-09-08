const express = require("express");
const app = express();
const fs = require('fs');
const exphbs = require('express-handlebars');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');



app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/about', function(req, res){
  res.redirect('/');
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Nabil Wardeh',
  });
});

app.get('/github', function(req, res){
  fetch("https://api.github.com/users/nabilwardeh/repos", {
    method: 'GET',
    headers: {"Content-Type": "application/json",
              "accept": "application/vnd.github.mercy-preview+json"}
  }).then(promissRes => {
    return promissRes.json();
  }).then( data => {
      res.render('github', {
        title: 'Nabil Wardeh',
        data: data,
        helpers: {
          trimString: function(passedString, startstring, endstring) {
            passedString = passedString || 'No discription';
            return passedString.substring( startstring, endstring );
          },
          concatString: function(){
            return Array.from(arguments).slice(0, -1).join('');
          }
        }
      });
    }).catch(error => {
    console.log(error);
    res.render('github', {
      title: 'Nabil Wardeh'
    });
  });
});

app.get('/readme', function(req, res){
  console.log(req.query.url);
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Nabil Wardeh',
  });
});

app.get('/experience', function(req, res){
  res.render('experience', {
    title: 'Nabil Wardeh',
  });
});

app.post('/contact', function(req, res){
  if (req.body) {
    readFile(__dirname + '/data/messages.json')
      .then(data => {
        let currentmessages = JSON.parse(data);
        currentmessages[new Date().getTime()] = req.body;
        return writeFile(__dirname + '/data/messages.json', JSON.stringify(currentmessages, null, '\t'));
      })
      .then(() => res.end(JSON.stringify({message: 'OK'})))
      .catch(error => console.log(error));
  }
});

app.use(express.static("public", {'extensions': ['html']}));

const port = process.env.PORT || 3000;

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

app.listen(port, function () {
  console.log("Server is listening on port " + port + ".");
});


