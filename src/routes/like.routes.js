import express from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
} from "../controllers/like.controller.js";

const router = express.Router();

router.route("/add-like").post(verifyJWT, toggleVideoLike);

router.route("/add-comment-like").post(verifyJWT, toggleCommentLike);

router.route("/add-tweet-like").post(verifyJWT, toggleTweetLike);

router.route("/get-liked-videos").get(verifyJWT, getLikedVideos);

export default router;
