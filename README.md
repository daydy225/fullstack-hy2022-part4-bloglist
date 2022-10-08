# Part 4 Excercises

## blog list step 1

Create blog list application, that allows users to save information about a list blogs.
For each listed blog it be will be saved the author, title, url, and amount of upvotes from users of the application.

## blog list step 2

Refactor the application into separate modules as shown earlier in this part of the course material.

## blog list step 3: helper function and unit test, step 1

define a dummy function that receives an array of blog posts as a parameter and always returns the value 1
And testing this function.


## blog list step 4: helper function and unit test, step 2

Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts, write and appropriate test for it.


## blog list step 5: helper function and unit test, step 3

Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

## blog list step 6: helper function and unit test, step 4

Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs

## blog list step 7: helper function and unit test, step 5

Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes.

# Blog list tests

## step 1

Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

## step 2

Write a test that verifies that the unique identifier property of the blog posts is named id.

## step 3

Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database

## step 4

Write a test that verifies that if the likes property is missing from the request, it will default to the value 0

## step 5

Write a test related to creating new blogs via the /api/blogs endpoint, that verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request

# Blog list Expansions

## step 1

Implement functionality for deleting a single blog post resource.

## step 2

Implement functionality for updating the information of an individual blog post

## step 3

Implement a way to create new users.
## step 4

Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique