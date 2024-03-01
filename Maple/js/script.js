const nickForm = document.querySelector('#nickForm');
const myInfo = document.querySelector('#info-container');
const infoBtn = document.querySelector('.info-button');
const changeNick = document.querySelector('#nick-change');

infoBtn.addEventListener('click', () => {
    myInfo.classList.toggle('hidden');
});

const input = document.querySelector('#nickForm input');

changeNick.addEventListener('click', () => {
    nickForm.classList.toggle('hidden');
    input.focus();
});

const statusName = document.querySelector('.nickname');

function changeStatusName(newNick) {
    console.log(statusName);
    statusName.innerText = ` ${newNick}`;
}

function onNickChange(event) {
    let myNick = document.querySelector('#info-nickname');
    event.preventDefault();
    const newNick = input.value;
    input.value = '';
    const newName = document.createElement('span');
    newName.id = 'info-nickname';
    newName.innerText = `${newNick} `;
    myInfo.removeChild(myNick);
    myInfo.insertBefore(newName, changeNick);
    changeStatusName(newNick);
}

nickForm.addEventListener('submit', onNickChange);
