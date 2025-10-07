import express from 'express'
const routes = express.Router();
import { createUser, loginUser,logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

routes.post('/register', createUser)
routes.post('/login', loginUser)


//logout route
routes.get("/logout",authMiddleware,logout)


export default routes;