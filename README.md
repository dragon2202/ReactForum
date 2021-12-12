# React Forum
This project is a forum much like Reddit, built with React, AntD(React UI), Koa.js, Apollo Graphql, MySQL. I wish I could deploy it to let people mess with it, but heroku kept giving me errors.

## Tech Used 
### React(https://reactjs.org/)
I just wanted to learn React, and after using it I fell in love with its simplicity, speed, and efficiency. Using React Hooks and experimenting with states was so much fun, I proabably won't change to Angular, or Vue.
### Apollo GraphQl(https://graphql.org/)
Its the best technology for backend I ever used. It can aggregate objects, way better than anything else in my opinion.
Below is an example of a query used for View Account. I need the user's information, the posts he has created and the comments on the posts, and his personal comments. I could nest queries together with Foreign Keys, IDs that lead to another table in MySQL and nest them together to have objects within objects. From Post, I can grab both community, and comments from post's id, that's just plain cool.
<img src="/screenshots/graphql.png" width="100%">
### AntD(https://ant.design/) 
A React Material UI. I used it so I can have highly customized components such as Buttons, Lists, Cards, etc. AntD blows bootstrap out the water with its level of customization of components.
### Knex.js(https://knexjs.org/)
Its a SQL query builder, makes writing server side code to sql way easier. Knex: knex('books').insert({title: 'Slaughterhouse Five'})
MySQL: insert into `books` (`title`) values ('Slaughterhouse Five'). It's just easier and remember to use as JS functions.

## Other Honrable Mentions of tech I used
SASS(https://sass-lang.com/), React Image Upload(https://www.npmjs.com/package/react-images-uploading), a component that allows me to upload images, React Cookies(https://www.npmjs.com/package/react-cookie) for allowing me use cookies to store of user's login information.

## Questions
I respond to emails within a day or so, so feel free to ask me any questions. Spam and unwanted harrassment will lead to a block.

### Email: tcalvin9@gmail.com

### Home Page
It displays the most recent post from the entire website.
<img src="/screenshots/home.png" width="100%">
### Community
This page is for groups to hang out and post content for their community
<img src="/screenshots/community.png" width="100%">
### Community Home
Lists of all communities
<img src="/screenshots/communities_page.png" width="100%">
### Create Post
Page to create post whether its a text, link, or an image to a selected community
<img src="/screenshots/createpost.png" width="100%">
### Send Message
Page to send a message, to anyone within the community. You can also send to multpile people.
<img src="/screenshots/sendmessage.png" width="100%">
### Inbox
Page to view and respond to messages
<img src="/screenshots/inbox.png" width="100%">
### View Account
Page to view another person's profile, what they posted, commented
### View Account Overview
Shows both comments and posts by date
<img src="/screenshots/view_account_overview.png" width="100%">
### View Account Post
<img src="/screenshots/view_account_post.png" width="100%">
### View Account Comments
<img src="/screenshots/view_account_comments.png " width="100%">
### Personal Account
Shows all the posts from all communities you are a part of. It also shows you all the posts you have posted. A one stop shop to see your activity
<img src="/screenshots/personalaccount.png " width="100%">
### Account Settings
Page to change password/add a personal security question(s), and change username/email
<img src="/screenshots/accountsettings.png " width="100%">
