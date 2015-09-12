Let's make the site without login.

There is feed in the homepage. On the top there is input box for new wishlists.
When users enter new wishlist the feed should be updated.

1. Homepage feed
GET /api/v1/feed: get all posts from DB and return JSON that describes all available posts
GET /: call this API and based on this JSON, render the view using JS.

2. Add wishes
POST /api/v1/wish/: insert entry in DB and return JSON response
AJAX /: call this API, send POST JSON request, get JSON response, insert new post at the top.

3. Delete wishes
DELETE /api/v1/wish/: delete entry in DB and return JSON response whether it's successful or not.
AJAX /: call this API and based on this JSON, delete the post (delete the div and its children).


Homepage feed:
View: div boxes containing posts data.
Posts data: id, username (static for now), timestamp, text
Model -> serialized -> JSON -> API calls -> View

Adding wishes:
