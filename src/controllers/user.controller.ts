import { Request, Response } from "express";
import { Iuserinterface } from "../database/interface/user.interface";
import {
  createUserRepo,
  deleteUserRepo,
  getUserRepo,
  updateUserRepo,
} from "../repositories/user.repository";

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  console.log(userId);
  try {
    // call my repo function which will give me user document
    const user =await getUserRepo(userId);
    if (user) {
      console.log(user);
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(500).json({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
// create user controller
export const createUserController = async (req: Request, res: Response) => {
  const user: Iuserinterface = req.body;
  try {
    const success = await createUserRepo(user);
    if (success) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(500).json({
        error: "User not created",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
// delete user controller
export const deleteUserController = async (req: Request, res: Response) => {
  const user = req.params.userId as string;
  try {
    const delUser = await deleteUserRepo(user);
    if (delUser) {
      res.status(200).json({
        data: "User Deleted",
      });
    } else {
      res.status(500).json({
        error: "User not deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// update user controller
export const updateUserController= async (req: Request, res: Response) => {
    try {
    //const userId = req.query.userId as string;
    const updatedUser: Iuserinterface = req.body;
    const updated = await updateUserRepo(updatedUser.uid, updatedUser);
    if(updated){
        res.status(200).json({
            data: "User Updated",
          });
        }

    else{
        res.status(500).json({
            error: "User not updated",
          });
    }
    } catch (error) {
        res.status(500).json({
            error: error,
          });
    }
}