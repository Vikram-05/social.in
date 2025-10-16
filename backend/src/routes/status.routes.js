import {Router} from 'express'
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {uploadStatus,getStatus,getStatusById }from '../controllers/status.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const routes = Router()

routes.get("/getStatus",authMiddleware,getStatus)
routes.post("/getStatusById",authMiddleware,getStatusById)
routes.post("/upload-status",upload.single('image'),authMiddleware,uploadStatus)

export default routes;