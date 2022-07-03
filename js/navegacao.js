const navButton = document.querySelector('.button__nav');
const navBar = document.querySelector('.navigation');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('button__close');
    navBar.classList.toggle('navigation-hide');
})
