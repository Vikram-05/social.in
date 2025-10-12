import {Router} from 'express'
import { createPost,getPosts } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const routes = Router();

routes.post("/newpost",authMiddleware,createPost)
routes.post("/get-random-post",authMiddleware,getPosts) //it may by  reel,post,story whateve will send

export default routes;