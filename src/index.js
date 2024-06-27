const express = require('express');
const connect = require('./config/database');
const app = express();

// const Tweet = require('./models/tweet');  now no need of this   //1
const TweetRepository = require('./repository/tweet-repository');  // 
const Comment = require('./models/comment');

app.listen(3000, async ()=>{
    console.log('Server Started');
    await connect();
    console.log("Mongo db connected");

    // const tweet = await Tweet.create({
    //     content: 'Second tweet',
    //     userEmail: 'a@c.com'
    // });

    // const tweets = await Tweet.find({userEmail: 'a@c.com'});    //1
    // console.log(tweets);

    // const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.update('667c1c4461f86b9b2fa7d0f6', 
    //         {content: 'my tweet is working'});

    // const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.create({content: 'tweet with a comment'});
    // tweet.comments.push({content: 'first comment here'});
    // await tweet.save();
    // console.log(tweet);

    // const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.create({content: 'Tweet with comment schema'});
    // console.log(tweet);
    // const comment = await Comment.create({content: 'new comment'});
    // tweet.comments.push(comment);
    // await tweet.save();
    // console.log(tweet);

    // const getComment = await tweetRepo.getWithComment("667c42769f195c21b19220bf");
    // console.log(getComment);

    // Page innation 
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getAll(2,4);
    console.log(tweet);

    
});


