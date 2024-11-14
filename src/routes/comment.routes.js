import express from "express";
import {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/get-video-comments/:videoId").get(verifyJWT, getVideoComments);

router.route("/add-comment").post(verifyJWT, addComment);

router.route("/update-comment/:commentId").put(verifyJWT, updateComment);

router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
