import { Request, Response, Router } from "express";

const helloRouter=Router();

helloRouter.get("/",(req:Request,res:Response)=>{
   res.json({"Data":"Server is running on http://localhost:3000/api/v1/"})
})
helloRouter.get("/profile",(req:Request,res:Response)=>{
      res.json({"Data":"This is profile page"})
})
export default helloRouter;