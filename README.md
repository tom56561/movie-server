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
- **Access other profile**

## Endpoints

### Auth Routes

#### Login
- **POST** `/auth/login`
  - Authenticates a user
  - **Body**: `{ email: String, password: String }`

### User Routes

#### Get User
- **GET** `/profile/:id`
  - Retrieves a user's profile
  - **Parameters**: `id` - User's ID
  - **Authorization**: Bearer Token required

#### Get User Friends
- **GET** `/profile/:id/friends`
  - Retrieves a user's friends list
  - **Parameters**: `id` - User's ID
  - **Authorization**: Bearer Token required

#### Add/Remove Friend
- **PATCH** `/profile/:id/:friendId`
  - Adds or removes a friend
  - **Parameters**: 
    - `id` - User's ID
    - `friendId` - Friend's ID
  - **Authorization**: Bearer Token required

#### Update User
- **PATCH** `/profile/:id`
  - Updates a user's profile
  - **Parameters**: `id` - User's ID
  - **Body**: JSON object with fields to update
  - **Authorization**: Bearer Token required

### Post Routes

#### Get Feed Posts
- **GET** `/posts/`
  - Retrieves feed posts
  - **Authorization**: Bearer Token required

#### Get User Posts
- **GET** `/posts/:userId/posts`
  - Retrieves posts by a specific user
  - **Parameters**: `userId` - User's ID
  - **Authorization**: Bearer Token required

#### Like Post
- **PATCH** `/posts/:id/like`
  - Likes a post
  - **Parameters**: `id` - Post's ID
  - **Authorization**: Bearer Token required

### Movie Routes

#### Get Movie Details
- **GET** `/movie/details/:imdbId`
  - Retrieves details of a movie
  - **Parameters**: `imdbId` - IMDb ID of the movie
  - **Access**: Public

#### Like a Movie
- **POST** `/movie/like/:imdbId`
  - Likes a movie
  - **Parameters**: `imdbId` - IMDb ID of the movie
  - **Authorization**: Bearer Token required
  - **Access**: Regular Users, Critics

#### Unlike a Movie
- **DELETE** `/movie/like/:imdbId`
  - Unlikes a movie
  - **Parameters**: `imdbId` - IMDb ID of the movie
  - **Authorization**: Bearer Token required
  - **Access**: Regular Users, Critics

#### Add a Movie Review
- **POST** `/movie/review/:imdbId`
  - Adds a review to a movie
  - **Parameters**: `imdbId` - IMDb ID of the movie
  - **Body**: `{ reviewText: String }`
  - **Authorization**: Bearer Token required
  - **Access**: Critics

#### Remove a Movie Review
- **DELETE** `/movie/review/:imdbId/:reviewId`
  - Removes a review from a movie
  - **Parameters**: 
    - `imdbId` - IMDb ID of the movie
    - `reviewId` - ID of the review
  - **Authorization**: Bearer Token required
  - **Access**: Admin