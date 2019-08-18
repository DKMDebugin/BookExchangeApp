"use strict";

window.onload = function() {
  let spinner = document.querySelector('.body .spinner');

  // set timer to create a loading effect
  setTimeout(() => {
    createRequestList();
  }, 1500);

  // creates the book request list & append it to 'div.body'
  function createRequestList() {
    // Start process
    buildHtml();

    // fetches for list of created users
    function getListOfData(url) {
      return fetch(url).then( response => response.text())
      .then(text => JSON.parse(text))
      .catch( e => {console.log(e.message)});
    }

    // get users list, create a new prop 'req_count'
    // for eash user & incrementally assigns the 'request_count'
    // for each book a user owns
    function getBookExchangeReqCount() {
      let users = getListOfData('/api/users/');

      users.then(users => {
        // users.forEach(user => {user['req_count'] = 0});
        users.forEach(user => {
          user['req_count'] = 0;
          user['books'].forEach(book => {
            getListOfData(book).then(book => {
              user['req_count'] += Number(book['request_count']);
            }, e => e.message);
          });
        });
      }).catch(e => {console.log(e.message)});
      return users;
    }

    // build users page
    function buildHtml() {
      let container = document.createElement('div');
      container.className = 'user-list';
      getBookExchangeReqCount().then(users => {
        users.forEach(user => {
          container.appendChild(userDiv(user));
        });
      }, e => {console.log(e.message)});

      spinner.style.display = 'none';
      document.querySelector('.body').appendChild(container);
    }

    // create & build a single user div
    function userDiv(user = {}) {
      let div = document.createElement('div');
      let username = document.createElement('h3')
      let book_count = document.createElement('small');
      let req_count = document.createElement('small');

      div.className = 'user-detail';
      username.textContent = `Username: ${user['username']}`;
      book_count.textContent = `Book Count: ${user['books'].length}`;
      req_count.textContent = `Request Count: ${user['req_count']}`;


      div.appendChild(username);
      div.appendChild(book_count);
      div.appendChild(req_count);

      return div;
    }
  }
};
