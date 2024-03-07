const socket = io();

const nameInput = document.getElementById('name');
const submitButton = document.getElementById('submit');
const emailInput= document.getElementById('email')
const passwordInput = document.getElementById('password')


const submit = (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const name= nameInput.value;
  const page= "signup"
  const data= {name,email,password,page}
  socket.emit('SignupData', data, () => {
    console.log(data);
  });
};

submitButton.addEventListener('click', submit);

socket.on('SignupResponse', data => {
  if(data.UserFound){
    alert("User already exists, go to Login page")
  }
  else if(data.UserAdded){
    alert("User added successfully");
  }
});

socket.on('logged off', msg => {
  const child = document.createElement('p');
  const parent = document.getElementById('app');
  child.innerText = msg;
  parent.appendChild(child);
});