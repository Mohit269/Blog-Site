const express = require("express");
const mongoose=require("mongoose");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://mohit-sharma:mohit26900@cluster0.npwey.mongodb.net/blogDB",{useNewUrlParser:true});
var _=require("lodash");
app.set("view engine", "ejs");
const aboutContent = "A simple Blog site where you are reading some intresting blogs written by the amazing Content writer. This Blog site is a Project website develop for learning and exploring some emerging technologies in Web Devlopmant.";
const contactContent = "If you want Your Blog Publish here contact to the developer team ,The refrence email id is --> [mohitsharma26900@gmail.com].";
const blogschema = new mongoose.Schema({
    name:String,
    article:String
});
const Items= mongoose.model("Items",blogschema);
app.get("/", function (req, res) {
    Items.find({},function(err,founditems){
        res.render("home", { content: founditems });
});
    
});
app.get("/about", function (req, res) {
    res.render("about", { about: aboutContent });
});
app.get("/contact", function (req, res) {
    res.render("contact", { contact: contactContent });
});
app.get("/compose", function (req, res) {
    res.render("compose");
});
app.post("/compose", function (req, res) {
    var content = new Items({
        name: req.body.compose,
        article: req.body.posttext
    });
    content.save();
    //onsole.log(all_post);
    res.redirect("/");
});
app.get("/post/:postId", function (req, res) {
    const tit = req.params.postId;
    Items.findOne({_id:tit},function(err,post){
        if (err){
           console.log(err);
        }else
         {
            res.render("post",{content:post});
        }
    }); 
});        
    
app.listen(process.env.PORT||3000, function () {
    console.log("server is started");
});
// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

