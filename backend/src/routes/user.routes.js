import {Router} from "express"
import { registerUser ,loginUser, logoutUser, changeCurrentPassword, refreshAcessToken, getCurrentUser, updateAccountDetails } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createUpdateDetails } from "../middlewares/update.middleware.js";
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
router.route('/changePassword').post(verifyJWT,changeCurrentPassword)
router.route('/refreshAccessToken').post(refreshAcessToken)
router.route('/getUser').get(verifyJWT,getCurrentUser)
router.route('/updateUserDetails').patch(verifyJWT,createUpdateDetails,updateAccountDetails)

export default router