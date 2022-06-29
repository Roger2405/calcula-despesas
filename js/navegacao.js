const botaoNav = document.querySelector('.button__nav');
botaoNav.addEventListener('click', () => {
    botaoNav.classList.toggle('button__nav-active');
    botaoNav.classList.toggle('button__nav-effects');
})