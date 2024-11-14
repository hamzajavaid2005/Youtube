import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import Comment from "../models/comment.model.js";
import Tweet from "../models/tweet.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId?.trim()) {
        throw new ApiError(400, "Video id is required");
    }

    const userId = req.user._id;

    // Use aggregation to toggle like
    const video = await Video.aggregate([
        { $match: { _id: videoId } },
        {
            $addFields: {
                likes: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $setDifference: ["$likes", [userId]] }, // Remove userId from likes
                        else: { $concatArrays: ["$likes", [userId]] }, // Add userId to likes
                    },
                },
                likeCount: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $subtract: [{ $size: "$likes" }, 1] }, // Decrement like count
                        else: { $add: [{ $size: "$likes" }, 1] }, // Increment like count
                    },
                },
            },
        },
        {
            $merge: {
                into: "videos", // Update the video collection
                whenMatched: [
                    { $set: { likes: "$likes", likeCount: "$likeCount" } },
                ],
                whenNotMatched: "discard", // Discard if not found
            },
        },
        { $project: { likes: 1, likeCount: 1 } }, // Return only likes and likeCount
    ]);

    if (!video.length) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video[0], "Like toggled successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    //TODO: toggle like on comment

    if (!commentId?.trim()) {
        throw new ApiError(400, "Comment id is required");
    }

    const userId = req.user._id;

    // Use aggregation to toggle like
    const comment = await Comment.aggregate([
        { $match: { _id: commentId } },
        {
            $addFields: {
                likes: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $setDifference: ["$likes", [userId]] }, // Remove userId from likes
                        else: { $concatArrays: ["$likes", [userId]] }, // Add userId to likes
                    },
                },
                likeCount: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $subtract: [{ $size: "$likes" }, 1] }, // Decrement like count
                        else: { $add: [{ $size: "$likes" }, 1] }, // Increment like count
                    },
                },
            },
        },
        {
            $merge: {
                into: "comments", // Update the comment collection
                whenMatched: [
                    { $set: { likes: "$likes", likeCount: "$likeCount" } },
                ],
            },
        },
        { $project: { likes: 1, likeCount: 1 } }, // Return only likes and likeCount
    ]);

    if (!comment.length) {
        throw new ApiError(404, "Comment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment[0], "Like toggled successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    //TODO: toggle like on tweet

    if (!tweetId?.trim()) {
        throw new ApiError(400, "Tweet id is required");
    }

    const userId = req.user._id;

    // Use aggregation to toggle like
    const tweet = await Tweet.aggregate([
        { $match: { _id: tweetId } },
        {
            $addFields: {
                likes: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $setDifference: ["$likes", [userId]] }, // Remove userId from likes
                        else: { $concatArrays: ["$likes", [userId]] }, // Add userId to likes
                    },
                },
                likeCount: {
                    $cond: {
                        if: { $in: [userId, "$likes"] },
                        then: { $subtract: [{ $size: "$likes" }, 1] }, // Decrement like count
                        else: { $add: [{ $size: "$likes" }, 1] }, // Increment like count
                    },
                },
            },
        },
        {
            $merge: {
                into: "tweet", // Update the tweet collection
                whenMatched: [
                    { $set: { likes: "$likes", likeCount: "$likeCount" } },
                ],
            },
        },
        { $project: { likes: 1, likeCount: 1 } }, // Return only likes and likeCount
    ]);

    if (!tweet.length) {
        throw new ApiError(404, "Comment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet[0], "Like toggled successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const userId = req.user._id;

    const videos = await Video.find({ likes: userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "Liked videos fetched successfully")
        );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
