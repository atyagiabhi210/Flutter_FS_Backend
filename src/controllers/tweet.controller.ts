import { Request, Response } from "express";
import { Itweetsinterface } from "../database/interface/tweet.interface";
import {
  createTweetRepo,
  deleteTweetRepo,
  getTweetRepo,
  updateTweetRepo,
} from "../repositories/tweet.repository";
import { deleteUserTweetIdRepo, updateUserTweetIdRepo } from "../repositories/user.repository";

export const getTweetController = async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId as string;
  console.log(tweetId);
  try {
    // call my repo function which will give me tweet document
    const tweet =await getTweetRepo(tweetId);
    if (tweet) {
      res.status(200).json({
        data: tweet,
      });
    } else {
      res.status(500).json({
        error: "tweet not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
// create tweet controller
export const createTweetController = async (req: Request, res: Response) => {
  const tweet: Itweetsinterface = req.body;
  try {
    const success = await createTweetRepo(tweet);
    if (success) {
      try {
        const updatedTweetId= await updateUserTweetIdRepo(
          tweet.adminId,
          tweet.tweetId
        );
        if(updatedTweetId){
          res.status(200).json({
            data: tweet,
          });
        }
        else{
          res.status(500).json({
            error: "user not updated with tweet id",
          });
        }
      } catch (error) {
        console.log(error);
      }
      
      
    } else {
      res.status(500).json({
        error: "tweet not created",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
// delete tweet controller
export const deleteTweetController = async (req: Request, res: Response) => {
  const tweet = req.params.tweetId as string;
  const tweetBody= await getTweetRepo(tweet);
  if(tweetBody){
    console.log(tweetBody.adminId);
    try {
      const delTweet = await deleteTweetRepo(tweet);
      //const tweetB =await tweetModel.findOne({tweetId:tweet})
      //console.log(tweetB?.adminId);
      if (delTweet) {
          const updatedTweetUser= await deleteUserTweetIdRepo(
            tweetBody.adminId,
            tweet
          )
        
          res.status(200).json({
            data: "tweet Deleted",
          });
        
        
        
      } else {
        res.status(500).json({
          error: "tweet not deleted",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
  else{
    res.status(500).json({
      error: "tweetBody not found",
    });
  }
};

// update tweet controller
export const updateTweetController= async (req: Request, res: Response) => {
    try {
    //const userId = req.query.userId as string;
    const updatedTweet: Itweetsinterface = req.body;
    const updated = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
    if(updated){
        res.status(200).json({
            data: "tweet Updated",
          });
        }

    else{
        res.status(500).json({
            error: "tweet not updated",
          });
    }
    } catch (error) {
        res.status(500).json({
            error: error,
          });
    }
}