import express from "express";
import { createTweet, getUserTweets, updateTweet, deleteTweet } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/create-tweet").post(verifyJWT, createTweet);

router.route("/get-user-tweets/:userId").get(verifyJWT, getUserTweets);

router.route("/update-tweet/:tweetId").put(verifyJWT, updateTweet);

router.route("/delete-tweet/:tweetId").delete(verifyJWT, deleteTweet);

export default router;
