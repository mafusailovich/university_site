//открывание меню по клику
document.addEventListener('click', (event) => {
    if (event.target.closest('.burger-btn')){
        document.querySelector('.header-menu').classList.toggle('header-menu--active');
    } else {
        document.querySelector('.header-menu').classList.remove('header-menu--active');
    }
});
