const db = require('../../database/mysql')
const { errorHandler } = require('../utils')
const bcrypt = require('bcrypt');
const { getDefaultNormalizer } = require('@testing-library/dom');
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
    getPostsRecent: async (id) => {
        let qry = db.select('*')
            .from('forum_posts')
            .where({ active: 1 })
            .orderBy('updated_at', 'desc')
            .limit(5)

        return qry
        .catch(err => {
            console.log(err)
        })

    },
    getUser: async(id) => {
        const posts = db.select('*')
            .from('users')
            .where({ id })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    checkUserEmail: async(email) => {
        const posts = db.select('*')
            .from('users')
            .where({ email: email })
            .catch(errorHandler)

        let [post] = await posts
        return {
            ...post
        }
    },
    loginUser: async(email, password) => {
        const posts = db.select('*')
            .from('users')
            .where({ email: email })
            .catch(errorHandler)

        let [post] = await posts
        if (bcrypt.compareSync(password, post.password)){
            return {
                ...post
            }
        } else {
            return {}
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
    getAllCommunities: async (id) => {
        let qry = db.select('*')
            .from('community')

        return qry
        .catch(err => {
            console.log(err)
        })
    },
    getCommunity_Posts_Users_Category: async (id) => {
        const community = db.select('*')
            .from('community')
            .where({ id })

        let [communities] = await community
        return {
            ...communities
        }
    },
    getPosts_CommunityPosts: async (id) => {
        let qry = db.select('*')
            .from('forum_posts')
            .where({ community_id: id })
            .catch(errorHandler)

        return qry
        .catch(err => {
            console.log(err)
        })
    },
    getCategoryCommunity: async (id) => {
        let qry = db.select('*')
            .from('community')

        return qry
        .catch(err => {
            console.log(err)
        })
    },
    getCategory_CategoryCommunity: async (id) => {
        let qry = db.select('*')
            .from('forum_community_categories')
            .leftJoin('forum_categories', 'forum_community_categories.category_id', 'forum_categories.id')
            .where({ community_id: id })

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
    registerUser: async (args) => {
        const hash = await bcrypt.hashSync(args.password, saltRounds);
        await db('users').insert({
            email: args.email,
            password: hash,
            username: args.username,
        })
        .then(res => {
            return res
        })
    }
    
}
/* 
    //https://stackoverflow.com/questions/38885699/query-tables-using-lookup-table
        let qry = db.select('label', 'description', 'title', 'summary', 'category_id', 'community_id')
            .from('forum_categories')
            .innerJoin('forum_community_categories', 'forum_categories.id','forum_community_categories.category_id')
            .innerJoin('community', 'community.id', 'forum_community_categories.community_id')

        return qry
        .catch(err => {
            console.log(err)
        })
    select label, description, title, summary from
    react_forum.forum_categories
    INNER JOIN react_forum.forum_community_categories on forum_categories.id = forum_community_categories.category_id
    INNER JOIN react_forum.community on community.id = forum_community_categories.community_id
*/
//https://www.youtube.com/watch?v=QYIWnpvqs-E