import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import reportWebVitals from './reportWebVitals'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import './assets/scss/base.scss'

const cache = new InMemoryCache()
/* 
The http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection. 
The http link supports both POST and GET requests with the ability to change the http options on a per query basis. 
This can be used for authentication, persisted queries, dynamic uris, and other granular updates. 
*/
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
  cache,
  link: httpLink
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()