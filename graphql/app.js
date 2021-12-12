const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const { ApolloServer } = require('apollo-server-koa')
const { makeExecutableSchema } = require('graphql-tools')
const { resolvers, typeDefs } = require("./schemas")

const app = new Koa()

if(process.env.NODE_ENV === 'production') {
    app.use(serve('/src/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'src', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000

const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers})
})

server.applyMiddleware({app})

app.listen({port: PORT}, () => {
    console.log(` Server ready at http://localhost:${PORT + server.graphqlPath}`)
})