"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTweetController = exports.deleteTweetController = exports.createTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const user_repository_1 = require("../repositories/user.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    console.log(tweetId);
    try {
        // call my repo function which will give me tweet document
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({
                data: tweet,
            });
        }
        else {
            res.status(500).json({
                error: "tweet not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
exports.getTweetController = getTweetController;
// create tweet controller
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (success) {
            try {
                const updatedTweetId = yield (0, user_repository_1.updateUserTweetIdRepo)(tweet.adminId, tweet.tweetId);
                if (updatedTweetId) {
                    res.status(200).json({
                        data: tweet,
                    });
                }
                else {
                    res.status(500).json({
                        error: "user not updated with tweet id",
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            res.status(500).json({
                error: "tweet not created",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
exports.createTweetController = createTweetController;
// delete tweet controller
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.params.tweetId;
    const tweetBody = yield (0, tweet_repository_1.getTweetRepo)(tweet);
    if (tweetBody) {
        console.log(tweetBody.adminId);
        try {
            const delTweet = yield (0, tweet_repository_1.deleteTweetRepo)(tweet);
            //const tweetB =await tweetModel.findOne({tweetId:tweet})
            //console.log(tweetB?.adminId);
            if (delTweet) {
                const updatedTweetUser = yield (0, user_repository_1.deleteUserTweetIdRepo)(tweetBody.adminId, tweet);
                res.status(200).json({
                    data: "tweet Deleted",
                });
            }
            else {
                res.status(500).json({
                    error: "tweet not deleted",
                });
            }
        }
        catch (error) {
            res.status(500).json({
                error: error,
            });
        }
    }
    else {
        res.status(500).json({
            error: "tweetBody not found",
        });
    }
});
exports.deleteTweetController = deleteTweetController;
// update tweet controller
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const userId = req.query.userId as string;
        const updatedTweet = req.body;
        const updated = yield (0, tweet_repository_1.updateTweetRepo)(updatedTweet.tweetId, updatedTweet);
        if (updated) {
            res.status(200).json({
                data: "tweet Updated",
            });
        }
        else {
            res.status(500).json({
                error: "tweet not updated",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
exports.updateTweetController = updateTweetController;
