## User Roles and Permissions

### Regular Users
- **Can Like Movies**: Regular users can express their appreciation for movies by liking them.
- **Search Movies**: Access to search and explore the movie database.

### Critics
- **All Regular User Permissions**: Critics have all the permissions of regular users.
- **Can Review Movies**: They can write detailed reviews for movies, providing insights and ratings.

### Admin
- **All Critic Permissions**: Admins have all the permissions of critics.
- **Manage Reviews**: Admins can delete reviews that do not adhere to community guidelines or standards.

### Anonymous Users (No Login)
- **Search Movies**: They can search and view movies but cannot like or review them.

## Movie API Endpoints

#### Get Movie Details
- GET /details/:imdbId
- Access: Public
- Description: Fetches details of a movie using IMDb ID.
- Parameters: imdbId - IMDb ID of the movie.



#### Like a Movie
- POST /like/:imdbId
- Access: Regular Users, Critics
- Description: Likes a movie.
- Parameters: imdbId - IMDb ID of the movie.
- Authorization: Bearer Token required.

#### Unlike a Movie
- DELETE /like/:imdbId
- Access: Regular Users, Critics
- Description: Unlikes a movie.
- Parameters: imdbId - IMDb ID of the movie.
- Authorization: Bearer Token required.

#### Add a Movie Review
- POST /review/:imdbId
- Access: Critics
- Description: Adds a review to a movie.
- Parameters: imdbId - IMDb ID of the movie.
- Body: reviewText - Text of the review.
- Authorization: Bearer Token required.

#### Remove a Movie Review
- DELETE /review/:imdbId/:reviewId
- Access: Admins
- Description: Removes a specific review from a movie.
- Parameters: imdbId - IMDb ID of the movie. reviewId - ID of the review to remove.
- Authorization: Bearer Token required.
