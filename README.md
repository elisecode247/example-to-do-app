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
2. Set up Routes with Unit Tests and Debugging With Postman
3. Set up PassportJs Authorization
4. Set up MySql and Sequelize
5. Set up Documentation
6. Deploy On Heroku

### Database Design
**user**
- id
- email
- password_salt
- password_hashed (hashed with salt - MD5 or SHA1)
- created_at

**list**
- id
- user_id (foreign key)
- title
- description_text

**list_item**
- id
- list_id
- content
- is_complete

### Possible Next Steps (Optional)
- Build Front End
- Allow unauthenticated users to create temporary to-do lists

## Server Technology, Libraries, and Tools
- ExpressJs
- Sequelize
- MySql
- Passport
- MochaJs

## Client Technology, Libraries, and Tools (Optional)
- [Pending]

## How To Run App Locally
[Pending]

## How to Run Unit Tests
[Pending]

## References
- [Silence npm errors when running eslint](https://github.com/eslint/eslint/issues/7933)
- [Fields in a user table](https://dba.stackexchange.com/questions/3537/what-are-some-common-and-useful-fields-for-a-users-table-in-a-database)
- [Sql Naming conventions](https://www.sqlshack.com/learn-sql-naming-conventions/)
- [List of common passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords)
- [Reserved words in mysql](https://dev.mysql.com/doc/refman/8.0/en/keywords.html)
- [Best Practices for api design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [Git commit emojis](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
- [Node Logger](https://www.twilio.com/blog/guide-node-js-logging)
