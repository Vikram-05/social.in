import {Router} from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getUserById,updateUserProfile,getUserByUsername,getUserByIserId } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'


const routes = Router()

routes.get("/getUserById",authMiddleware,getUserById)
routes.get("/getUserByUserId/:id",authMiddleware,getUserByIserId)
routes.get("/getUserByUsername/:username",authMiddleware,getUserByUsername)
routes.put("/update-user-data",upload.single('profile'),authMiddleware,updateUserProfile)

export default routes