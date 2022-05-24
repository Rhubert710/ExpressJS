var express = require('express');
var router = express.Router();

var blogPosts = require('../public/javascripts/sampleBlogs')


router.get('id/:blogId', function(req, res) 
{
    id = req.params.blogId.toString(); 
    let blog = blogPosts.blogPosts.filter(blogPost => blogPost.id == id);

    res.json(blog);
});

router.get('/all', function(req, res) 
{
    
    order= req.query.order;
    let orderedArray =  blogPosts.blogPosts;

    console.log(order)

    if(order=='asce')
    {
        orderedArray =  orderedArray.sort((c1, c2) => new Date(c1.createdAt)- new Date(c2.createdAt));
    }
    if(order=='desc')
    {
        orderedArray =  orderedArray.sort((c1, c2) => new Date(c2.createdAt)- new Date(c1.createdAt));
    }

    res.json(orderedArray);
});

module.exports = router;
