to start this project i did in terminal:
npm init -y
npm install cors express
npm install nodemon -D

then added a script in package.json:
"dev":nodemon server/index.js

npm run dev <- to run the server

then 
npm install dotenv

npm run dev again to start server

npm install pg

npm run db-setup  <--  to set up DB, Y have to see ("set up complete")

npm run dev  <-- again

if you see "listening on port 3003" then all is correct 