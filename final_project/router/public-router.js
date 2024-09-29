// Define/include/import all required modules/libraries/jsfiles, middlewares, and route handlers (routers)
const express = require('express');
let books = require("./booksdb.js");
//let registeredUsers = require("../index.js").registeredUsers;
let isValid = require("./customer-router.js").isValid;
let customers = require("./customer-router.js").customers;

const publicRouter = express.Router();

//TASK#6: 
// Create a DB for registered users
const registeredUsers = {};
const registeredCustomers = [];

// "/register" End Point API
publicRouter.post("/register", (req,res) => {
  const {username, password} = req.body;

  if ([undefined, null, ""].includes(username) ){
    return res.status(400).send(`missing username`);
  }

  if ([undefined, null, ""].includes(password) ){
    return res.status(400).send(`missing password`);
  }

  if (registeredUsers[username]){
    if(registeredCustomers.find(user => user.username === username))
        console.log(`username: ${username} already exists`);

    return res.status(409).send(`409 Error Code (Conflict); resource (i.e. username: ${username}) already exists`);
  }
  else{
    console.log(`Yeah new user (${username}) just registered!!`)
    registeredUsers[username] = password;
    registeredCustomers.push({"username": username, "password": password});
    console.log("registeredUsers are:\n", registeredUsers);
    console.log("registeredCustomers are:\n", registeredCustomers);
    //return res.status(200).send(registeredUsers);
    return res.status(200).send(registeredCustomers);
  }

});

// TASK#1
// Get the book list available in the shop
publicRouter.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Get the book list available in the shop: Yet to be implemented"});
  return res.status(200).send(JSON.stringify(books));
});

// TASK#2
// Get book details based on ISBN
publicRouter.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn]){
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message:"book isbn does not exist"});
  //return res.status(300).json({message: " Get book details based on ISBN: Yet to be implemented"});
 }); 
  
// TASK#3
// Get book details based on author
publicRouter.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  //return res.status(300).json({message: `Get book details based on author: ${author}`});

  let booksByAuthor = {};

/*
  for (let [key, value] of Object.entries(books)){
      if (value.author === author){ 
        booksByAuthor[key] = value;
      }
  };
*/
  
  for(let key in books){
    if(books[key].author === author){
      booksByAuthor[key] = books[key];
      console.log(`found a book with author name: ${author}`);
    }
  };

  /*
  Object.entries(books).forEach( ([key,value]) =>{
    //console.log(key, value);
    if (value.author === author) {
      //console.log(key, value);
      booksByAuthor[key] = value;
    }
  });
  */

  if (Object.keys(booksByAuthor).length !== 0)
      return res.status(200).send(booksByAuthor);
  else
      return res.status(404).send(`no books found for author: ${author}`);

});


//TASK#4:
// Get all books based on title
publicRouter.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  let booksByTitle = {};

  for (let key in books){
    if (books[key].title === title){
      booksByTitle[key] = books[key];
    }
  }

  if (Object.entries(booksByTitle).length !== 0)
    res.status(200).send(booksByTitle);
  else
    res.status(404).send(`no books found for title: ${title}`);

  //return res.status(300).json({message: "Get all books based on title: Yet to be implemented"});
});


//TASK#5: 
//  Get book review
publicRouter.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Get book review by isbn: Yet to be implemented"});

  const isbn = req.params.isbn;
  if(books[isbn]){
    let bookReviews = {"isbn":isbn, "reviews":books[isbn].reviews};
    console.log(`book with isbn: ${isbn} was found!`);
    console.log({"reviews": books[isbn].reviews});
    res.status(200).json(bookReviews);
  }
  else{
    res.status(404).send(`no book was found for isbn: ${isbn}`);
  }

});

module.exports.publicRouter = publicRouter;
module.exports.registeredUsers = registeredUsers;
