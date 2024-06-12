import {Router} from "express"
import { registerUser ,loginUser, logoutUser, changeCurrentPassword, refreshAcessToken, getCurrentUser, updateAccountDetails, getAllUsers, toggleAdmin } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createUpdateDetails, problemUpdateDetails } from "../middlewares/update.middleware.js";
import { addProblem, deleteProblem, getAllProblems, getProblem, runProblem, updateProblem } from "../controllers/problem.controllers.js";
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
router.route('/getAllUsers').get(verifyJWT,getAllUsers)
router.route('/adminToggle').post(verifyJWT,toggleAdmin)

// problem routes
router.route('/addProblem').post(verifyJWT,addProblem)
router.route('/updateProblem').patch(verifyJWT,problemUpdateDetails,updateProblem)
router.route('/getProblem').get(verifyJWT,getProblem)
router.route('/deleteProblem').delete(verifyJWT,deleteProblem)
router.route('/runProblem').post(verifyJWT,runProblem)
router.route('/getAllProblems').get(verifyJWT,getAllProblems)


export default router