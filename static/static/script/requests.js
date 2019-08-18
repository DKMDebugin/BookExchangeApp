"use strict";

window.onload = function() {
  let spinners = document.querySelectorAll('.body .spinner');

  // set timer to create a loading effect
  setTimeout(() => {
    bookCreationForm();
    setTimeout(() => {
      createRequestList();
    }, 500);
  }, 1500);

  // creates the book create form & append it to 'div.body'
  function bookCreationForm () {
    let form = document.querySelector('.form-div .form');
    let h3 = document.querySelector('.form-div h3');
    // let spinner = document.querySelector('.form-div .form .spinner');

    // start process
    let url = '/api/books/';
    buildHtml(url);

    // attach name attri to data when form is submitted
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let traded = document.querySelector('input[name=traded]').value;
      let book1 = document.querySelectorAll('select')[0].value;
      let book2 = document.querySelectorAll('select')[1].value;

      if (book1 != book2) {
        let data = {
          book1: `/api/books/${book1}/`,
          book2: `/api/books/${book2}/`,
          traded: traded,
        };
        postData(url='/api/trades/', data=data);
      }
    });

    // utitliy functions
    // get books
    function getListOfBooks(url = '') {
      return fetch(url).then(response => response.text())
      .then(books => {
        return JSON.parse(books);
      });
    }

    // build the home page
    function buildHtml() {
      let books = getListOfBooks(url);
      books.then(books => {
        let selectOne = createSelectInput(books, 'book1');
        let selectTwo = createSelectInput(books, 'book2');
        let submit = document.createElement('button');

        submit.type = 'submit';
        submit.textContent = 'Submit';

        spinners[0].style.display = 'none';
        h3.textContent = 'Make Exchange';
        form.appendChild(selectOne);
        form.appendChild(selectTwo);
        form.appendChild(submit);

      }, error => {
        console.log(error.message);
      });
    }

    // create select Input & add options
    function createSelectInput(books = [], name = '') {
      let select = document.createElement('select');
      select.name = name;
      books.forEach(book => {
        let option = document.createElement('option');
        option.value = book['id'];
        option.textContent = book['title'];
        select.appendChild(option);
      });
      return select;
    }

  }

  // creates the book request list & append it to 'div.body'
  function createRequestList() {
    // Start process
    getListOfRequets();

    // fetches for only book trades which are in pair
    function getListOfRequets() {
      fetch('/api/trades/').then( response => response.json()).then(json => {
        return JSON.parse(JSON.stringify(json)).filter(request => !request.traded);
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
      h3.textContent = 'List of Book Requests';
      reqListContainer.appendChild(h3);

      bookPairsArr.forEach(bookPair => {
        let container = document.createElement('div');
        container.appendChild(bookContainer(bookPair[0], 'bookRight'));
        container.appendChild(bookContainer(bookPair[1], 'bookLeft'));
        container.className = 'container';
        spinners[1].style.display = 'none';
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
