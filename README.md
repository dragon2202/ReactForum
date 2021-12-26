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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
