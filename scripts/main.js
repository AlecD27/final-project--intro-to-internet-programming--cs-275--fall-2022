window.onload = () => {
    let menuActivate = document.getElementById(`menu`);
    let menu = document.querySelector(`nav`);
    let width = window.innerWidth;
    // let modalActivate = document.getElementById(`modal`); // selecting my 2 buttons

    // the below functions enable user interaction
    menuActivate.addEventListener(`click`, () => {
        if (!menu.classList.contains(`hidden`)) {
            menu.classList.add(`hidden`);
        }else{
            menu.classList.remove(`hidden`);
        }
    });

    // modalActivate.addEventListener(`click`, () => {

    // });
};
