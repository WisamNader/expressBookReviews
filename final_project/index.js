// Define/include/import all required modules/libraries/jsfiles, middlewares, and route handlers (routers)
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customerRouter = require('./router/customer-router.js').customerRouter; //router for registerd customers only
const publicRouter = require('./router/public-router.js').publicRouter; //router for any customer
const authorizationMiddleWare = require('./router/customer-router.js').authorizationMiddleWare;
const boooks = require('./router/booksdb.js');


// Create an Express app instance/object
const app = express();

// Define required middlewares
app.use(express.json());
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

// Start/run the server
const PORT =5000;
app.listen(PORT,()=>{
    console.log("Server is running");
    console.log(JSON.stringify(boooks[1]));

});