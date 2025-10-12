import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { increaseLike,isLiked } from '../controllers/like.controller.js'

const router = Router()

router.post("/inc-like", authMiddleware, increaseLike)
router.get("/isLike/:postId", authMiddleware, isLiked)

export default router;