## What to do now?
Alright, so go to the site for the first time, load, the serve the index.html file

but still, everything bundled into bundle.js, so browser route

index.html is what is showing up, don't want that
I want just / 

served index.html and bundle and css, great
How to access the path {/}
put a link that does that

Implement lazy loading
so when you reach last element, and it's 100 percent visible, load new elements and render them 

have an array of groups of 10 posts  stored as a 

parent will have to rerender because they have new data,
if parent rerender, that means, their children will also rerender
, prevent children from rerendering, in a child, create shouldComponentUpdate, and return false, for now.

children will only have new data if they have something changed. 

User sign in, sign out, login as guest, stay logged in,  stay logged out

### get email and password, make a query to database with select, if it returns something, cool, generate a jwt, with user_id, first name and last name and send it to the user in the header
user  saves that in a cookie,
also send the single page application, index and bundle and etc

when you are on /home, you will be checked if your cookie has jwt and it is valid
for eact subsequent request, send jwt to the server

### 
element loads first pointer in local browser cache, when you change the pointer, update the pointer in local storage also

###
configuring routing to sign up and sign in and jwt authentication.

### Working Routing and authentication
- user visits pages "/", check if has jwt, if so redirect him to home, 
- if not, redirect him to /login. 
- display the login.html or sign up.html
- post data to /authenticate to check if valid user, then after that middleware, to jwt signing

### Login 
- button function submits data to /login as post,
- get email and password from login req
- query database using params
- return result[0]
- if no user send error
- if user, move to / with a token and send in header token 

### Login as guest

### 
Database functions
Sign Up
Public Chat forum
Sign Out
Menu Bar
My profile page

Create 
User
Post
Projects
Project Categories
User project following
Project category relationship
