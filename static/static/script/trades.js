"use strict";

window.onload = function() {
  let spinners = document.querySelector('.body .spinner');

  // set timer to create a loading effect
  setTimeout(() => {
    createRequestList();
  }, 1500);

  // creates the book request list & append it to 'div.body'
  function createRequestList() {
    // Start process
    getListOfRequets();

    // fetches for only book trades which are in pair
    function getListOfRequets() {
      fetch('/api/trades/').then( response => response.json()).then(json => {
        return JSON.parse(JSON.stringify(json)).filter(request => request.traded);
      }).then(requests => {
        GetBookPair(requests);
      }).catch( e => {console.log(e.message)});
    }

    // fetches each book in a pair & combine into an array.
    // Then combine all into an array
    function GetBookPair(requests) {
      let arr = [];
      let bookPairsArr = requests.map(request => {
        return [getBook(request['book1']), getBook(request['book2'])];
      });
      buildHtml(bookPairsArr);
    }

    // fetches a single book
    function getBook(url) {
      return fetch(url).then((book) => book.json()).then(json => {
        return JSON.parse(JSON.stringify(json));
      }).catch(e => {
        console.log(e.message);
      });
    }

    // build the boom pair container & add to body
    function buildHtml(bookPairsArr) {
      let body = document.querySelector('.body');
      let reqListContainer = document.createElement('div');
      let h3 = document.createElement('h3');

      reqListContainer.id = 'all-requests';
      h3.textContent = 'List of Book Trades';
      reqListContainer.appendChild(h3);

      bookPairsArr.forEach(bookPair => {
        let container = document.createElement('div');
        container.appendChild(bookContainer(bookPair[0], 'bookRight'));
        container.appendChild(bookContainer(bookPair[1], 'bookLeft'));
        container.className = 'container';
        spinners.style.display = 'none';
        reqListContainer.appendChild(container);
      });

      body.appendChild(reqListContainer);
    }

    // build container for a single book
    function bookContainer(book, className) {
      let div = document.createElement('div');
      let pHeading = document.createElement('p');
      let p = document.createElement('p');
      let p1 = document.createElement('p');
      book.then(book => {
        pHeading.textContent = 'Name: ' + book['title'];
        p.textContent = 'Description: ' + book['description'];
        p1.textContent = 'Owner: ' + book['user'];
      }, e => {console.log});

      div.className = className;

      div.appendChild(pHeading);
      div.appendChild(p);
      div.appendChild(p1);

      return div;
    }

  }
};
