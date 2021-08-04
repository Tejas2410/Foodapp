let btn = document.querySelector('.form');
console.log('HElo')

if (btn) {
    btn.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("hello")
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let conpass = document.getElementById('conpass').value;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let obj = {
            "username": username,
            "email": email,
            "password": password,
            "confirmPassword": conpass,
            "name": name,
            "phone": phone

        }
        axios.post('api/user/signup', obj).then((res) => {
            console.log(res)
            if (res.data.status == 'Registration Successfull') {
                alert('Registered');
                location.assign('/');
            }
        }).catch((err) => {
            alert(err.response.data.status);
            console.log(err.response);
            location.assign('/');
        })

    })
}