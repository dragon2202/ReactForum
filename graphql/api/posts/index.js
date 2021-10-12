const db = require('../../database/mysql')
const { errorHandler } = require('../utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
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
    getPostsRecent: async () => {
        let qry = db.select('*')
            .from('forum_posts')
            .where({ active: 1 })
            .orderBy('created_at', 'desc')
        /* .limit(5) */
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
    getPost_Comments: async (id) => {
        const posts = db.select('*')
            .from('forum_posts')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
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
    getComment: async (id) => {
        const posts = db.select('*')
            .from('forum_post_comments')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getCommentsbyPostID: async (id) => {
        let qry = db.select('*')
            .from('forum_post_comments')
            .where({ post_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
    getFamilyComments: async (id) => {
        const posts = db.select('*')
            .from('forum_post_comments')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    getChildComments: async (id) => {
        let qry = db.select('*')
            .from('forum_post_comments')
            .where({ parent_comment_id: id })
            .catch(errorHandler)

        return qry
            .catch(err => {
                console.log(err)
            })
    },
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
    getUser: async (id) => {
        const posts = db.select('*')
            .from('users')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
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
    checkCredentials: async (id, password) => {
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
            return
        }
    },
    createPost: async (args) => {
        await db('forum_posts').insert({
            author_id: args.author_id,
            title: args.title,
            type: args.type,
            image: args.image,
            text: args.text,
            active: args.active,
            community_id: args.community_id
        })
            .then(res => {
                return res
            })
    },
    updatePost: async (args) => {
        if(args.image === null) {
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
    createComment: async (args) => {
        await db('forum_post_comments').insert({
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
        await db('forum_post_comments')
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
        await db('forum_post_comments')
            .where({ id: args.id })
            .del()
            .then(res => {
                return res
            })

    },
    deleteParentComment: async (args) => {
        await db('forum_post_comments')
            .where({ id: args.id })
            .update({
                comment: null
            })
            .then(res => {
                return res
            })
    },
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
        await db('users')
            .where({ id: args.id })
            .update({
                password: args.password
            })
            .then(res => {
                return res
            })
    }
}
/*
        const posts = db.select('*')
            .from('users')
            .where({ email: email })
            .catch(errorHandler)

        let [post] = await posts
        if ()) {
            return {
                ...post
            }
        } else {
            return {}
        }
*/
//https://www.youtube.com/watch?v=QYIWnpvqs-E