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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTweetRepo = exports.updateTweetRepo = exports.deleteTweetRepo = exports.getTweetRepo = void 0;
const tweet_model_1 = __importDefault(require("../database/models/tweet.model"));
// We will be performing the  basic CRUD operations in this file
//first let's retrieve or read the tweet from db
const getTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_model_1.default.findOne({
            tweetId: tweetId,
        });
        console.log(tweet);
        return tweet;
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
exports.getTweetRepo = getTweetRepo;
// deleting the tweet from the db
const deleteTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(tweetId);
        const deleted = yield tweet_model_1.default.findOneAndDelete({
            tweetId: tweetId,
        });
        if (deleted) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.deleteTweetRepo = deleteTweetRepo;
// updating the tweet
const updateTweetRepo = (tweetId, updatedTweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield tweet_model_1.default.findOneAndUpdate({
            tweetId: tweetId,
        }, updatedTweet, { new: true });
        if (updated) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateTweetRepo = updateTweetRepo;
// creating the tweet
const createTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetCreated = yield tweet_model_1.default.create(tweet);
        if (tweetCreated) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.createTweetRepo = createTweetRepo;
