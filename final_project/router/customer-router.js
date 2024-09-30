console.log("now running the customer-router file");
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
let books = require("./booksdb.js");
const customerRouter = express.Router();
const registeredUsers =   require('./public-router.js').registeredUsers;
const registeredCustomers = require('./public-router.js').registeredCustomers;

let customers = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

const authorizationMiddleWare = (req,res,next) => {
    //Write the authenication mechanism here
    // Middleware to authenticate requests to "/customer/auth/*" routes
        // Check if user is logged in and has valid access token
        if (req.session.authorization) {
            let token = req.session.authorization['accessToken'];
            // Verify JWT token
            jwt.verify(token, "access", (err, user) => {
                if (!err) {
                    req.user = user;
                    next(); // Proceed to the next middleware
                } else {
                    return res.status(403).json({ message: "User not authorized" });
                }
            });
        } else {
            return res.status(403).json({ message: "User not authenticated! (user not logged in)" });
        }
        
}

// Task#7:
//only registered customers can login
customerRouter.post("/login", (req,res) => {
    //Write your code here
    const {username, password} = req.body;

    // check that the username and password are provided correctly in the request body
    if ([undefined, null, ""].includes(username) ){
    return res.status(400).send(`missing username`);
    }

    if ([undefined, null, ""].includes(password) ){
    return res.status(400).send(`missing password`);
    }

    if (registeredUsers[username]){
        console.log(`username: ${username} exists in registerdUsers`);
        console.log(`registeredCustomers:`, registeredCustomers);
        console.log(`registeredUsers:`, registeredUsers);
        if(registeredCustomers.find(user => user.username === username)){
            console.log(`username: ${username} exists in registeredCustomers`);
            //check for password match now
            if(registeredUsers[username] === password){
                console.log(`password: ${password} matches records in registeredUsers`);
                if(registeredCustomers.find(user => user.username === username && user.password === password)){
                    console.log(`password: ${password} matches records in registeredCustomers too`);
                    console.log('now it is time to assign a JWT access key');
                    //now, sign the user in and assign a JWT access key
                    //return res.send('username and password match .. but still need to assign JWT access key');
                    
                    // Generate JWT access token
                    let accessToken = jwt.sign({
                        data: password
                    }, 'access', { expiresIn: 60 * 60 });
                    // Store access token and username in session
                    req.session.authorization = {
                        accessToken, username
                    }
                    return res.status(200).send("User successfully logged in");
                    // End of JWT signing
                }
            }
            else{
                console.log(`password: ${password} does not match our records (${registeredUsers[username]}) .. please try again`); 
                return res.status(208).send(`password: ${password} does not match our records .. please try again`);
            }
        }
    }
    else{
        console.log(`username: (${username}) is not registered yet`);
        return res.status(400).send(`username: (${username}) is not registered yet`);
    }
});

// Add a book review
customerRouter.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let username = req.session.authorization.username;
  let review = req.query.review;

  if(username && isbn && review){
        console.log(`authorized user: `, username, `with access token: `, req.session.authorization.accessToken);
        if(books[isbn]){
            books[isbn].reviews[username] = review;
            console.log(`updated book of isbn: ${isbn} \n`, books[isbn]);
            return res.status(200).send(books[isbn]);
        }
        else{
            return res.status(404).send(`could not find a book with isbn: ${isbn}`);
        }
    }
  else{
        return res.status(400).send(`missing username, isbn, and/or query`);
    }

  //return res.status(300).json({message: "/auth/review/:isbn: Yet to be implemented"});
});

module.exports.customerRouter = customerRouter;
module.exports.isValid = isValid;
module.exports.customers = customers;
module.exports.authorizationMiddleWare = authorizationMiddleWare;
