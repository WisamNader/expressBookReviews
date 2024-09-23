const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
let books = require("./booksdb.js");
const customerRouter = express.Router();

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


//only registered customers can login
customerRouter.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "/login endpoint is yet to be implemented"});
});

// Add a book review
customerRouter.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "/auth/review/:isbn: Yet to be implemented"});
});

module.exports.customerRouter = customerRouter;
module.exports.isValid = isValid;
module.exports.customers = customers;
module.exports.authorizationMiddleWare = authorizationMiddleWare;
