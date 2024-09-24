// Define/include/import all required modules/libraries/jsfiles, middlewares, and route handlers (routers)
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./customer-router.js").isValid;
let customers = require("./customer-router.js").customers;


const publicRouter = express.Router();


publicRouter.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "POST Method to register user End Point API: Yet to be implemented"});
});

// TASK#1: Get the book list available in the shop
publicRouter.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Get the book list available in the shop: Yet to be implemented"});
  return res.status(200).send(JSON.stringify(books));
});

// TASK#2: Get book details based on ISBN
publicRouter.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn]){
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message:"book isbn does not exist"});
  //return res.status(300).json({message: " Get book details based on ISBN: Yet to be implemented"});
 }); 
  
// Get book details based on author
publicRouter.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Get book details based on author: Yet to be implemented"});
});

// Get all books based on title
publicRouter.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Get all books based on title: Yet to be implemented"});
});

//  Get book review
publicRouter.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Get book review: Yet to be implemented"});
});

module.exports.publicRouter = publicRouter;
