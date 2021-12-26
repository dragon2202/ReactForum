const Koa = require('koa')
const Router = require('koa-router')
const send = require('koa-send')
const static = require('koa-static')
const { ApolloServer } = require('apollo-server-koa')
const { makeExecutableSchema } = require('graphql-tools')
const { resolvers, typeDefs } = require("./schemas")

const PORT = 4000

const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers })
})

const app = new Koa()
const router = new Router()
server.applyMiddleware({ app })

if (process.env.NODE_ENV === 'production') {
    app.use(static('./public'));

    router.get('*', async (ctx, next) => {
        try {
            await send(ctx, './public/index.html');
        } catch (err) {
            // TODO: handle err?
            return next();
        }
    });
}

app.listen({ port: PORT }, () => {
    console.log(` Server ready at http://localhost:${PORT + server.graphqlPath}`)
})