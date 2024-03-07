const socketio = require('socket.io');
const UserCollection = require('./db/mongo');

function initializeSocket(server) {
    const io = socketio(server, {
        cookie: {
            name: "Socket-id",
            path: "/",
            httpOnly: true,
            sameSite: "lax"
        }
    });

    io.on('connection', (socket) => {
        console.log('user id connected: ' + socket.id);

        socket.on('LoginData', async (data) => {
            try {
                const UserFound = await UserCollection.findOne({ email: data.email });
                if (UserFound) {
                    data.Found = true;
                    if (data.password === UserFound.password) {
                        data.CorrectPassword = true;
                        io.emit('loggedIn',{name: UserFound.name})
                        io.emit('setCookie', { email: data.email, password: data.password });
                    } else {
                        data.CorrectPassword = false;
                    }
                } else {
                    data.Found = false;
                }
            } catch (err) {
                console.log("Login Error", err);
            }
            // console.log(data);
            io.emit('LoginResponse', data);
        });

        socket.on('SignupData', async (data) => {
            data.UserFound = false;
            try {
                const UserFound = await UserCollection.findOne({ email: data.email });
                if (UserFound) {
                    data.UserFound = true;
                } else {
                    const newUser = await UserCollection.create({ email: data.email, password: data.password, name: data.name });
                    data.UserAdded = true;
                }
            } catch (err) {
                console.log("Signup Error", err);
            }
            console.log(data);
            io.emit('SignupResponse', data);
        });

        socket.on('disconnect', () => {
            io.broadcast.emit('logged off', `user: ${socket.id} disconnected`);
        });
    });
}

module.exports = initializeSocket;
