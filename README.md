
# Cookie Parser and Login Authentication 

An ExpressJS server implementing Login Authentication thhrough socket connection using socket.io 

A MongoDB database to store user credentials and actively query the database for credentials(inserting and finding).  

An extra Cookie-parser feature to store login details and socket-id in web cookies of your localhost

The server is created using https module implementing SSL certificate (cert.pem and key.pem ) included


To run this locally, fork the repo and create your ssl certificate 
get the public key, private key and certificate and store in ssl folder

then connect to mongodb via localhost:27071. Create a DB called myDB 
or your custom database

Connect to https://localhost:5000 