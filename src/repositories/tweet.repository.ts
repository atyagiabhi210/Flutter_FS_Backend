import { Itweetsinterface } from "../database/interface/tweet.interface";
import tweetModel from "../database/models/tweet.model";

// We will be performing the  basic CRUD operations in this file
//first let's retrieve or read the tweet from db
export const getTweetRepo = async (
  tweetId: string
): Promise<Itweetsinterface | null> => {
  try {
    const tweet = await tweetModel.findOne({
      tweetId: tweetId,
    });
    console.log(tweet);
    return tweet;
  } catch (err) {
    console.error(err);
    return null;
  }
};
// deleting the tweet from the db
export const deleteTweetRepo = async (tweetId: string): Promise<Boolean> => {
  try {
    console.log(tweetId);
    const deleted = await tweetModel.findOneAndDelete({
      tweetId: tweetId,
    });
    if (deleted) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// updating the tweet
export const updateTweetRepo = async (
  tweetId: string,
  updatedTweet: Itweetsinterface
): Promise<Boolean> => {
  try {
    const updated = await tweetModel.findOneAndUpdate(
      {
        tweetId: tweetId,
      },
      updatedTweet,
      { new: true }
    );

    if (updated) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// creating the tweet
export const createTweetRepo = async (
  tweet: Itweetsinterface
): Promise<Boolean> => {
  try {
    const tweetCreated = await tweetModel.create(tweet);
    if (tweetCreated) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
