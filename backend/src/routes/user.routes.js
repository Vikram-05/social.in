import {Router} from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getUserById,updateUserProfile,getUserByUsername } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'


const routes = Router()

routes.get("/getUserById",authMiddleware,getUserById)
routes.get("/getUserByUsername/:username",authMiddleware,getUserByUsername)
routes.put("/update-user-data",upload.single('profile'),authMiddleware,updateUserProfile)

export default routes