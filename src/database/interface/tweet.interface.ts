import { Document } from "mongoose";
export interface Itweetsinterface extends Document{
    tweetId:string,
    content:string,
    createdAt:string,
    adminId:string,
}
