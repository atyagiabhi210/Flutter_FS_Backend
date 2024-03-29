import mongoose, { Schema } from "mongoose";
import { Iuserinterface } from "../interface/user.interface";

const userSchema = new Schema<Iuserinterface>({
    uid:{
        type: String,
        required:true

    },
    tweets:{
        type:[String],
        default:[],
    },
    firstName:{
        type:String,
        default:"User"
    },
    lastName:{
        type:String,
        default:"Name"
    },
    email:{type:String,
        required:true,
        
    },
    createdAt:{
        type:String,
        required:true,
        
    }

})
const userModel=mongoose.model<Iuserinterface>('UserModel',userSchema);

export default userModel;