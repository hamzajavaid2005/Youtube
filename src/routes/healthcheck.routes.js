import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = express.Router();

router.route("/healthcheck").get(asyncHandler(verifyJWT, healthcheck));

export default router;
