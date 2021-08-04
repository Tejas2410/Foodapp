
let note = document.getElementById('note');
let btn = document.getElementById('btn');
console.log('sbaifwlfw')
if (btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let obj = {
            'email': email
        }
        console.log('lbwfbw')
        axios.post('/api/user/forgetPassword', obj).then((res) => {
            note.style.display = 'block';
        }).catch((err) => {
            alert(err.response.data.status);
            console.log(err.response);
            location.assign('/');
        })
    })
}