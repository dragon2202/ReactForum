const fs = require('fs')
const path = require('path')
const PostService = require('../../api/posts')

module.exports = {
    resolvers: {
        Query: {
            getPost: async (parent, {id}) => {
                const post = await PostService.getPost(id)
                return post
            },
            getPostsbyAuthorID: async (parent, {post_id, author_id}) => {
                const post = await PostService.getPostsbyAuthorID(post_id, author_id)
                return post
            },
            getPostsRecent: async (parent, {id}) => {
                const post = await PostService.getPostsRecent()
                return post
            },
            getPosts_CommunityPosts: async (parent, {id}) => {
                const post = await PostService.getPosts_CommunityPosts(id)
                return post
            },
            getPost_Comments: async (parent, {id}) => {
                const post = await PostService.getPost_Comments(id)
                return post
            },
            getCommunity: async (parent, {id}) => {
                const post = await PostService.getCommunity(id)
                return post
            },
            getAllCommunities: async (parent, {id}) => {
                const post = await PostService.getAllCommunities()
                return post
            },
            getCommunity_Posts_Users: async (parent, {id}) => {
                const post = await PostService.getCommunity_Posts_Users(id)
                return post
            },
            getCommunity_User: async (parent, {id}) => {
                const post = await PostService.getCommunity_User(id)
                return post
            },
            checkCommunityName: async (parent, {name}) => {
                const post = await PostService.checkCommunityName(name)
                return post
            },
            getCommunityBans: async (parent, {id}) => {
                const post = await PostService.getCommunityBans(id)
                return post
            },
            getCommunityUserRole: async (parent, {id}) => {
                const post = await PostService.getCommunityUserRole(id)
                return post
            },
            getCommunityUserRoleByUser: async (parent, {id}) => {
                const post = await PostService.getCommunityUserRoleByUser(id)
                return post
            },
            getCommunityUserRoleByCommunity: async (parent, {id}) => {
                const post = await PostService.getCommunityUserRoleByCommunity(id)
                return post
            },
            getComment: async (parent, {id}) => {
                const post = await PostService.getComment(id)
                return post
            },
            getCommentsbyPostID: async (parent, {id}) => {
                const post = await PostService.getCommentbyPostID(id)
                return post
            },
            getFamilyComments: async (parent, {id}) => {
                const post = await PostService.getFamilyComments(id)
                return post
            },
            getChildComments: async (parent, {id}) => {
                const post = await PostService.getChildComments(id)
                return post
            },
            getRolesPermissions: async (parent, {id}) => {
                const post = await PostService.getRolesPermissions(id)
                return post
            },
            getRole: async (parent, {id}) => {
                const post = await PostService.getRole(id)
                return post
            },
            getPermission: async (parent, {id}) => {
                const post = await PostService.getPermission(id)
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
            checkCredentials: async (parent, {id, password}) => {
                const post = await PostService.checkCredentials(id, password)
                return post
            }
            
        },
        Post: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id),
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id)
        },
        PostComment: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id),
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id),
            comment: async (obj, args, context, info) => await PostService.getCommentsbyPostID(obj.id)
        },
        Comment: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id)
        },
        Community: {
            communityban: async (obj, args, context, info) => await PostService.getCommunityBans(obj.id),
            post: async (obj, args, context, info) => await PostService.getPosts_CommunityPosts(obj.id),
            communityuserrole: async (obj, args, context, info) => await PostService.getCommunityUserRoleByCommunity(obj.id)
        },
        CommunityUserRole: {
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id),
            user: async (obj, args, context, info) => await PostService.getUser(obj.user_id),
            role: async (obj, args, context, info) => await PostService.getRole(obj.role_id)
        },
        Role: {
            rolespermissions: async (obj, args, context, info) => await PostService.getRolesPermissions(obj.id)
        },
        RolesPermissions: {
            permission: async (obj, args, context, info) => await PostService.getPermission(obj.permission_id)
        },
        CommentFamily: {
            parent: async (obj, args, context, info) => await PostService.getComment(obj.parent_comment_id),
            child: async (obj, args, context, info) => await PostService.getChildComments(obj.id)
        },
        Mutation: {
            createPost: async (parent, args) => await PostService.createPost(args.post),
            updatePost: async (parent, args) => await PostService.updatePost(args.post),
            deletePost: async (parent, args) => await PostService.deletePost(args.post),
            lockPost: async (parent, args) => await PostService.lockPost(args.post),
            createComment: async(parent, args) => await PostService.createComment(args.comment),
            updateComment: async (parent, args) => await PostService.updateComment(args.comment),
            deleteComment: async (parent, args) => await PostService.deleteComment(args.comment),
            deleteParentComment: async (parent, args) => await PostService.deleteParentComment(args.comment),
            createCommunity: async (parent, args) => await PostService.createCommunity(args.communityUser),
            updateCommunityUserRole: async (parent, args) => await PostService.updateCommunityUserRole(args.communityuserrole),
            updateCommunityDetails: async (parent, args) => await PostService.updateCommunityDetails(args.community),
            createUser_CommunityUserRole: async (parent, args) => await PostService.createUser_CommunityUserRole(args.communityuserrole),
            removeUser_CommunityUserRole: async (parent, args) => await PostService.removeUser_CommunityUserRole(args.communityuserrole),
            banUser: async (parent, args) => await PostService.banUser(args.communityban),
            registerUser: async (parent, args) => await PostService.registerUser(args.user),
            changeUserInfo: async (parent, args) => await PostService.changeUserInfo(args.user),
            changeUserPassword: async (parent, args) => await PostService.changeUserPassword(args.user)
        }
    },
    schema: fs.readFileSync(
        path.resolve(
            __dirname,
            './posts-schema.graphql'
        )
    ).toString()
}