// Define/include/import all required modules/libraries/jsfiles, middlewares, and route handlers (routers)
    console.log("now running index.js file");
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const session = require('express-session');
    const axios = require("axios");
    const customerRouter = require('./router/customer-router.js').customerRouter; //router for registerd customers only
    const publicRouter = require('./router/public-router.js').publicRouter; //router for any customer
    const authorizationMiddleWare = require('./router/customer-router.js').authorizationMiddleWare;
    const boooks = require('./router/booksdb.js');


// Create an Express app instance/object
    const app = express();

// Define required middlewares
//Use express.json() when you expect JSON data in the request body, such as when working with APIs that accept and respond with JSON
    app.use(express.json());    // Middleware to parse JSON (to access automatically parsed JSON data from req.body)
    app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}));
    app.use("/customer/auth/*", authorizationMiddleWare);


/*
app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    // Middleware to authenticate requests to "/friends" endpoint
    app.use("/friends", function auth(req, res, next) {
        // Check if user is logged in and has valid access token
        if (req.session.authorization) {
            let token = req.session.authorization['accessToken'];
            // Verify JWT token
            jwt.verify(token, "access", (err, user) => {
                if (!err) {
                    req.user = user;
                    next(); // Proceed to the next middleware
                } else {
                    return res.status(403).json({ message: "User not authenticated" });
                }
            });
        } else {
            return res.status(403).json({ message: "User not logged in" });
        }
    });
});
*/ 

// Define Route Handlers
    app.use("/customer", customerRouter); //use this router for registerd customers only
    app.use("/", publicRouter);             //use this router for any customer

// code to be deleted (just for testing purposes)
    const obj = { name: "John", age: 30, city: "New York" };
    const arr = [1, 2, 3, 4, 5];
    //const jsonString = JSON.stringify(arr);
    const jsonString = JSON.stringify(obj, null, 7); // 2-space indentation
    const obj2 = {"name": "Wisam"};
    const obj3 = {name: "Wisam", "age": 41, ID: "777", "date of birth": "1/29/1983"};

// End of code to be deleted

// Start/run the server
const PORT =5000;
console.log('=> will start the server now')
app.listen(PORT,()=>{
    console.log("Server is running");

    //console.log(JSON.stringify(boooks[1]));
    //console.log(jsonString);
    //console.log(obj);
    //console.log(arr);
    //console.log(obj2.name);  // Output: Wisam
    //console.log(obj3.age);  // Output: Wisam
    //console.log(obj3['date of birth']);
    /*
    for (let key in obj3){
        console.log(key + " : " + obj3[key]);
    }
    */

});

console.log("this command is just after starting the server in the index.js file");