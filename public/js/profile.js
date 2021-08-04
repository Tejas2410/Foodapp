let reset = document.getElementById('reset');
let mail = document.querySelector('.mail').innerText;
let note = document.getElementById('note');
console.log(mail)
reset.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hlllo');
    let obj = {
        "email": mail
    }
    axios.post('/api/user/forgetPassword', obj).then((res) => {
        console.log(res)
        note.style.display = 'block';

    })
})