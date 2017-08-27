var request = new XMLHttpRequest();         //creating a request object

  request.onreadystatechange = function() {
    if (request.readyState === 4) {  // check if a response was sent back
      if (request.status === 200) {     // check if request was successful
        //console.log("request.responseText");
        var a = JSON.parse(request.response);
        var divElm = document.getElementById('apiEle');


        for(var i=0; i<a.length; i++){
          var jastName = (a[i].description);

          var headerElm= document.createElement("p");
          var content =  document.createTextNode(jastName);
          headerElm.appendChild(content);
          divElm.appendChild(headerElm);
        };

      } else {
        console.log('An error occurred during your request: ' +  request.status + '' + request.statusText);
      }
    }
  }
  var url = 'https://api.github.com/users/DidoVirus/repos';                                        //server location
  request.open('GET', url);                    // adding it to the request

// request.setRequestHeader('Accepts', 'text/plain'); //header info
request.send();


// function showHide() {
//   var x = document.getElementById('my-work');
//   if (x.style.display ==='none' ) {
//         x.style.display = 'block';
//     } else {
//         x.style.display = 'none';
//     }
// }

// document.onscroll = function() {myFunction()};
//
// function myFunction() {
//     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//         document.getElementById("myP").className = "test";
//     } else {
//         document.getElementById("myP").className = "";
//     }
// }
