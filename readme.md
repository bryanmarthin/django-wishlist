Let's make the site without login.

There is feed in the homepage. On the top there is input box for new wishlists.
When users enter new wishlist the feed should be updated.

1. Homepage feed
GET /api/v1/feed: get all posts from DB and return JSON that describes all available posts
GET /: call this API and based on this JSON, render the view using JS.

2. Add wishes
POST /api/v1/wish/: insert entry in DB and return JSON response
AJAX /: call this API, send POST JSON request, get JSON response, insert new post at the top.

3. Delete wish:
In wish box, give x button, which when pressed, asking the user to confirm 
that they want to delete the wish.

When confirmed, sent AJAX DELETE request to /api/v1/wish/<pk>. This in turn,
delete entry in DB and return JSON indicating whether the request is successful.



Homepage feed:
View: div boxes containing posts data.
Posts data: id, username (static for now), timestamp, text
Model -> serialized -> JSON -> API calls -> View

Adding wishes:
textarea -> POST request to API -> Django Model -> Response -> JSON -> View

How to run the Django server:
1. Install Python 3.4.3 or later
2. pip install -r requirements.txt
3. python manage.py runserver
4. Open the page at http://127.0.0.1:8000
