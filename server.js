const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const initializeSocket = require('./socket');

const staticDir = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(staticDir));  

const loginPath = path.join(staticDir, 'public/login.html');
const signupPath = path.join(staticDir, 'public/signup.html');
const homePath = path.join(staticDir, 'public/home.html');

app.get('/', function(req, res) {
    res.sendFile(homePath);
});

app.get('/login', function(req, res) {
    res.sendFile(loginPath);
});

app.get('/signup', function(req, res) {
    res.sendFile(signupPath);
});

const PORT = process.env.PORT || 5000;
const SSLserver = https.createServer({
    key: fs.readFileSync(path.join(staticDir, 'ssl','key.pem')),
    cert: fs.readFileSync(path.join(staticDir, 'ssl','cert.pem'))
}, app)

SSLserver.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

initializeSocket(SSLserver);

