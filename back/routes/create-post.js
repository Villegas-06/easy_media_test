const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');


router.post('/create-post', (req, res) => {
    const { username, postTitle, postMessage, datetime, userId } = req.body;

    const newPost = new Posts({ userId, username, postTitle, postMessage, datetime });

    newPost.save()
        .then(post => res.json({ message: 'Post Created' }))
        .catch(err => res.json({ message: 'Uppss Try Later' }))
})

module.exports = router;