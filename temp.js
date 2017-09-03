const fetch = require('node-fetch');

fetch("https://api.github.com/repos/nabilwardeh/Web-developer-project-london/readme", {
    method: 'GET',
    headers: {"Content-Type": "application/json",
              "accept": "application/vnd.github.raw+json"}
  }).then(res => {
    return res.text();
}).then( data => {
      console.log(data);
}).catch(error => console.log(error));
