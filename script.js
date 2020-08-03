const smModal = document.querySelector('sm-modal'),
    showSmModalButton = document.querySelector('.show-modal__button');

smModal.addEventListener('confirm', () => {
    console.log('Confirmed');
});

smModal.addEventListener('cancel', () => {
    console.log('Cancelled');
});

showSmModalButton.addEventListener('click', () => {
    smModal.open();
    console.log('Opened');
});