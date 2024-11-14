import { Video } from "../models/video.model.js";
import Subscription from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    // Fetch channel statistics using aggregation pipeline
    const stats = await Video.aggregate([
        { $match: { channel: channelId } },
        {
            $group: {
                _id: null,
                totalVideos: { $sum: 1 },
                totalLikes: { $sum: { $size: "$likes" } },
                totalViews: { $sum: "$views" },
            },
        },
    ]);

    // Fetch total subscribers using a separate count query
    const totalSubscribers = await Subscription.countDocuments({
        channel: channelId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos: stats[0] ? stats[0].totalVideos : 0,
                totalLikes: stats[0] ? stats[0].totalLikes : 0,
                totalViews: stats[0] ? stats[0].totalViews : 0,
                totalSubscribers,
            },
            "Channel stats fetched successfully"
        )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    // Fetch videos from the database
    const videos = await Video.find({ channel: channelId });

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
