const fs = require('fs')
const path = require('path')
const PostService = require('../../api/posts')

module.exports = {
    resolvers: {
        Query: {
            //Posts
            getPost: async (parent, {id}) => {
                const post = await PostService.getPost(id)
                return post
            },
            getPostRecentByAuthorID: async (parent, {id}) => {
                const post = await PostService.getPostRecentByAuthorID(id)
                return post
            },
            getPostsbyAuthorID: async (parent, {post_id, author_id}) => {
                const post = await PostService.getPostsbyAuthorID(post_id, author_id)
                return post
            },
            getPostsbyAuthorIDRecent: async (parent, {post_id, author_id}) => {
                const post = await PostService.getPostsbyAuthorIDRecent(post_id, author_id)
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
            //Community
            getCommunity: async (parent, {id}) => {
                const post = await PostService.getCommunity(id)
                return post
            },
            getAllCommunities: async (parent) => {
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
            //Comment
            getComment: async (parent, {id}) => {
                const post = await PostService.getComment(id)
                return post
            },
            getCommentsbyPostID: async (parent, {id}) => {
                const post = await PostService.getCommentbyPostID(id)
                return post
            },
            getCommentsbyAuthorID: async (parent, {id}) => {
                const post = await PostService.getCommentsbyAuthorID(id)
                return post
            },
            getCommentsbyAuthorIDRecent: async (parent, {id}) => {
                const post = await PostService.getCommentsbyAuthorIDRecent(id)
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
            //Roles and Permission
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
            //User
            getUser: async (parent, {id}) => {
                const post = await PostService.getUser(id)
                return post
            },
            getAllUser: async (parent) => {
                const post = await PostService.getAllUser()
                return post
            },
            getViewAccount: async (parent, {id}) => {
                const post = await PostService.getViewAccount(id)
                return post
            },
            //Check Credentials like email and password
            checkUserEmail: async (parent, {email}) => {
                const post = await PostService.checkUserEmail(email)
                return post
            },
            checkUserPassword: async (parent, {id, password}) => {
                const post = await PostService.checkUserPassword(id, password)
                return post
            },
            loginUser: async (parent, {email, password}) => {
                const post = await PostService.loginUser(email, password)
                return post
            },
            //Message
            getMessages: async (parent, {id}) => {
                const post = await PostService.getMessages(id)
                return post
            },
            getSentMessages: async (parent, {id}) => {
                const post = await PostService.getSentMessages(id)
                return post
            },
            //Upvote/Downvote
            checkPostUpvote: async (parent, {author_id, post_id}) => {
                const post = await PostService.checkPostUpvote(author_id, post_id)
                return post
            },
            checkPostDownvote: async (parent, {author_id, post_id}) => {
                const post = await PostService.checkPostDownvote(author_id, post_id)
                return post
            },
            getUpvotes_PostID: async (parent, {id}) => {
                const post = await PostService.getUpvotes_PostID(id)
                return post
            },
            getDownvotes_PostID: async (parent, {id}) => {
                const post = await PostService.getDownvotes_PostID(id)
                return post
            },
            //Security Question
            getSecurityQuestionsByAuthorID: async (parent, {id}) => {
                const post = await PostService.getSecurityQuestionsByAuthorID(id)
                return post
            }
        },
        Post: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id),
            community: async (obj, args, context, info) => await PostService.getCommunity(obj.community_id),
            comment: async (obj, args, context, info) => await PostService.getCommentsbyPostID(obj.id),
            post_upvotes: async (obj, args, context, info) => await PostService.getUpvotes_PostID(obj.id),
            post_downvotes: async (obj, args, context, info) => await PostService.getDownvotes_PostID(obj.id)
        },
        Comment: {
            user: async (obj, args, context, info) => await PostService.getUser(obj.author_id),
            post: async (obj, args, context, info) => await PostService.getPost(obj.post_id),
            parent: async (obj, args, context, info) => await PostService.getComment(obj.parent_comment_id),
            child: async (obj, args, context, info) => await PostService.getChildComments(obj.id)
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
        Message: {
            sender: async (obj, args, context, info) => await PostService.getUser(obj.sender_id),
            recipient: async (obj, args, context, info) => await PostService.getUser(obj.recipient_id)
        },
        Mutation: {
            //Post Mutations
            createPost: async (parent, args) => await PostService.createPost(args.post),
            updatePost: async (parent, args) => await PostService.updatePost(args.post),
            deletePost: async (parent, args) => await PostService.deletePost(args.post),
            lockPost: async (parent, args) => await PostService.lockPost(args.post),
            //Comment Mutations
            createComment: async(parent, args) => await PostService.createComment(args.comment),
            updateComment: async (parent, args) => await PostService.updateComment(args.comment),
            deleteComment: async (parent, args) => await PostService.deleteComment(args.comment),
            deleteParentComment: async (parent, args) => await PostService.deleteParentComment(args.comment),
            //Community Mutations
            createCommunity: async (parent, args) => await PostService.createCommunity(args.communityUser),
            updateCommunityUserRole: async (parent, args) => await PostService.updateCommunityUserRole(args.communityuserrole),
            updateCommunityDetails: async (parent, args) => await PostService.updateCommunityDetails(args.community),
            //Community User Role Mutation- Roles within community
            createUser_CommunityUserRole: async (parent, args) => await PostService.createUser_CommunityUserRole(args.communityuserrole),
            removeUser_CommunityUserRole: async (parent, args) => await PostService.removeUser_CommunityUserRole(args.communityuserrole),
            banUser: async (parent, args) => await PostService.banUser(args.communityban),
            //User Mutation
            registerUser: async (parent, args) => await PostService.registerUser(args.user),
            changeUserInfo: async (parent, args) => await PostService.changeUserInfo(args.user),
            changeUserPassword: async (parent, args) => await PostService.changeUserPassword(args.user),
            //Message Mutations
            sendMessage: async(parent, args) => await PostService.sendMessage(args.message),
            deleteMessage: async(parent, args) => await PostService.deleteMessage(args.message),
            deleteMessage_sender_recipient: async(parent, args) => await PostService.deleteMessage_sender_recipient(args.message),
            //Upvote/Downvote Mutations
            postUpvote: async(parent, args) => await PostService.postUpvote(args.post_upvote_downvote),
            postDownvote: async(parent, args) => await PostService.postDownvote(args.post_upvote_downvote),
            removePostUpvote: async(parent, args) => await PostService.removePostUpvote(args.post_upvote_downvote),
            removePostDownvote: async(parent, args) => await PostService.removePostDownvote(args.post_upvote_downvote),
            //Security Question Mutation
            createSecurityQuestion: async(parent, args) => await PostService.createSecurityQuestion(args.securityQuestion),
            updateSecurityQuestion: async(parent, args) => await PostService.updateSecurityQuestion(args.securityQuestion),
            removeSecurityQuestion: async(parent, args) => await PostService.removeSecurityQuestion(args.securityQuestion)
        }
    },
    schema: fs.readFileSync(
        path.resolve(
            __dirname,
            './posts-schema.graphql'
        )
    ).toString()
}