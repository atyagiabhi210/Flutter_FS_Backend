import { Document } from "mongoose";

export interface Iuserinterface extends Document{
    uid:string,
    tweets:string[],
    firstName:string,
    lastName:string,
    email:string,
    createdAt:string,
}