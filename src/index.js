import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';


import {connect} from './config/database.js';
import { passportAuth } from './config/jwt-middleware.js';

import apiRoutes from './routes/index.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);


app.listen(3001, async () => {
    console.log('server started');
    await connect();
    console.log('Mongo db connected');
});

  

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



 