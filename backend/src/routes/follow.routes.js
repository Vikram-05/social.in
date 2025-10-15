import {Router} from 'express'
import {authMiddleware} from '../middlewares/auth.middleware.js'
import { getFollower,FollowUnFollow,checkIsFollowOrNot } from '../controllers/follower.controller.js';

const routes = Router()

routes.get("/get-follwer",authMiddleware,getFollower);
routes.post("/follow-unfollow",authMiddleware,FollowUnFollow);
routes.get("/isFollow/:checkFor",authMiddleware,checkIsFollowOrNot);


export default routes;