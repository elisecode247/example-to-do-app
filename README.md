# Example Project - To Do List App
For CodeLou Full-stack Javascript Class 2021

### Demo: [Pending] (Optional)
### User stories:

- As an authenticated user, I can see my personal to-do list
- As an authenticated user, I can add items to my to-do list
- As an authenticated user, I can edit items on my to-do list
- As an authenticated user, I can delete items on my to-do list

### Planning
1. Initialize Project
   - README initial set up for planning
   - Editor Linting (EsLint)
   - Test Runner (mocha)
   - Babel
   - Logger (hindsight - pending)
   - Nodemon Dev tool
   - Express server
   - .env file (Environment Variables)
   - package.json
2. Set up Routes with Unit Tests and Debugging With Postman
3. Set up Sqlite and Sequelize and Unit Test
4. Set up GitHub oAuth authentication
5. Set up route authorization
6. Refactoring/Improve Code Quality
7. Set up API Documentation
8. Deploy On Heroku

### Database Design
**user**
- id (auto-generated with sqlite)
- uuid
- username
- password (hashed with salt - MD5 or SHA1)
- createdAt (auto-generated with sqlite)
- updatedAt (auto-generated with sqlite)

**task**
- id (auto-generated with sqlite)
- uuid
- userId (foreign key)
- content
- isComplete
- createdAt (auto-generated with sqlite)
- updatedAt (auto-generated with sqlite)

### Possible Next Steps (Optional)
- Build Front End
- Encrypt content for user privacy
- Allow unauthenticated users to create temporary to-do lists
- Static code analysis (Sonarqube)
- Sqlite associations for task and user
- Access and refresh tokens for sessions
- Redirect to path before authentication

## Server Technology, Libraries, and Tools
- ExpressJs
- Sequelize
- Sqlite
- Passport
- MochaJs

## Client Technology, Libraries, and Tools (Optional)
- [Pending]

## How To Run App Locally
1. Install the correct version of node listed in package.json (Use nvm to manage switching node versions)
2. `$ npm ci`
3. `$ npm run serve`

## How to Run Unit Tests
1. `$ npm run serve-sandbox`
2. In another terminal `$ npm run test-sandbox`

## Note To Self
- all api errors will return json and all url errors will return error pages
## References
- [Silence npm errors when running eslint](https://github.com/eslint/eslint/issues/7933)
- [Fields in a user table](https://dba.stackexchange.com/questions/3537/what-are-some-common-and-useful-fields-for-a-users-table-in-a-database)
- [Sql Naming conventions](https://www.sqlshack.com/learn-sql-naming-conventions/)
- [List of common passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords)
- [Reserved words in sqlite](http://www3.sqlite.org/lang_keywords.html)
- [Best Practices for api design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [Git commit emojis](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
- [Node Logger](https://www.twilio.com/blog/guide-node-js-logging)
- [Errors in Node](https://www.joyent.com/node-js/production/design/errors)
- [Project Structure](https://softwareontheroad.com/ideal-nodejs-project-structure/)
- [Integration Tests](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
- [How To Choose an npm library](https://dev.to/adrianbdesigns/checklist-for-choosing-an-optimal-npm-package-4dpm)
- [.env for Heroku](https://stackoverflow.com/questions/42109813/node-js-environment-variables-and-heroku-deployment)
