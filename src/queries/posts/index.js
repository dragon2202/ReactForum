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
export const GET_POSTS_BY_AUTHOR_ID_QUERY = gql`
    query getPostsbyAuthorID($post_id: ID!, $author_id: ID!) {
        post: getPostsbyAuthorID(post_id: $post_id, author_id: $author_id) {
            id
            author_id
            user {
                id
                username
            }
            title
            type
            image
            text
            active
            community_id
            community {
                id
                title
            }
            updated_at
            created_at
        }
    }
`
export const GET_POSTS_RECENT_QUERY = gql`
    query getPostsRecent {
        post: getPostsRecent {
            id
            author_id
            user {
                id
                email
                username
            }
            community_id
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
export const GET_POST_COMMENTS_QUERY = gql`
    query getPost_Comments($id: ID!) {
        postcomment: getPost_Comments(id: $id) {
            id
            author_id
            title
            type
            image
            text
            active
            updated_at
            created_at
            community_id
            community {
                id
                title
                summary
            }
            user {
                id
                email
                username
            }
            comment {
                id
                post_id
                author_id
                parent_comment_id
                comment
                updated_at
                created_at
                user {
                    id
                    email
                    username
                }
            }
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
export const GET_ALL_COMMUNITIES_QUERY = gql`
    query getAllCommunities {
        community: getAllCommunities {
            id
            title
            summary
        }
    }
`
export const GET_COMMUNITY_POSTS_USER_QUERY = gql`
    query getCommunity_Posts_Users($id: ID!) {
        community: getCommunity_Posts_Users(id: $id) {
            id
            title
            public
            summary
            communityban {
                community_id
                user_id
            }
            communityuserrole {
                community_id
                user_id
                role_id
                user {
                    id
                    email
                    username
                }
            }
            post {
                id
                author_id
                user {
                    id
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
        }
    }
`
export const GET_COMMUNITY_USER = gql`
query getCommunity_User($id: ID!) {
    community: getCommunity_User(id: $id) {
        id
        title
        public
        summary
        communityuserrole {
            community_id
            user_id
            role_id
            user {
                id
                email
                username
            }
            role {
                id
                title
                rolespermissions {
                    role_id
                    permission_id
                    permission {
                        id
                        action
                    }
                }
            }
        }
        communityban {
            community_id
            user_id
        }
    }
}
`
export const CHECK_COMMUNITY_NAME_QUERY = gql`
    query checkCommunityName($name: String!) {
        community: checkCommunityName(name: $name) {
            id
            title
        }
    }
`
export const GET_COMMUNITY_USER_ROLE_QUERY = gql`
    query getCommunityUserRole($id: ID!) {
        communityuserrole: getCommunityUserRole(id: $id) {
            community_id
            user_id
            role_id
            community {
                id
                title
                post {
                    id
                    author_id
                    user {
                        id
                        username
                        email
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
                    active
                    updated_at
                    created_at
                }
            }
            user {
                id
                username
            }
            role {
                id
                title
            }
        }
    }
`
export const GET_COMMUNITY_USER_ROLE_AND_USER_QUERY = gql`
    query getCommunityUserRoleAndUser($id: ID!) {
        communityuserrole: getCommunityUserRole(id: $id) {
            community_id
            user_id
            role_id
            community {
                id
                title
                post {
                    id
                    author_id
                    user {
                        id
                        username
                        email
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
                    active
                    updated_at
                    created_at
                }
            }
            role {
                id
                title
            }
        }
        user: getUser(id: $id) {
            id
            email
            username
        }
        post: getPostsbyAuthorID(post_id: null, author_id: $id) {
            id
            author_id
            user {
                id
                username
            }
            title
            type
            image
            text
            active
            community_id
            community {
                id
                title
            }
            updated_at
            created_at
        }
    }
`
export const GET_COMMUNITYUSERROLE_BY_USER_QUERY = gql`
    query getCommunityUserRoleByUser($id: ID!) {
        communityuserrole: getCommunityUserRoleByUser(id: $id) {
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
export const GET_COMMUNITYUSERROLE_BY_COMMUNITY_QUERY = gql`
    query getCommunityUserRoleByCommunity($id: ID!) {
        communityuserrole: getCommunityUserRoleByCommunity(id: $id) {
            community_id
            user_id
            role_id
            user {
                id
                email
                username
            }
        }
    }
`
export const GET_COMMENT = gql`
query getComment($id: ID!) {
    comment: getComment(id: $id) {
        id
        post_id
        author_id
        parent_comment_id
        comment
        updated_at
        created_at
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
export const GET_FAMILY_COMMENTS = gql`
    query getFamilyComments($id: ID!) {
        commentfamily: getFamilyComments(id: $id) {
            id
            post_id
            author_id
            parent_comment_id
            updated_at
            created_at
            comment
            parent {
                id
                post_id
                author_id
                parent_comment_id
                updated_at
                created_at
                comment
            }
            child {
                id
                post_id
                author_id
                parent_comment_id
                updated_at
                created_at
                comment
            }
        }
    }
`
export const GET_CHILD_COMMENTS = gql`
query getChildComments($id: ID!) {
    comment: getChildComments(id: $id) {
        id
        post_id
        author_id
        parent_comment_id
        comment
        updated_at
        created_at
    }
}
`
export const GET_ROLES_PERMISSIONS = gql`
    query getRolesPermissions($id: ID!) {
        rolespermissions: getRolesPermissions(id: $id) {
            role_id
            permission_id
            permission {
                id
                action
            }
        }
    }
`
export const GET_ROLE = gql`
    query getRole($id: ID!) {
        role: getRole(id: $id) {
            id
            title
            rolespermissions {
                role_id
                permission_id
                permission {
                    id
                    action
                }
            }
        }
    }
`
export const GET_PERMISSION = gql`
    query getPermission($id: ID!) {
        permission: getPermission(id: $id) {
            id
            action
        }
    }
`
export const GET_USER_QUERY = gql`
    query getUser($id: ID!) {
        user: getUser(id: $id) {
            id
            email
            username
        }
    }
`
export const CHECK_USER_EMAIL_QUERY = gql`
    query checkUserEmail($email: String!) {
        user: checkUserEmail(email: $email) {
            id
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
export const CHECK_CREDENTIALS_QUERY = gql`
    query checkCredentials($id: ID!, $password: String!) {
        user: checkCredentials(id: $id, password: $password) {
            id
            email
            username
        }
    }
`
//MUTATIONS--------------------------------------------------------------------------------------------------------------------->
export const CREATE_POST_QUERY = gql`
    mutation createPost($post: PostInput!){
        createPost(post: $post) {
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
        updatePost(post: $post) {
            id
            title
            image
            text
            updated_at
        }
    }
`
export const DELETE_POST_QUERY = gql`
    mutation deletePost($post: DeletePostInput!){
        deletePost(post: $post) {
            id
        }
    }
`
export const LOCK_POST_QUERY = gql`
mutation lockPost($post: LockPostInput!){
    lockPost(post: $post) {
        id
        active
    }
}
`
export const CREATE_COMMENT_QUERY = gql`
    mutation createComment($comment: CommentInput!){
        createComment(comment: $comment) {
            post_id
            author_id
            parent_comment_id
            comment
        }
    }
`
export const UPDATE_COMMENT_QUERY = gql`
    mutation updateComment($comment: UpdateCommentInput!){
        updateComment(comment: $comment) {
            id
            comment
            updated_at
        }
    }
`
export const DELETE_COMMENT_QUERY = gql`
    mutation deleteComment($comment: DeleteCommentInput!){
        deleteComment(comment: $comment) {
            id
        }
    }
`
export const DELETE_PARENT_COMMENT_QUERY = gql`
mutation deleteParentComment($comment: DeleteCommentInput!){
    deleteParentComment(comment: $comment) {
        id
    }
}
`
export const CREATE_COMMUNITY_QUERY = gql`
mutation createCommunity($communityUser: CommunityUserInput!){
    createCommunity(communityUser: $communityUser) {
        title
        summary
        user_id
    }
}
`
export const UPDATE_COMMUNITY_USER_ROLE = gql`
    mutation updateCommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        updateCommunityUserRole(communityuserrole: $communityuserrole) {
            owner_id
            owner_role_id
            community_id
            user_id
            role_id
        }
    }
`
export const UPDATE_COMMUNITY_DETAILS = gql`
    mutation updateCommunityDetails($community: CommunityInput!){
        updateCommunityDetails(community: $community) {
            id
            title
            summary
        }
    }
`
export const CREATE_USER_COMMUNITY_USER_ROLE = gql`
    mutation createUser_CommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        createUser_CommunityUserRole(communityuserrole: $communityuserrole) {
            community_id
            user_id
            role_id
        }
    }
`
export const REMOVE_USER_COMMUNITY_USER_ROLE = gql`
    mutation removeUser_CommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        removeUser_CommunityUserRole(communityuserrole: $communityuserrole) {
            community_id
            user_id
            role_id
        }
    }
`
export const BAN_USER = gql`
    mutation banUser($communityban: CommunityBanInput!){
        banUser(communityban: $communityban) {
            community_id
            user_id
        }
    }
`
export const REGISTER_USER_QUERY = gql`
    mutation registerUser($user: UserInput!){
        registerUser(user: $user) {
            email
            username
            password
        }
    }
`
export const CHANGE_USER_INFO = gql`
    mutation changeUserInfo($user: UserInput!) {
        changeUserInfo(user: $user) {
            id
            email
            username
            password
        }
    }
`
export const CHANGE_USER_PASSWORD = gql`
    mutation changeUserPassword($user: UserInput!) {
        changeUserPassword(user: $user) {
            id
            password
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