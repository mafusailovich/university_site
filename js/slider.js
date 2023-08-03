'use strict'

const sliderMenu = document.querySelector('.news__slider-switch');
const sliderElements = document.querySelectorAll('.news__slider-content');
const sliderSwitch = document.querySelectorAll('.news__slider-link');
const sliderLeft = document.querySelectorAll('.news__slider-turn')[0];
const sliderRight = document.querySelectorAll('.news__slider-turn')[1];

//функция вычисляет активный элемент
function searchActive(listElem) {
    for (let i=0; i < listElem.length; i++){
        if (listElem[i].classList.value.includes('--active')){
            return i;
        }
    }
    return false;
}

//синхронизация элементов контента и переключателя по переключателю
function syncSlider(contentEl, menuEl) {
    //находим активный элемент
    let menuElActive = searchActive(menuEl);
    //если номер активного элемента не равен номеру активного в контенте
    //то синхронизируем
    if (menuElActive != searchActive(contentEl)) {
        for (let i=0; i<contentEl.length;i++){
            if (i != menuElActive){
                contentEl[i].classList.remove('news__slider-content--active');
            } else {
                contentEl[i].classList.add('news__slider-content--active');
            }
        }
    }
}

//очистка списка
function cleanActives(listEl){
    for (let i of listEl){
        i.classList.remove('news__slider-link--active');
    }
}

//действия при взаимодействии с меню
//может быть две ситуации - нажатие на кружочек и нажатие на стрелку
sliderMenu.addEventListener('click', (event) => {

    //проверяем нажатие на одну из кнопок
    if (event.target.matches('.news__slider-link')) {

        //проверяем нажатие на кружок и в случае успеха меняем слайды
        //в противном случае будет означать, что была нажата кнопка влево или вправо
        if (!event.target.matches('.news__slider-turn')){
            cleanActives(sliderSwitch); //очищаем все активные
            event.target.classList.add('news__slider-link--active'); //устанавливаем активный тому, на который нажали
            syncSlider(sliderElements, sliderSwitch); //синхронизируем
        } else {
            //получаем элементы и очищаем список
            let menuElActive = searchActive(sliderSwitch);
            cleanActives(sliderSwitch);
            //вычисляем куда было нажато меняем элемент
            if (event.target == sliderLeft){
                if (0 < menuElActive && menuElActive < sliderSwitch.length-2){
                    sliderSwitch[menuElActive-1].classList.add('news__slider-link--active');
                } else {
                    sliderSwitch[sliderSwitch.length-3].classList.add('news__slider-link--active');
                }
            } else if (event.target == sliderRight){
                if (0 <= menuElActive && menuElActive < sliderSwitch.length-3){
                    sliderSwitch[menuElActive+1].classList.add('news__slider-link--active');
                } else {
                    sliderSwitch[0].classList.add('news__slider-link--active');
                }
            }
            syncSlider(sliderElements, sliderSwitch);//синхронизируем с контекстом
        }
    }
});
