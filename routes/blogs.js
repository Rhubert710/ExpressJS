var express = require('express');
var router = express.Router();

const { blogsDB } = require("../mongo");

var blogPosts = require('../public/javascripts/sampleBlogs')//OLD, DB FILE USED BEFORE MONGO



// VIEW ROUTES //

//DISPLAY BLOGS
router.get('/', function (req, res) {
    res.render('displayBlogs');
});
router.get('/display-blogs', function (req, res) {
    res.render('displayBlogs');
});

//DISPLAY SINGLE BLOG
router.get('/display-single-blog', (req, res) => {
    res.render('displaySingleBlog');
});

//POST BLOG
router.get('/post-blog', (req, res, next) => {
    res.render('postBlog');
});





// JSON ENDPOINTS //

// GET BLOG BY ID
router.get('/single-blog/:blogId', async function(req, res, next) 
{
    id_number = parseInt( req.params.blogId ); 
    // let blog = blogPosts.blogPosts.filter(blogPost => blogPost.id == id);

    // res.json(blog);

    const collection = await blogsDB().collection("posts");
    const posts = await collection.find({'id':id_number }).toArray();

    res.json(posts);
});

// GET ALL : ASCE/DESC
router.get('/all', async function(req, res) 
{
    
    order= req.query.sort;
    // let orderedArray =  blogPosts.blogPosts;
    let orderedArray = await blogsDB().collection("posts").find({ }).toArray();
    // let orderedArray = await collection.find({ }).toArray();

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

// POST NEW BLOG
router.post('/submit', async function(req, res) 
{
    try
    {
        await blogsDB().collection("posts").insertOne({
            
            'title':req.body.title,
            'text':req.body.text,
            'author':req.body.author,
            'category':req.body.category,
            'createdAt': new Date(),
              'lastModified': new Date(),
            'id':await getPostsCollectionLength() +1
        })
        res.json(`Succesfully Submited Blog Id: ${await getPostsCollectionLength()}`)
    }
    catch(err)
    {
        res.json(err)
    }
});


// UPDATE BLOG POST
router.put('/update-blog/:id', async function(req, res) 
{
    try
    {
        let updatedInfo = {};
    
        if(req.body.title) updatedInfo['title'] = req.body.title;
        
        if(req.body.text) updatedInfo['text'] = req.body.text;
        
        if(req.body.author) updatedInfo['author'] =req.body.author;    
        
        if(req.body.category) updatedInfo['category'] = req.body.category;
        
        await blogsDB().collection("posts").updateOne({'id':parseInt(req.params.id)},{$set:updatedInfo})
        let updatedPost = await blogsDB().collection("posts").find({'id':parseInt(req.params.id)}).toArray();

        res.json(`Blog ${req.params.id} successfully updated`)
    }
    catch(err)
    {
        res.json(err)
    }

});
// POST NEW BLOG

// GET POSTS LENGTH
async function getPostsCollectionLength()
{
    let postCount = await blogsDB().collection("posts").count();
    return postCount
}

module.exports = router;