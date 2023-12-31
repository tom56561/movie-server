import express from "express";
import {
  getMovieDetails,
  likeMovie,
  unlikeMovie,
  addMovieReview,
  removeMovieReview
} from "../controllers/movie.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

// Get movie details (accessible to all, including anonymous users)
router.get("/details/:imdbId", getMovieDetails);

// Like a movie (only regular users and critics)
router.post("/like/:imdbId", verifyToken, checkRole(['regular', 'critic', 'admin']), likeMovie);

// Unlike a movie (only regular users and critics)
router.delete("/like/:imdbId", verifyToken, checkRole(['regular', 'critic', 'admin']), unlikeMovie);

// Add a review to a movie (only critics)
router.post("/review/:imdbId", verifyToken, checkRole(['critic']), addMovieReview);

// Remove a review from a movie (only admins)
router.delete("/review/:imdbId/:reviewId", verifyToken, checkRole(['admin', 'critic']), removeMovieReview);

export default router;