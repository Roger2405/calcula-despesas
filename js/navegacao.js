const navButton = document.querySelector('.button__nav');
const navBar = document.querySelector('.navigation');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('button__nav-active');
    navButton.classList.toggle('button__nav-effects');
    navBar.classList.toggle('navigation-hide');
})
