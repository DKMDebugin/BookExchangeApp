'use strict';

window.onload = function () {
  // get neccessary html element reference
  // let formDiv = document.querySelector('.form-div');
  let form = document.querySelector('.form-div .form');
  // let h3 = document.querySelector('.form-div h3');
  let spinners = document.querySelectorAll('.spinner');

  // start process
  let url = '/api/books/';
  buildHtml(url);

  // When form is submitted, create data from form inputs
  // then post to the form's action
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let title = document.querySelector('input[name=title]').value;
    let desc = document.querySelector('input[name=description]').value;
    if (title && desc ) {
      let data = {
        title: title,
        description: desc,
      };
      postData(this.action, data);
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
  function buildHtml(){
    let books = getListOfBooks(url);
    books.then(books => {
      let bookList = document.querySelector('.books-list')
      let table = createTable();
      let title = createInput('title');
      let desc = createInput('description');
      let submit = document.createElement('button');
      let h3 = document.createElement('h3');
      let h3Form = document.createElement('h3');

      submit.type = 'submit';
      submit.textContent = 'Submit';
      h3.textContent = 'Books Available For Trade';
      h3Form.textContent = 'Add New Book';

      books.forEach(book => {
        table.appendChild(buildTableData(book));
      });

      setTimeout(() => {
        spinners[1].style.display = 'none';
        form.appendChild(h3Form);
        form.appendChild(title);
        form.appendChild(desc);
        form.appendChild(submit);
        setTimeout(() => {
          spinners[0].style.display = 'none';
          bookList.appendChild(h3);
          bookList.appendChild(table);
        }, 1000);
      }, 2000);
    }, error => {
      console.log(error.message);
    });
  }

  // create input element & add necesary attributes
  function createInput(name = '') {
    let input = document.createElement('input');
    input.type = 'text';
    input.value = name.replace(name[0], name[0].toUpperCase());
    input.name = name;
    return input;
  }

  // create table  and add headings
  function createTable() {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let user = document.createElement('th');
    let title = document.createElement('th');
    let desc = document.createElement('th');

    // add text content to headings then append to table
    user.textContent = 'Owner';
    title.textContent = 'Title';
    desc.textContent = 'Description';
    tr.appendChild(user);
    tr.appendChild(title);
    tr.appendChild(desc);

    table.appendChild(tr);

    return table;
  }

  // Create & build table row
  function buildTableData(book = {}) {
    let tr = document.createElement('tr');
    let title = document.createElement('td');
    let desc = document.createElement('td');
    let user = document.createElement('td');

    // add book details to td
    title.textContent = book['title'];
    desc.textContent = book['description'];
    user.textContent = book['user'];

    // attach td to tr
    tr.appendChild(user);
    tr.appendChild(title);
    tr.appendChild(desc);

    return tr;
  }

}
