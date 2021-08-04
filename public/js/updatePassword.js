let form = document.getElementById('updateForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let currPass = document.getElementById('currPass').value;
        let newPass = document.getElementById('newPass').value;
        let confirmPass = document.getElementById('confirmPass').value;
        let obj = {
            'currPass': currPass,
            'newPass': newPass,
            'confirmPass': confirmPass
        }
        console.log('****************')
        axios.patch('/api/user/updatePassword', obj).then((res) => {
            console.log('****************')
            console.log(res)
            location.assign('/');

        }).catch((err) => {
            console.log(err);
        })
    })
}