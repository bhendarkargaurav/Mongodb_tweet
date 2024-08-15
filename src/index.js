import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './config/database.js';

import apiRoutes from './routes/index.js';

// import { UserRepository, TweetRepository } from './repository/index.js';
// import LikeService from './services/like-service.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log('Server Started');
    await connect();
    console.log("Mongo db connected");

  

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


 