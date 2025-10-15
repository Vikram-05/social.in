import {Router} from 'express'
import {authMiddleware} from '../middlewares/auth.middleware.js'
import { getFollower,FollowUnFollow } from '../controllers/follower.controller.js';

const routes = Router()

routes.get("/get-follwer",authMiddleware,getFollower);
routes.post("/follow-unfollow",authMiddleware,FollowUnFollow);


export default routes;