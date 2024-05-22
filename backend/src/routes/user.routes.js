import {Router} from "express"
import { registerUser ,loginUser, logoutUser } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/register").post(upload.fields([
    {
        name:'resume', // should be same name in frontend,
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1 // number of files accepted
    }
]),registerUser)


router.route('/login').post(loginUser)

// secured routes

router.route('/logout').post(verifyJWT,logoutUser)

export default router