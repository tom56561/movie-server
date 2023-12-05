import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    externalId: {
        type: String,
        required: true,
        unique: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;