import express from 'express';

import { createTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';

const router = express.Router();

router.post('/tweets', createTweet);

router.post('/likes/toggle',toggleLike); //help to toggle our like

export default router;

