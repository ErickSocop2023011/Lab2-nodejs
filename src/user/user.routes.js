import { Router } from "express"
import { getUserById, getUsers, deleteUser, updatePassword, updateUser,getAppByUser, updateProfPic } from "./user.controller.js"
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"
import {updateProfilePictureValidator} from "../middlewares/updt-pp-validator.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.get("/findAppByUser/:uid", getUserByIdValidator, getAppByUser)

router.patch("/updateProfPic/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfPic, deleteFileOnError)

export default router
