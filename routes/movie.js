import express from "express";
import {
  getMovieDetails,
  likeMovie,
  unlikeMovie,
  addMovieReview,
  removeMovieReview
} from "../controllers/movies.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

// Get movie details (accessible to all, including anonymous users)
router.get("/details/:externalId", getMovieDetails);

// Like a movie (only regular users and critics)
router.post("/like/:externalId", verifyToken, checkRole(['regular', 'critic']), likeMovie);

// Unlike a movie (only regular users and critics)
router.delete("/like/:externalId", verifyToken, checkRole(['regular', 'critic']), unlikeMovie);

// Add a review to a movie (only critics)
router.post("/review/:externalId", verifyToken, checkRole(['critic']), addMovieReview);

// Remove a review from a movie (only admins)
router.delete("/review/:externalId/:reviewId", verifyToken, checkRole(['admin']), removeMovieReview);

export default router;