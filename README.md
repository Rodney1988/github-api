# Github API Summary

An API built with React-Query V. 3 to deep dive on some React-Query capabilites, Firebase cloud functions, and other features as well.
This simple application connects to the [Github API](https://developer.github.com/v3/) and uses Github's Octokit API library to query for users, and additionally also provides the user's reposotitories.

The application consists of an SPA of two page components, a HomePage and an Instructions page. Additional signup and login pages are built using Firebase authentication and custom firebase cloud functions (making node/express APIs).

The HomePage lets the user search for a github user and it's popularity (follower-count). React-query is used for querying Octokit and having performant caching features.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
