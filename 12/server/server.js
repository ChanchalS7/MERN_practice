const express =require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = 5000
const app =express();
app.use(express.json());
app.use(cors());
//fetch data form api
app.get('/fetchPosts', async(req,res)=>{
    try {
        const response = await axios.get('https://dummyjson.com/posts')
        let data = response.data;
        //ensure data is an array
        if(!Array.isArray(data)){
            //check if data has posts property that is an array
            if(data.posts && Array.isArray(data.posts)) {
                data = data.posts;
            }else{
                throw new Error('Data is not an array')
            }

        }
        res.json(data);
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
//sort posts by reaction count ASC
app.get('/sortPostsAsc', async(req,res)=>{
    try {
        const response = await axios.get('https://dummyjson.com/posts')
        let data =response.data;
        if(!Array.isArray(data)) {
            if(data.posts && Array.isArray(data.posts)){
                data = data.posts;
            }else{
                throw new Error('Data is not an array')
            }
        }
        data.sort((a,b)=>a.reactions - b.reactions);
        res.json(data);
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
//sort posts by reaction count DESC
app.get('/sortPostsDesc', async(req,res)=>{
    try {
        const response = await axios.get('https://dummyjson.com/posts');
        let data = response.data;

        if(!Array.isArray(data)) {
            if(data.posts && Array.isArray(data.posts)) {
                data = data.posts;
            }else{
                throw new Error('Data is not an array')
            }
        }
        data.sort((a,b)=> b.reactions - a.reactions);
        res.json(data);
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
//search posts by Tag
app.get('/searchPosts/:tag', async(req,res) =>{
    try {
        const tag = req.params.tag.toLowerCase();
        const response = await axios.get('https://dummyjson.com/posts');
        let data = response.data;

        if(!Array.isArray(data)) {
            if(data.posts && Array.isArray(data.posts)) {
                data = data.posts;
            }else{
                throw new Error('Data is not an array');
            }
        }
        const filteredPosts = data.filter((post)=> post.tags && post.tags.includes(tag));
        res.json(filteredPosts);
        
    } catch (error) {
        res.status(500).send({error:error.message})
        
    }
})

//Find posts by User ID
app.get('/findPostsByUserID/:userId', async(req,res)=>{
    try {
        const userId = req.params.userId;
        const response = await axios.get('https://dummyjson.com/posts');
        let data = response.data;

        if(!Array.isArray(data)) {
            if(data.posts && Array.isArray(data.posts)) {
                data = data.posts;
                console.log('resData:', data);
            }else{
                throw new Error('Data is not an array');
            }
        }
        const userPosts = data.filter((post)=> post.userId == userId)
        console.log("userPosts:", userPosts );
        res.json(userPosts);
        
    } catch (error) {
        res.status(500).send({error:error.message})
        
    }
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
