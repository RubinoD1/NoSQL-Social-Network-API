# NoSQL Social Network API

GitHub Repository: https://github.com/RubinoD1/NoSQL-Social-Network-API

## Intro

User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Table of Contents

- [Video Guide](#video-guide)
- [Pseudocode](#pseudocode)
- [Models Guide](#models-guide)
- [API Routes Guide](#api-routes-guide)


## Video Guide <a name="video-guide"></a>

Video guide link: https://drive.google.com/file/d/1UjhOxWeKa_pL70TvjDc1ZrNdJg6uRfwR/view

## Pseudocode <a name="pseudocode"></a>

Express.js for routing /  A MongoDB database  /  Mongoose ODM  
--- May Optionally Use: a JS date library or the native JS Date Object to format timestamps 

1) When I enter the command to invoke the application:
- THEN my server is started and the Mongoose models are synced to the MongoDB database.

2) WHEN I open API GET routes in Insomnia for users and thoughts
-  THEN the data for each of these routes is displayed in a formatted JSON

3) WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database

4) WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts 
- and add and remove friends to a user’s friend list

## Models Guide <a name="models-guide"></a>
```
USER

Username 
- string 
- unique
- required
- trimmed

Email 
- string 
- required
- unique 
- match a valid email (look into Mongoose's matching validation)

Thoughts 
- Array of _id values refrencing the Thought model 

Friends 
Array of _id values refrencing the User model (self-refrence)

Schema settings: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
```
```
Thought 

thoughtText
- string 
- required
- must be between 1 and 280 characters

createdAt
- date
- Set default value to the current timestamp on query

username (The user that created this thought)
- string 
- required

reactions (These are like replies)
- Array of nested documents created with the reactionSchema

Schema settings: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
```
```
Reaction (SCHEMA ONLY)

reactionId
- Use Mongoose's ObjectId data type
- Default value is set to a new ObjectId

reactionBody 
- string 
- required
- 280 characters maximum

username 
- string 
- required

createdAt
- date 
- Set default value to the current timestamp
- Use a getter method to format the timestamp on query

Schema settings: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
```

## API Routes Guide <a name="api-routes-guide"></a>
```
/api/users
```
- GET all users 
- GET a single user by its _id and populated thought and friend data 
- POST a new user:

```
// example data
{
  "username": "Diane",
  "email": "test@gmail.com"
}
```
- PUT to update a user by its _id 
- DELETE to remove a user by its _id 

** BONUS: Remove a user's associated thoughts when deleted. **

```
/api/users/:userId/friends/:friendId
```
- POST to add a new friend to a user's friend list
- DELETE to remove a friend from a user's friend list

```
/api/thoughts
```
- GET to get all thoughts 
- GET to get a single thought by its _id
- POST to create a new thought 
(don't forget to push the created thought's _id to the associated user's thoughts array field)

```
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "Diane",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- PUT to update a thought by its _id 
- DELETE to remove a thought by its _id 

```
/api/thoughts/:thoughtId/reactions
```
- POST to create a reaction stored in a single thought's reactions array field
- DELETE to pull and remove a reaction by the reaction's reactionId value