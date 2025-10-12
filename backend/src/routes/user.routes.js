import {Router} from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getUserById } from '../controllers/user.controller.js'

const routes = Router()

routes.get("/getUserById",authMiddleware,getUserById)

export default routes