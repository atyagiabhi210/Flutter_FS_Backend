import { Iuserinterface } from "../database/interface/user.interface";
import userModel from "../database/models/user.model";

// We will be performing the  basic CRUD operations in this file
//first let's retrieve or read the user from db

export const getUserRepo = async (
  userId: string
): Promise<Iuserinterface | null> => {
  try {
    const user = await userModel.findOne({
      uid: userId,
    });
    console.log(user);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// deleting the user from the db

export const deleteUserRepo = async (userId: string): Promise<boolean> => {
  try {
    const deleted = await userModel.findOneAndDelete({
      uid: userId,
    });
    if (deleted) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
// creating the user
export const createUserRepo = async (
  user: Iuserinterface
): Promise<Boolean> => {
  try {
    const userCreated = await userModel.create(user);
    if (userCreated) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// updating the user
export const updateUserRepo = async (
  userId: string,
  updatedUser: Iuserinterface
): Promise<Boolean> => {
  try {
    const updated = await userModel.findOneAndUpdate(
      {
        uid: userId,
      },
      updatedUser,
      { new: true }
    );
    if (updated) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
// Update the tweet id of a user when a tweet gets posted

export const updateUserTweetIdRepo= async(
  userId:string,
  tweetId:string
):Promise<boolean> =>{
  try {
    const updatedTweet= await userModel.findOneAndUpdate(
      {
        uid:userId
      },
      {
        $push:{
          tweets:tweetId
          
        }
      }
    );
    
    
    if(updatedTweet){
      return true;
    }
    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}

// delete the tweet id of a user when a tweet gets deleted
export const deleteUserTweetIdRepo= async(
  userId:string,
  tweetId:string
): Promise<boolean> =>{
  try {
    const deletedTweet= await userModel.findOneAndUpdate(
      {
        uid:userId
      },
      {
        $pull:{
          tweets:tweetId
        }
        
      }
      
    ) ;
    //console.log(deletedTweet);
    if(deletedTweet){
      return true;
    }
    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}