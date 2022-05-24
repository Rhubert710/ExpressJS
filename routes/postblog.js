var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('postBlog');
});

module.exports = router;


router.get("/postblog", function (req, res, next) {
    res.render('postBlog');
})

router.post("/submit", function (req, res, next) {
    console.log(req.body)
    console.log("bloglist before ", blogsImport.blogPosts)
    const today = new Date()
    const newPost = {
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        createdAt: today.toISOString(),
        id: String(blogsImport.blogPosts.length + 1)
    }
    blogsImport.blogPosts.push(newPost)
    console.log("bloglist after ", blogsImport.blogPosts)

    res.send("OK");
})