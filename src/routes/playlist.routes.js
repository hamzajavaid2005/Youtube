import express from "express";
import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/create-playlist").post(verifyJWT, createPlaylist);

router.route("/get-user-playlists").get(verifyJWT, getUserPlaylists);

router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById);

router.route("/add-video-to-playlist").post(verifyJWT, addVideoToPlaylist);

router
    .route("/remove-video-from-playlist")
    .post(verifyJWT, removeVideoFromPlaylist);

router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist);

router.route("/update-playlist/:playlistId").put(verifyJWT, updatePlaylist);

export default router;
