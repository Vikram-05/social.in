import {Router} from 'express'
import { createPost } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const routes = Router();

routes.post("/newpost",authMiddleware,createPost)

export default routes;