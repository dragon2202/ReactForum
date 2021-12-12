const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const { ApolloServer } = require('apollo-server-koa')
const { makeExecutableSchema } = require('graphql-tools')
const { resolvers, typeDefs } = require("./schemas")

const app = new Koa()
const router = new Router()

const PORT = parseInt(process.env.PORT) || 4000

const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers})
})

server.applyMiddleware({app, cors: false})

if(process.env.NODE_ENV === 'production') {
    app.use(serve(path.join(__dirname, './public')))
    router.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
    })
    app.use(router.routes()).use(router.allowedMethods())
}

app.listen({port: PORT}, () => {
    console.log(` Server ready at http://localhost:${PORT + server.graphqlPath}`)
}) 
