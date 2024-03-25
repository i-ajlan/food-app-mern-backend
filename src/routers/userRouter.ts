import express from 'express'
import userController from '../controllers/userController'
import { jwtCheck, jwtParse } from '../middlewares/auth0Midd'
import { validateMyUserRequest } from '../middlewares/validation'

const router = express.Router()


router.post('/', jwtCheck, userController.createCurrentUser)
router.get('/', jwtCheck, jwtParse, userController.getCurrentUser)
router.put('/',jwtCheck, jwtParse, validateMyUserRequest, userController.updateCurrentUser)

export default router