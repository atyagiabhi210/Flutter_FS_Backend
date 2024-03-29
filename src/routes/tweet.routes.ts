// so here similarly we would be creating the routes for my tweets

import { Router } from 'express';
import { createTweetController, deleteTweetController, getTweetController, updateTweetController } from '../controllers/tweet.controller';


const tweetRouter=Router();

// we want to perform basic CRUD operations on the user
//getting the tweet
tweetRouter.get("/:tweetId",getTweetController)

//creating the tweet
tweetRouter.post("/",createTweetController)

//deleting the tweet
tweetRouter.delete("/:tweetId",deleteTweetController)

//updating the  tweet

tweetRouter.put("/",updateTweetController)

export default tweetRouter;