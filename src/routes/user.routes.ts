
import {Router} from 'express';
import { getUserController,createUserController,deleteUserController,updateUserController } from '../controllers/user.controller';
// now we will define our routes here
// basic rule of thumb is first we will define the route then the controller function would be called
const userRouter = Router();

// we want to perform basic CRUD operations on the user
userRouter.get('/:userId',getUserController)
// in the post request we won't need the query like /:userId instead we would need a body
// so we will use the post request to create a new user
// here we will pass the empty body by using /
userRouter.post('/',createUserController)

userRouter.delete("/:userId",deleteUserController)

userRouter.put("/",updateUserController)

// we would be needing to export these routes to our route.ts
export default userRouter;