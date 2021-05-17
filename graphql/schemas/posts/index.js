const fs = require('fs')
const path = require('path')
const PostService = require('../../api/posts')
const { errorHandler } = require('../../api/utils')

module.exports = {
    resolvers: {
        Query: {
            getPost: async (parent, {id}) => {
                const post = await PostService.getPost(id)
                return post
            },
            getPostsRecent: async (parent, {id}) => {
                const post = await PostService.getPostsRecent(id)
                return post
            },
            getUser: async (parent, {id}) => {
                const post = await PostService.getUser(id)
                return post
            },
            checkUserEmail: async (parent, {email}) => {
                const post = await PostService.checkUserEmail(email)
                return post
            },
            loginUser: async (parent, {email, password}) => {
                const post = await PostService.loginUser(email, password)
                return post
            },
            getCommunity: async (parent, {id}) => {
                const post = await PostService.getCommunity(id)
                return post
            },
            getAllCommunities: async (parent, {id}) => {
                const post = await PostService.getAllCommunities(id)
                return post
            },
            getCommunity_Posts_Users_Category: async (parent, {id}) => {
                const post = await PostService.getCommunity_Posts_Users_Category(id)
                return post
            },
            getPosts_CommunityPosts: async (parent, {id}) => {
                const post = await PostService.getPosts_CommunityPosts(id)
                return post
            },
            getCategoryCommunity: async (parent, {id}) => {
                const post = await PostService.getCategoryCommunity(id)
                return post
            },
            getCategory_CategoryCommunity: async (parent, {id}) => {
                const post = await PostService.getCategory_CategoryCommunity(id)
                return post
            },
            getCommunityUserRole: async (parent, {id}) => {
                const post = await PostService.getCommunityUserRole(id)
                return post
            }
        },
        Post: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id),
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id)
        },
        Community: {
            post: async (obj, args, context, info) => await PostService.getPosts_CommunityPosts(obj.id),
            category: async (obj, args, context, info) => await PostService.getCategory_CategoryCommunity(obj.id)
        },
        CategoryCommunity: {
            category: async (obj, args, context, info) => await PostService.getCategory_CategoryCommunity(obj.id)
        },
        CommunityUserRole: {
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id)
        },
        Mutation: {
            createPost: async (parent, args) => await PostService.createPost(args.post),
            registerUser: async (parent, args) => await PostService.registerUser(args.user)
        }
    },
    schema: fs.readFileSync(
        path.resolve(
            __dirname,
            './posts-schema.graphql'
        )
    ).toString()
}