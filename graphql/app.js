const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const { makeExecutableSchema } = require('graphql-tools')
const { resolvers, typeDefs } = require("./schemas")

const app = new Koa()

const PORT = process.env.PORT || 4000

const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers})
})

server.applyMiddleware({app})

app.listen({port: PORT}, () => {
    console.log(` Server ready at http://localhost:${PORT + server.graphqlPath}`)
})