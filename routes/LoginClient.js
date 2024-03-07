const socket = io();

const submitButton = document.getElementById('submit');
const emailInput= document.getElementById('email')
const passwordInput = document.getElementById('password')

const submit = (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const page= "login"
  const data= {email,password, page}
  socket.emit('LoginData', data, () => {
  });
};

submitButton.addEventListener('click', submit);

socket.on('LoginResponse', data => {
  if(data.Found){
    if(data.CorrectPassword){
      alert("Sucessfully logged in")
    }
    else{
      alert("Incorrect password")
    }
  }
  else{
    alert("User not found, go to Signup Page")
  }
});

socket.on('setCookie', cookies => {
  // console.log(cookies);
  // Set email and password as cookies
  document.cookie = `email=${cookies.email}; max-age=500; path=/;`;
  document.cookie = `password=${cookies.password}; max-age=500; path=/;`;
});

socket.on('loggedIn', data => {
  console.log(data);
})

socket.on('logged off', msg => {
  const child = document.createElement('p');
  const parent = document.getElementById('app');
  child.innerText = msg;
  parent.appendChild(child);
  console.log(msg);
});
