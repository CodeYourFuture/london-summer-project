const marked = require('marked');

window.onload = function() {
  activateMenu();

  activatePopupClose();

  listenForReadmeClick();

  listenForPostForm();
}

function activateMenu() {
  let nav = document.querySelector('.top-nav')
  let icon = document.querySelector('.nav-icon-link');

  icon.addEventListener('click', e => {
    nav.classList.toggle('expand-top-nav');
  });
}

function listenForReadmeClick() {
  let readmeLinks = Array.from(document.querySelectorAll('.readme-link'));
  readmeLinks.forEach(function(readmeLink) {readmeLink.addEventListener('click', getRepoReadme)});
}

function activatePopupClose () {
  let readmePopupButton = document.querySelector('.readme-popup-button')
  if (readmePopupButton) {
    readmePopupButton.addEventListener('click', function(e){
      e.preventDefault();
      e.target.parentNode.classList.add('hide-element');
    });
  }
}

function listenForPostForm(){
  let form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let phone = document.getElementById('phone').value;
      let message = document.getElementById('message').value;

      let contactUrl = 'http://localhost:3000/contact';
      let postBody = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };
      postForm(contactUrl, postBody, form);
    });
  }
}

function getRepoReadme(e) {
  e.preventDefault();
  let readmeApiLink;

  readmeApiLink = e.target.getAttribute('data-github-get');
  fetch(readmeApiLink, {
    method: 'GET',
    headers: {"Content-Type": "application/json",
              "accept": "application/vnd.github.raw+json"}
  }).then(res => {
    if (!res.ok) {
      throw Error('file not found');
    }
    return res.text();
  }).then( data => {
        showReadme(data);
  }).catch(error => {
    showReadme('# Failed to load content ' + error.message);
  });
}

function showReadme (data) {
  let readmeContentDiv = document.querySelector('.readme-popup-content');
  readmeContentDiv.innerHTML = marked(data);
  readmeContentDiv.parentNode.classList.remove('hide-element');
}

function postForm(url, body, form) {
  fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then(res => {
    res.json().then( data => {
      if (data.message === 'OK') {
        document.querySelector('.form-submition-feedback').textContent = 'Thanks You! I will be in touch shorty!';
        form.classList.add('hide-element');
      }
    });
  }).catch(error => console.log(error));
}

// 0207 684 1372