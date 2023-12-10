import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

// getMovieDetails
export const getMovieDetails = async (req, res) => {
  console.log("getMovieDetails");
  try {
    const { imdbId } = req.params;
    let movie = await Movie.findOne({ imdbId: imdbId })
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: "firstName lastName picturePath location _id",
        },
      })
      .exec();

    // Prepare the review details to include content and date
    const reviewsWithDetails = movie.reviews.map((review) => {
      return {
        id: review._id,
        content: review.reviewText,
        date: review.createdAt,
        user: {
          userId: review.userId._id,
          name: review.userId.firstName + " " + review.userId.lastName,
          picturePath: review.userId.picturePath, // Including picturePath
          location: review.userId.location,
        },
      };
    });
    reviewsWithDetails.reverse();

    // Return movie details with full review content
    res.json({
      ...movie.toObject(), // Convert the mongoose document to a plain object
      reviews: reviewsWithDetails,
    });
  } catch (err) {
    res.json(
      await Movie.create({ imdbId: req.params.imdbId, likes: [], reviews: [] })
    );
  }
};

export const likeMovie = async (req, res) => {
    console.log("likeMovie");
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
  console.log("unlikeMovie");
  const { imdbId } = req.params;
  const userId = req.user.id;

  try {
    let movie = await Movie.findOne({ imdbId: imdbId });

    if (movie && movie.likes.includes(userId)) {
      movie.likes = movie.likes.filter((id) => id.toString() !== userId);
      await movie.save();
    }

    res.status(200).json({ message: "Unliked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMovieReview = async (req, res) => {
  console.log("addMovieReview");
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
  console.log("removeMovieReview");
  const { imdbId, reviewId } = req.params;
  console.log(imdbId, reviewId);

  try {
    const movie = await Movie.findOne({ imdbId: imdbId });
    if (movie) {
      movie.reviews = movie.reviews.filter((id) => id.toString() !== reviewId);
      await movie.save();
      await Review.findByIdAndDelete(reviewId);
    }
    res.status(200).json({ message: "Review removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
