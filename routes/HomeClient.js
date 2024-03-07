const socket = io();

socket.on('loggedIn', (data) => {
    console.log(data)
})
