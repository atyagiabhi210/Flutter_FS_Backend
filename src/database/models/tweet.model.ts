import mongoose, {Schema,Document} from "mongoose";
import { Itweetsinterface } from "../interface/tweet.interface";

const tweetSchema = new Schema<Itweetsinterface>({
    tweetId:{
        type: String,
        required:true

    
    },
    content:{
        type:String,
        default:""
    },
    createdAt:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    }
    

})
const tweetModel=mongoose.model<Itweetsinterface>('TweetsModel',tweetSchema);

export default tweetModel;
