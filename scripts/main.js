window.onload = () => {
    let body = document.querySelector(`body`);
    let menuActivate = document.getElementById(`menu`); // selects the menu button
    let menu = document.querySelector(`nav`);
    let modalActivate = document.getElementById(`modal`); // selects the modal button
    let modalSpace = document.querySelectorAll(`div`)[0];

    // the below function activates the menu when the button is clicked
    menuActivate.addEventListener(`click`, () => {
        if (!menu.classList.contains(`hidden`)) {
            menu.classList.add(`hidden`);
        }else{
            menu.classList.remove(`hidden`);
        }
    });

    // This activates the modal when the button is clicked on
    modalActivate.addEventListener(`click`, () => {
        if (modalSpace.classList.contains(`hidden`)) {
            modalSpace.classList.remove(`hidden`);
            body.classList.add(`no-scroll`);
        }
    });
    // This deactivates the modal when the user clicks outside the content panel
    modalSpace.addEventListener(`click`, () => {
        if (!modalSpace.classList.contains(`hidden`)) {
            modalSpace.classList.add(`hidden`);
            body.classList.remove(`no-scroll`);
        }
    });
};
