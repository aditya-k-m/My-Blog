//jshint esversion:6

//importing modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const kabab = require(__dirname + "/kabab.js");

//default content for Home, contact and about pages
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//getting things ready
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []; //this array stores the post objects

//setting up the home route
app.get("/", function(req, res){
  res.render("home",{
    homeContent: homeStartingContent,
    posts: posts
  });
});

//setting up the contact route
app.get("/contact", function(req, res){
  res.render("contact",{
    contactPageContent: contactContent
  });
});

//setting up the about route
app.get("/about", function(req, res){
  res.render("about",{
    aboutPageContent: aboutContent
  });
});

//setting up the compose route
app.get("/compose", function(req, res){
  res.render("compose",{});
});

app.get("/posts/:postTitle", function(req, res){
  let requestedPost = req.params.postTitle;
  requestedPost = kabab.deKabab(requestedPost);
  const title = requestedPost;
  posts.forEach(function(post){
    if(_.toLower(post.title) == title){
    res.render("post",{
      title: post.title,
      body: post.body
    });
  }
  else {
    console.log("Match not found !");
  }
});
});

app.post("/compose", function(req, res){
  let readLink = _.toLower(req.body.postTitle);
  readLink = kabab.reKabab(readLink);
  let post = {
    title: req.body.postTitle,
    excerpt: req.body.postExcerpt,
    body: req.body.postBody,
    link: readLink
  };
  posts.push(post);
  res.redirect("/");
});




//setting up the default port for the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
