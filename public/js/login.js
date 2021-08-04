
var stripe = Stripe('pk_test_uTkhHj3JV7PYr8Y0x8Zpdxm800Q25TpMVF');
// stripe.redirectToCheckout({
//   // Make the id field from the Checkout Session creation API response
//   // available to this file, so you can provide it as parameter here
//   // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//   sessionId: '{{CHECKOUT_SESSION_ID}}'
// }).then(function (result) {
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `result.error.message`.
// });
const bookPlanbtns = document.querySelectorAll('.bookPlan');
// console.log("jvgajkclaniuachka")
if (bookPlanbtns) {

  for (let i = 0; i < bookPlanbtns.length; i++) {
    // console.log(planId);
    bookPlanbtns[i].addEventListener('click', e => {
      e.preventDefault();
      console.log(e.target.textContent)
      e.target.textContent = 'Processing ...';

      const planId = bookPlanbtns[i].getAttribute('data-plan-id');
      console.log(planId);
      bookPlan(planId);
    })
  }
}
const bookPlan = async (planId) => {

  try {
    console.log(window.location);
    // let url = window.location.href.split("/")
    const session = await axios.get(`/api/bookings/checkout-session/${planId}`)
    console.log(session);
    stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  }
  catch (err) {
    console.log(err);
  }
}
const login = async (email, password) => {

  const obj = {
    "email": email,
    "password": password
  }
  console.log("hello")
  axios.post('api/user/signin', obj).then((res) => {
    if (res.data.status == "Logged In") {
      alert("User logged in");
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)
    }
    else {
      alert("Incorrect Creds");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000)
    }
  })
}
const register = document.getElementById('Register');
if (register) {
  register.addEventListener('click', (e) => {
    e.preventDefault();
    location.assign('/register');
  })
}
const logout = async () => {
  axios.get('/api/user/logout').then((res) => {
    console.log('dsivbsv')
    console.log(res)
    if (res.data == 'User Logged Out') {
      location.assign('/');
    }
  })
}
const loginform = document.querySelector('.login-form');
if (loginform) {
  loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log(email);
    const password = document.getElementById('password').value;
    login(email, password);
  })
}
const forgot = document.getElementById('forgot');
if (forgot) {
  forgot.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = '/forgetPassword';
  })
}
const logoutbtn = document.querySelectorAll('.logoutbtn');
if (logoutbtn) {
  console.log('button exists');

  if (logoutbtn[0]) {
    console.log('button exists 1');
    logoutbtn[0].addEventListener('click', (e) => {
      console.log('logout')
      e.preventDefault();
      logout();
    })
  }

  if (logoutbtn[1]) {
    console.log('button exists 2');
    logoutbtn[1].addEventListener('click', (e) => {
      console.log('logout')
      e.preventDefault();
      logout();
    })
  }
}