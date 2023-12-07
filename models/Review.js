import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewText: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Review = mongoose.model("Review", reviewSchema);
export default Review;