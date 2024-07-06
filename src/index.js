import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './config/database.js';

import apiRoutes from './routes/index.js';

import { UserRepository, TweetRepository } from './repository/index.js';
import LikeService from './services/like-service.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(3000, async ()=>{
    console.log('Server Started');
    await connect();
    console.log("Mongo db connected");

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll(0, 10);
    const user = await userRepo.getAll();
    const likeService = new LikeService();
    await likeService.toggleLike(tweets[0].id, 'Tweet', user[0].id);


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
    // const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.getAll(2,4);
    // console.log(tweet);

    //hooks
    // const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.create({content: 'With hooks'});
    // console.log(tweet);

});


 