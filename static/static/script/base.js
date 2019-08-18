// adds responsive to nav bar when icon is clicked
// & reomves when its clicked again
document.querySelector('a.icon').addEventListener('click', () => {
  let navUl = document.querySelector('#nav');
  if(navUl.className === 'nav') {
    navUl.className += ' responsive';
  } else {
    navUl.className = 'nav';
  }
});
