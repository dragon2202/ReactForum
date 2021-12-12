const db = require('../../database/mysql')
const { errorHandler } = require('../utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    //Post
    getPost: async (id) => {
        const posts = db.select('*')
            .from('forum_posts')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getPostRecentByAuthorID: async (id) => {
        const posts = db.select('*')
            .from('forum_posts')
            .where({ author_id: id })
            .orderBy('created_at', 'desc')
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getPostsbyAuthorID: async (post_id, author_id) => {
        if (post_id === null) {
            let qry = db.select('*')
                .from('forum_posts')
                .where({ author_id: author_id })
                .catch(errorHandler)

            return qry
                .catch(err => {
                    console.log(err)
                })

        } else {
            let qry = db.select('*')
                .from('forum_posts')
                .where({ author_id: author_id })
                .andWhereNot({ id: post_id })
                .catch(errorHandler)

            return qry
                .catch(err => {
                    console.log(err)
                })
        }

    },
    getPostsbyAuthorIDRecent: async (post_id, author_id) => {
        if (post_id === null) {
            let qry = db.select('*')
                .from('forum_posts')
                .where({ author_id: author_id })
                .orderBy('created_at', 'desc')
                .catch(errorHandler)

            return qry
                .catch(err => {
                    console.log(err)
                })

        } else {
            let qry = db.select('*')
                .from('forum_posts')
                .where({ author_id: author_id })
                .andWhereNot({ id: post_id })
                .orderBy('created_at', 'desc')
                .catch(errorHandler)

            return qry
                .catch(err => {
                    console.log(err)
                })
        }

    },
    getPostsRecent: async () => {
        let qry = db.select('*')
            .from('forum_posts')
            .where({ active: 1 })
            .orderBy('created_at', 'desc')
        return qry
            .catch(err => {
                console.log(err)
            })

    },
    getPosts_CommunityPosts: async (id) => {
        let qry = db.select('*')
            .from('forum_posts')
            .where({ community_id: id })
            .andWhere({ active: 1 })
            .orderBy('created_at', 'desc')
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Community
    getCommunity: async (id) => {
        const posts = db.select('*')
            .from('community')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getAllCommunities: async () => {
        let qry = db.select('*')
            .from('community')

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getCommunity_Posts_Users: async (id) => {
        const community = db.select('*')
            .from('community')
            .where({ id })

        let [communities] = await community
        return {
            ...communities
        }
    },
    getCommunity_User: async (id) => {
        const posts = db.select('*')
            .from('community')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    checkCommunityName: async (name) => {
        const posts = db.select('*')
            .from('community')
            .where({ title: name })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getCommunityBans: async (id) => {
        let qry = db.select('*')
            .from('community_ban')
            .where({ community_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Community/User/Role
    getCommunityUserRole: async (id) => {
        let qry = db.select('*')
            .from('community_user_role')
            .where({ user_id: id })
        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getCommunityUserRoleByUser: async (id) => {
        let qry = db.select('*')
            .from('community_user_role')
            .where({ user_id: id })

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getCommunityUserRoleByCommunity: async (id) => {
        let qry = db.select('*')
            .from('community_user_role')
            .where({ community_id: id })

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Comment
    getComment: async (id) => {
        const posts = db.select('*')
            .from('forum_posts_comments')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getCommentsbyPostID: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_comments')
            .where({ post_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getCommentsbyAuthorID: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_comments')
            .where({ author_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getCommentsbyAuthorIDRecent: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_comments')
            .where({ author_id: id })
            .orderBy('created_at', 'desc')
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getFamilyComments: async (id) => {
        const posts = db.select('*')
            .from('forum_posts_comments')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getChildComments: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_comments')
            .where({ parent_comment_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Roles/Permission
    getRolesPermissions: async (id) => {
        let qry = db.select('*')
            .from('roles_permissions')
            .where({ role_id: id })

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getRole: async (id) => {
        const posts = db.select('*')
            .from('roles')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getPermission: async (id) => {
        const posts = db.select('*')
            .from('permissions')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    //User
    getUser: async (id) => {
        if (id) {
            const posts = db.select('*')
                .from('users')
                .where({ id })
                .catch(errorHandler)

            let [post] = await posts
            return {
                ...post
            }
        } else {
            return null
        }
    },
    getUserByEmail: async (email) => {
        const posts = db.select('*')
            .from('users')
            .where({ email: email})
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getAllUser: async () => {
        let qry = db.select('*')
            .from('users')

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Check Credentials
    checkUserEmail: async (email) => {
        const posts = db.select('*')
            .from('users')
            .where({ email: email })
            .catch(errorHandler)
        let [post] = await posts
        return {
            ...post
        }
    },
    checkUserPassword: async (id, password) => {
        const posts = db.select('*')
            .from('users')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        if (bcrypt.compareSync(password, post.password)) {
            return {
                ...post
            }
        } else {
            return {}
        }
    },
    checkQuestion: async (user_id, question, answer) => {
        const posts = db.select('*')
            .from('users_security_questions')
            .where({ user_id: user_id, question: question, answer: answer })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    loginUser: async (email, password) => {
        const posts = db.select('*')
            .from('users')
            .where({ email: email })
            .catch(errorHandler)
        let [post] = await posts
        if (bcrypt.compareSync(password, post.password)) {
            return {
                ...post
            }
        } else {
            return {}
        }
    },
    //Message
    getMessages: async (id) => {
        let qry = db.select('*')
            .from('forum_messages')
            .where({ recipient_id: id })
            .andWhere({ recipient_delete: 0 })
            .orderBy('created_at', 'desc')

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getSentMessages: async (id) => {
        let qry = db.select('*')
            .from('forum_messages')
            .where({ sender_id: id })
            .andWhere({ sender_delete: 0 })
            .orderBy('created_at', 'desc')

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    //Upvote/Downvote
    checkPostUpvote: async (author_id, post_id) => {
        const posts = db.select('*')
            .from('forum_posts_upvote')
            .where({ author_id: author_id })
            .andWhere({ post_id: post_id })

        let [post] = await posts
        return {
            ...post
        }
    },
    checkPostDownvote: async (author_id, post_id) => {
        const posts = db.select('*')
            .from('forum_posts_downvote')
            .where({ author_id: author_id })
            .andWhere({ post_id: post_id })

        let [post] = await posts
        return {
            ...post
        }
    },
    getUpvotes_PostID: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_upvote')
            .where({ post_id: id })
            .catch(errorHandler)

        return qry.catch(err => { console.log(err) })
    },
    getDownvotes_PostID: async (id) => {
        let qry = db.select('*')
            .from('forum_posts_downvote')
            .where({ post_id: id })
            .catch(errorHandler)

        return qry.catch(err => { console.log(err) })
    },
    //Security Questions
    getSecurityQuestionsByAuthorID: async (id) => {
        let qry = db.select('*')
            .from('users_security_questions')
            .where({ user_id: id })
            .catch(errorHandler)

        return qry.catch(err => { console.log(err) })
    },
    //Mutation---------------------------------------------------------------------------------------------------------------------
    //Post
    createPost: async (args) => {
        await db('forum_posts').insert({
            author_id: args.author_id,
            title: args.title,
            type: args.type,
            image: args.image,
            text: args.text,
            active: args.active,
            community_id: args.community_id
        }).then(res => {
            return res[0]
        })
    },
    updatePost: async (args) => {
        if (args.image === null) {
            await db('forum_posts')
                .where({ id: args.id })
                .update({
                    title: args.title,
                    text: args.text,
                    updated_at: args.updated_at
                })
                .then(res => {
                    return res
                })
        } else {
            await db('forum_posts')
                .where({ id: args.id })
                .update({
                    title: args.title,
                    image: args.image,
                    text: args.text,
                    updated_at: args.updated_at
                })
                .then(res => {
                    return res
                })
        }

    },
    deletePost: async (args) => {
        if (args.commentLength > 0) {
            await db('forum_posts')
                .where({ id: args.id })
                .update({
                    active: -1
                })
                .then(res => {
                    return res
                })
        } else {
            await db('forum_posts')
                .where({ id: args.id })
                .del()
                .then(res => {
                    return res
                })
        }
    },
    lockPost: async (args) => {
        await db('forum_posts')
            .where({ id: args.id })
            .update({
                active: args.active * -1
            })
            .then(res => {
                return res
            })

    },
    //Comment
    createComment: async (args) => {
        await db('forum_posts_comments').insert({
            post_id: args.post_id,
            author_id: args.author_id,
            parent_comment_id: args.parent_comment_id,
            comment: args.comment
        })
            .then(res => {
                return res
            })
    },
    updateComment: async (args) => {
        await db('forum_posts_comments')
            .where({ id: args.id })
            .update({
                comment: args.comment,
                updated_at: args.updated_at
            })
            .then(res => {
                return res
            })
    },
    deleteComment: async (args) => {
        await db('forum_posts_comments')
            .where({ id: args.id })
            .del()
            .then(res => {
                return res
            })

    },
    deleteParentComment: async (args) => {
        await db('forum_posts_comments')
            .where({ id: args.id })
            .update({
                comment: null
            })
            .then(res => {
                return res
            })
    },
    //Community
    createCommunity: async (args) => {
        await db('community').insert({
            title: args.title,
            public: 0,
            summary: args.summary
        }).then(async (res) => {
            await db('community_user_role').insert({
                community_id: res[0],
                user_id: args.user_id,
                role_id: 1
            }).then(res => {
                return res
            })
            return res
        })
    },
    updateCommunityUserRole: async (args) => {
        if (args.role_id === 1) {
            await db('community_user_role')
                .where({ community_id: args.community_id })
                .andWhere({ user_id: args.user_id })
                .update({
                    role_id: args.role_id
                })
                .then(async (res) => {
                    await db('community_user_role')
                        .where({ community_id: args.community_id })
                        .andWhere({ user_id: args.owner_id })
                        .update({
                            role_id: 2
                        })
                        .then(async (res) => {
                            return res
                        })
                    return res
                })

        } else {
            await db('community_user_role')
                .where({ community_id: args.community_id })
                .andWhere({ user_id: args.user_id })
                .update({
                    role_id: args.role_id
                })
                .then(res => {
                    return res
                })
        }
    },
    updateCommunityDetails: async (args) => {
        await db('community')
            .where({ id: args.id })
            .update({
                title: args.title,
                summary: args.summary
            })
            .then(res => {
                return res
            })
    },
    //Community User Role
    createUser_CommunityUserRole: async (args) => {
        await db('community_user_role').insert({
            community_id: args.community_id,
            user_id: args.user_id,
            role_id: args.role_id,
        }).then(res => {
            return res
        })
    },
    removeUser_CommunityUserRole: async (args) => {
        await db('community_user_role')
            .where({ community_id: args.community_id })
            .andWhere({ user_id: args.user_id })
            .andWhere({ role_id: args.role_id })
            .del()
            .then(res => {
                return res
            })
    },
    banUser: async (args) => {
        await db('community_ban').insert({
            community_id: args.community_id,
            user_id: args.user_id
        }).then(async (res) => {
            await db('community_user_role')
                .where({ community_id: args.community_id })
                .andWhere({ user_id: args.user_id })
                .del()
                .then(res => {
                    return res
                })
            return res
        })
    },
    unbanUser: async (args) => {
        await db('community_ban').where({
            community_id: args.community_id,
            user_id: args.user_id
        }).del().then(res => {
            return res
        })
    },
    //User
    registerUser: async (args) => {
        const hash = await bcrypt.hashSync(args.password, saltRounds);
        await db('users').insert({
            email: args.email,
            password: hash,
            username: args.username,
        }).then(res => {
            return res
        })
    },
    changeUserInfo: async (args) => {
        await db('users')
            .where({ id: args.id })
            .update({
                email: args.email,
                username: args.username
            })
            .then(res => {
                return res
            })
    },
    changeUserPassword: async (args) => {
        const hash = await bcrypt.hashSync(args.password, saltRounds);
        await db('users')
            .where({ id: args.id })
            .update({
                password: hash
            })
            .then(res => {
                return res
            })
    },
    //Message
    sendMessage: async (args) => {
        await db('forum_messages').insert({
            sender_id: args.sender_id,
            recipient_id: args.recipient_id,
            subject_line: args.subject_line,
            message: args.message
        }).then(res => {
            return res
        })
    },
    deleteMessage: async (args) => {
        await db('forum_messages')
            .where({ id: args.id })
            .del()
            .then(res => {
                return res
            })
    },
    deleteMessage_sender_recipient: async (args) => {
        await db('forum_messages')
            .where({ id: args.id })
            .update({
                sender_delete: args.sender_delete,
                recipient_delete: args.recipient_delete
            })
            .then(res => {
                return res
            })
    },
    //UpvoteDownvote
    postUpvote: async (args) => {
        await db('forum_posts_upvote')
            .insert({
                post_id: args.post_id,
                author_id: args.author_id
            })
            .then(async res => {
                await db('forum_posts_downvote')
                    .where({
                        post_id: args.post_id,
                        author_id: args.author_id
                    })
                    .del()
                    .then(res => {
                        return res
                    })
                return res
            })

    },
    postDownvote: async (args) => {
        await db('forum_posts_downvote').insert({
            post_id: args.post_id,
            author_id: args.author_id
        }).then(async res => {
            await db('forum_posts_upvote').where({
                post_id: args.post_id,
                author_id: args.author_id
            }).del().then(res => { return res })
            return res
        })

    },
    removePostUpvote: async (args) => {
        await db('forum_posts_upvote').where({
            post_id: args.post_id,
            author_id: args.author_id
        }).del().then(res => {
            return res
        })
    },
    removePostDownvote: async (args) => {
        await db('forum_posts_downvote').where({
            post_id: args.post_id,
            author_id: args.author_id
        }).del().then(res => {
            return res
        })
    },
    createSecurityQuestion: async (args) => {
        await db('users_security_questions').insert({
            user_id: args.user_id,
            question: args.question,
            answer: args.answer
        }).then(res => {
            return res
        })
    },
    updateSecurityQuestion: async (args) => {
        await db('users_security_questions').update({
            user_id: args.user_id,
            question: args.question,
            answer: args.answer
        }).then(res => {
            return res
        })
    },
    removeSecurityQuestion: async (args) => {
        await db('users_security_questions').where({
            user_id: args.user_id,
            question: args.question,
        }).del().then(res => {
            return res
        })
    }

}
//https://www.youtube.com/watch?v=QYIWnpvqs-E