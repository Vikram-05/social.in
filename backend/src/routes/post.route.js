import {Router} from 'express'
import { createPost,getPosts,getUserPosts,getPostsByCategory,getUserPostsById } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
const routes = Router();

routes.post("/newpost",upload.single('postImageOrVideoURL'),authMiddleware,createPost)
routes.post("/get-random-post",authMiddleware,getPosts) //ye kuch bhi ho sakth hai  reel,post,story whateve will send
routes.post("/get-post-by-category",authMiddleware,getPostsByCategory) //it may by  reel,post,story whateve will send
routes.post("/get-random-post-use-related",authMiddleware,getUserPosts) //it may by  reel,post,story whateve will send filter by userId
routes.post("/get-random-post-use-related-byId",authMiddleware,getUserPostsById) //it may by  reel,post,story whateve will send filter by userId

export default routes;