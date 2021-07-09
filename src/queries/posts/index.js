import gql from 'graphql-tag'

export const GET_POST_QUERY = gql`
    query getPost($id: ID!) {
        post: getPost(id: $id) {
            id
            author_id
            title
            type
            image
            text
            updated_at
            created_at
        }
    }
`
export const GET_POSTS_RECENT_QUERY = gql`
    query getPostsRecent($id: ID!) {
        post: getPostsRecent(id: $id) {
            id
            author_id
            user {
                email
                username
            }
            community {
                id
                title
                summary
            }
            title
            type
            image
            text
            updated_at
            created_at
        }
    }
`
export const GET_POSTS_BY_AUTHOR_ID_QUERY = gql`
    query getPostbyAuthorID($id: ID!) {
        post: getPostbyAuthorID(id: $id) {
            id
            author_id
            title
            type
            image
            text
            updated_at
            created_at
        }
    }
`
export const GET_POST_COMMENTS_QUERY = gql`
    query getPost_Comments($id: ID!) {
        postcomment: getPost_Comments(id: $id) {
            id
            author_id
            title
            type
            image
            text
            updated_at
            created_at
            comment {
                id
                post_id
                author_id
                parent_comment_id
                comment
                updated_at
                created_at
                user {
                    email
                    username
                }
            }
        }
    }
`
export const GET_COMMENTS_BY_POSTID = gql`
    query getCommentsbyPostID($id: ID!) {
        comment: getCommentsbyPostID(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`
export const GET_USER_QUERY = gql`
    query getUser($id: ID!) {
        user: getUser(id: $id) {
            email
            username
        }
    }
`
export const CHECK_USER_EMAIL_QUERY = gql`
    query checkUserEmail($email: String!) {
        user: checkUserEmail(email: $email) {
            email
        }
    }
`
export const LOGIN_USER_QUERY = gql`
    query loginUser($email: String!, $password: String!) {
        user: loginUser(email: $email, password: $password) {
            id
            email
            username
        }
    }
`
export const GET_ALL_COMMUNITIES_QUERY = gql`
    query getAllCommunities($id: ID!) {
        community: getAllCommunities(id: $id) {
            id
            title
            summary
        }
    }
`
export const GET_COMMUNITY_QUERY = gql`
    query getCommunity($id: ID!) {
        community: getCommunity(id: $id) {
            id
            title
            summary
        }
    }
`
export const GET_COMMUNITY_POSTS_USER_CATEGORY_QUERY = gql`
    query getCommunity_Posts_Users_Category($id: ID!) {
        community: getCommunity_Posts_Users_Category(id: $id) {
            id
            title
            summary
            post {
                id
                author_id
                user {
                    email
                    username
                }
                title
                type
                image
                text
                active
                updated_at
                created_at
            }
            category{
                id
                label
                description
            }
        }
    }
`
export const GET_POSTS_COMMUNITYPOSTS_QUERY = gql`
    query getPosts_CommunityPosts($id: ID!) {
        posts: getPosts_CommunityPosts(id: $id) {
            id
            author_id
            title
            type
            image
            text
            active
            updated_at
            created_at
        }
    }
`
export const GET_CATEGORY_COMMUNITY_QUERY = gql`
    query getCategoryCommunity($id: ID!) {
        categorycommunity: getCategoryCommunity(id: $id) {
            id
            title
            category {
                label
                description
            }
        }
    }
`
export const GET_CATEGORY_CATEGORYCOMMUNITY_QUERY = gql`
    query getCategory_CategoryCommunity($id: ID!) {
        category: getCategory_CategoryCommunity(id: $id) {
            id
            label
            description
        }
    }
`
export const GET_COMMUNITYUSERROLE_QUERY = gql`
    query getCommunityUserRole($id: ID!) {
        communityuserrole: getCommunityUserRole(id: $id) {
            community_id
            user_id
            role_id
            community {
                id
                title
                summary
            }
        }
    }
`
//MUTATIONS--------------------------------------------------------------------------------------------------------------------->
export const CREATE_POST_QUERY = gql`
    mutation createPost($post: PostInput!){
        createPost (post: $post) {
            author_id
            title
            type
            image
            text
            active
            community_id
        }
    }
`
export const UPDATE_POST_QUERY = gql`
    mutation updatePost($post: UpdatePostInput!){
        updatePost (post: $post) {
            id
            title
            image
            text
        }
    }
`
export const CREATE_COMMENT_QUERY = gql`
    mutation createComment($comment: CommentInput!){
        createComment (comment: $comment) {
            post_id
            author_id
            parent_comment_id
            comment
        }
    }
`
export const REGISTER_USER_QUERY = gql`
    mutation registerUser($user: UserInput!){
        registerUser (user: $user) {
            email
            password
            username
        }
    }
`
/*
    https://github.com/syntacticsolutions/react-blog-gql-backend/blob/master/schemas/posts/posts-schema.graphql
    https://graphql.org/graphql-js/mutations-and-input-types/
    http://knexjs.org/#Builder-insert
    https://github.com/syntacticsolutions/react-blog-gql-backend/blob/master/api/posts/index.js
    https://www.youtube.com/watch?v=L7kF4MXXCoA
*/