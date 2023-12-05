import User from "../models/User.js";
// getMovieDetails
export const getMovieDetails = async (req, res) => {
    // Fetch movie details from your database or third-party API
};

export const likeMovie = async (req, res) => {
    // Find the movie by externalId and add the user's ID to the likes array
};

export const unlikeMovie = async (req, res) => {
    // Find the movie by externalId and remove the user's ID from the likes array
};

export const addMovieReview = async (req, res) => {
    // Add a new review to the movie
};

export const removeMovieReview = async (req, res) => {
    const { externalId, reviewId } = req.params;
    // Remove a review from the movie by reviewId
};
