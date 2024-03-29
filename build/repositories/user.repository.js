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
exports.deleteUserTweetIdRepo = exports.updateUserTweetIdRepo = exports.updateUserRepo = exports.createUserRepo = exports.deleteUserRepo = exports.getUserRepo = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
// We will be performing the  basic CRUD operations in this file
//first let's retrieve or read the user from db
const getUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            uid: userId,
        });
        console.log(user);
        return user;
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
exports.getUserRepo = getUserRepo;
// deleting the user from the db
const deleteUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield user_model_1.default.findOneAndDelete({
            uid: userId,
        });
        if (deleted) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.deleteUserRepo = deleteUserRepo;
// creating the user
const createUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield user_model_1.default.create(user);
        if (userCreated) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.createUserRepo = createUserRepo;
// updating the user
const updateUserRepo = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield user_model_1.default.findOneAndUpdate({
            uid: userId,
        }, updatedUser, { new: true });
        if (updated) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.updateUserRepo = updateUserRepo;
// Update the tweet id of a user when a tweet gets posted
const updateUserTweetIdRepo = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTweet = yield user_model_1.default.findOneAndUpdate({
            uid: userId
        }, {
            $push: {
                tweets: tweetId
            }
        });
        if (updatedTweet) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserTweetIdRepo = updateUserTweetIdRepo;
// delete the tweet id of a user when a tweet gets deleted
const deleteUserTweetIdRepo = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTweet = yield user_model_1.default.findOneAndUpdate({
            uid: userId
        }, {
            $pull: {
                tweets: tweetId
            }
        });
        //console.log(deletedTweet);
        if (deletedTweet) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deleteUserTweetIdRepo = deleteUserTweetIdRepo;
