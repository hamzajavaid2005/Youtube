import express from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/get-dashboard-data").get(verifyJWT, getChannelStats);

router.route("/get-channel-videos/:channelId").get(verifyJWT, getChannelVideos);

export default router;
