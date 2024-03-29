"use strict";
// so here similarly we would be creating the routes for my tweets
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweet_controller_1 = require("../controllers/tweet.controller");
const tweetRouter = (0, express_1.Router)();
// we want to perform basic CRUD operations on the user
//getting the tweet
tweetRouter.get("/:tweetId", tweet_controller_1.getTweetController);
//creating the tweet
tweetRouter.post("/", tweet_controller_1.createTweetController);
//deleting the tweet
tweetRouter.delete("/:tweetId", tweet_controller_1.deleteTweetController);
//updating the  tweet
tweetRouter.put("/", tweet_controller_1.updateTweetController);
exports.default = tweetRouter;
