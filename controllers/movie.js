import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

// getMovieDetails
export const getMovieDetails = async (req, res) => {
    try {
        const { imdbId } = req.params;
        let movie = await Movie.findOne({ imdbId: imdbId }).populate({
            path: 'reviews',
            populate: {
                path: 'userId',
                select: 'firstName lastName picturePath -_id'
            }
        }).exec();

        if (!movie) {
            // If the movie is not found, create a new record
            movie = new Movie({ imdbId: imdbId, likes: [], reviews: [] });
            await movie.save();
        }

        // Prepare the review details to include content and date
        const reviewsWithDetails = movie.reviews.map(review => {
            return {
                id: review._id,
                content: review.reviewText,
                date: review.createdAt,
                user: {
                    name: review.userId.firstName + ' ' + review.userId.lastName,
                    picturePath: review.userId.picturePath // Including picturePath
                }
            };
        });

        // Return movie details with full review content
        res.json({
            ...movie.toObject(), // Convert the mongoose document to a plain object
            reviews: reviewsWithDetails
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const likeMovie = async (req, res) => {
    const { imdbId } = req.params;
    const userId = req.user.id;

    try {
        let movie = await Movie.findOne({ imdbId: imdbId });
        if (!movie) {
            movie = new Movie({ imdbId: imdbId });
            await movie.save();
        }

        if (!movie.likes.includes(userId)) {
            movie.likes.push(userId);
            await movie.save();
        }

        res.status(200).json({ message: "Liked successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const unlikeMovie = async (req, res) => {
    const { imdbId } = req.params;
    const userId = req.user.id;

    try {
        let movie = await Movie.findOne({ imdbId: imdbId });

        if (movie && movie.likes.includes(userId)) {
            movie.likes = movie.likes.filter(id => id.toString() !== userId);
            await movie.save();
        }

        res.status(200).json({ message: "Unliked successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addMovieReview = async (req, res) => {
    const { imdbId } = req.params;
    const { reviewText } = req.body;
    const userId = req.user.id;

    try {
        let movie = await Movie.findOne({ imdbId: imdbId });
        if (!movie) {
            movie = new Movie({ imdbId: imdbId });
            await movie.save();
        }

        const review = new Review({ userId, reviewText });
        await review.save();

        movie.reviews.push(review._id);
        await movie.save();

        res.status(200).json({ message: "Review added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeMovieReview = async (req, res) => {
    const { imdbId, reviewId } = req.params;

    try {
        const movie = await Movie.findOne({ imdbId: imdbId });
        if (movie) {
            movie.reviews = movie.reviews.filter(id => id.toString() !== reviewId);
            await movie.save();
            await Review.findByIdAndDelete(reviewId);
        }

        res.status(200).json({ message: "Review removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};