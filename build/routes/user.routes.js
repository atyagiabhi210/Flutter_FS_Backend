"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
// now we will define our routes here
// basic rule of thumb is first we will define the route then the controller function would be called
const userRouter = (0, express_1.Router)();
// we want to perform basic CRUD operations on the user
userRouter.get('/:userId', user_controller_1.getUserController);
// in the post request we won't need the query like /:userId instead we would need a body
// so we will use the post request to create a new user
// here we will pass the empty body by using /
userRouter.post('/', user_controller_1.createUserController);
userRouter.delete("/:userId", user_controller_1.deleteUserController);
userRouter.put("/", user_controller_1.updateUserController);
// we would be needing to export these routes to our route.ts
exports.default = userRouter;
