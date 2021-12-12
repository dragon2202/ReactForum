import gql from 'graphql-tag'

export const GET_POST = gql`
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
export const GET_POST_RECENT_BY_AUTHOR_ID = gql`
    query getPostRecentByAuthorID($id: ID!) {
        post: getPostRecentByAuthorID(id: $id) {
            id
            author_id
        }
    }
`
export const GET_POSTS_BY_AUTHOR_ID = gql`
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
export const GET_POSTS_BY_AUTHOR_ID_RECENT = gql`
    query getPostsbyAuthorIDRecent($post_id: ID!, $author_id: ID!) {
        post: getPostsbyAuthorIDRecent(post_id: $post_id, author_id: $author_id) {
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
export const GET_POSTS_RECENT = gql`
    query getPostsRecent {
        post: getPostsRecent {
            id
            author_id
            community_id
            title
            type
            image
            text
            updated_at
            created_at
            user {
                id
                email
                username
            }
            community {
                id
                title
                summary
            }
            post_upvotes {
                post_id
                author_id
            }
            post_downvotes {
                post_id
                author_id
            }
        }
    }
`
export const GET_POSTS_COMMUNITYPOSTS = gql`
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
export const GET_POST_COMMENTS = gql`
    query getPost($id: ID!) {
        post: getPost(id: $id) {
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
export const GET_COMMUNITY = gql`
    query getCommunity($id: ID!) {
        community: getCommunity(id: $id) {
            id
            title
            summary
        }
    }
`
export const GET_ALL_COMMUNITIES = gql`
    query getAllCommunities {
        community: getAllCommunities {
            id
            title
            summary
        }
    }
`
export const GET_COMMUNITY_POSTS_USER = gql`
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
                title
                type
                image
                text
                active
                updated_at
                created_at
                post_upvotes {
                    post_id
                    author_id
                }
                post_downvotes {
                    post_id
                    author_id
                }
                user {
                    id
                    email
                    username
                }
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
            user {
                id
                email
                username
            }
        }
    }
}
`
export const CHECK_COMMUNITY_NAME = gql`
    query checkCommunityName($name: String!) {
        community: checkCommunityName(name: $name) {
            id
            title
        }
    }
`
export const GET_COMMUNITY_USER_ROLE = gql`
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
export const GET_COMMUNITYUSERROLE_AND_USER_AND_POST = gql`
    query getCommunityUserRole_User_Post($id: ID!) {
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
                    title
                    type
                    image
                    text
                    active
                    updated_at
                    created_at
                    post_upvotes {
                        post_id
                        author_id
                    }
                    post_downvotes {
                        post_id
                        author_id
                    }
                    user {
                        id
                        username
                        email
                    }
                    community {
                        id
                        title
                    }
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
            title
            type
            image
            text
            active
            community_id
            updated_at
            created_at
            user {
                id
                username
            }
            community {
                id
                title
            }
        }
    }
`
export const GET_COMMUNITYUSERROLE_BY_USER = gql`
    query getCommunityUserRoleByUser($id: ID!) {
        communityuserrole: getCommunityUserRoleByUser(id: $id) {
            community_id
            user_id
            community {
                id
                title
                summary
            }
        }
    }
`
export const GET_COMMUNITYUSERROLE_BY_COMMUNITY = gql`
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
export const GET_COMMENTS_BY_AUTHOR_ID = gql`
    query getCommentsbyAuthorID($id: ID!) {
        comment: getCommentsbyAuthorID(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`
export const GET_COMMENTS_BY_AUTHOR_ID_RECENT = gql`
    query getCommentsbyAuthorIDRecent($id: ID!) {
        comment: getCommentsbyAuthorIDRecent(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`
export const GET_FAMILY_COMMENTS = gql`
    query getFamilyComments($id: ID!) {
        comment: getFamilyComments(id: $id) {
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
export const GET_USER = gql`
    query getUser($id: ID!) {
        user: getUser(id: $id) {
            id
            email
            username
        }
    }
`
export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        user: getUserByEmail(email: $email) {
            id
            email
            username
        }
    }
`
export const GET_ALL_USER = gql`
    query getAllUser {
        user: getAllUser {
            id
            email
            username
        }
    }
`
export const GET_VIEW_ACCOUNT = gql` 
    query getViewAccount($id: ID!) {
        user: getUser(id: $id) {
            id
            email
            username
        }
        post: getPostsbyAuthorIDRecent(post_id: null, author_id: $id) {
            id
            author_id
            title
            type
            image
            text
            active
            community_id
            updated_at
            created_at
            community {
                id
                title
            }
            comment {
                id
                parent_comment_id
                author_id
                post_id
                comment
                updated_at
                created_at
                user {
                    username
                }
                parent {
                    id
                    author_id
                    comment
                    updated_at
                    created_at
                    user {
                        username
                    }
                }
            }
        }
        comment: getCommentsbyAuthorIDRecent(id: $id) {
            id
            post_id
            author_id
            parent_comment_id
            comment
            updated_at
            created_at
            user {
                username
            }
            post {
                id
                title
                author_id
                community_id
                user {
                    id
                    username
                }
                community {
                    id
                    title
                }
            }
            parent {
                id
                author_id
                comment
                updated_at
                created_at
                user {
                    username
                }
            }
        }
    }
`
export const GET_USER_QUESTIONS = gql`
    query getUserQuestion($email: String!) {
        user: getUserQuestion(email: $email) {
            id
            email
        }
    }
`
export const CHECK_USER_EMAIL = gql`
    query checkUserEmail($email: String!) {
        user: checkUserEmail(email: $email) {
            id
            email
        }
    }
`
export const CHECK_USER_PASSWORD = gql`
    query checkUserPassword($id: ID!, $password: String!) {
        user: checkUserPassword(id: $id, password: $password) {
            id
            email
        }
    }
`
export const CHECK_QUESTION = gql`
    query checkQuestion($user_id: ID!, $question: String!, $answer: String!) {
        security_question: checkQuestion(user_id: $user_id, question: $question, answer: $answer) {
            user_id
            question
        }
    }
`
export const CHECK_EMAIL_AND_PASSWORD = gql`
    query checkEmailAndPassword($id: ID!, $email: String!, $password: String!) {
        emailCheck: checkUserEmail(email: $email) {
            id
            email
        }
        passwordCheck: checkUserPassword(id: $id, password: $password) {
            id
            email
        }
    }
`
export const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!) {
        user: loginUser(email: $email, password: $password) {
            id
            email
            username
        }
    }
`
export const GET_MESSAGES_AND_SENT_MESSAGES = gql`
    query getMessages_SentMessages($id: ID!) {
        message: getMessages(id: $id) {
            id
            sender_id
            recipient_id
            subject_line
            message
            sender_delete
            recipient_delete
            created_at
            sender {
                id
                email
                username
            }
        }
        sentMessage: getSentMessages(id: $id) {
            id
            sender_id
            recipient_id
            subject_line
            message
            sender_delete
            recipient_delete
            created_at
            recipient {
                id
                email
                username
            }
        }
    }
`
export const GET_MESSAGES = gql`
    query getMessages($id: ID!) {
        message: getMessages(id: $id) {
            id
            sender_id
            recipient_id
            subject_line
            message
            sender_delete
            recipient_delete
            created_at
            sender {
                id
                email
                username
            }
        }
    }
`
export const GET_SENT_MESSAGES = gql`
    query getSentMessages($id: ID!) {
        sentMessage: getSentMessages(id: $id) {
            id
            sender_id
            recipient_id
            subject_line
            message
            sender_delete
            recipient_delete
            created_at
            recipient {
                id
                email
                username
            }
        }
    }
`
export const CHECK_POST_UPVOTE = gql`
    query checkPostUpvote($author_id: ID!, $post_id: ID!) {
        post_upvote_downvote: checkPostUpvote(author_id: $author_id, post_id: $post_id) {
            post_id
            author_id
        }
    }
`
export const CHECK_POST_DOWNVOTE = gql`
    query checkPostDownvote($author_id: ID!, $post_id: ID!) {
        post_upvote_downvote: checkPostDownvote(author_id: $author_id, post_id: $post_id) {
            post_id
            author_id
        }
    }
`
export const GET_UPVOTES_POST_ID = gql`
    query getUpvotes_PostID($id: ID!) {
        post_upvote_downvote: getUpvotes_PostID(id: $id) {
            post_id
            author_id
        }
    }
`
export const GET_DOWNVOTES_POST_ID = gql`
    query getDownvotes_PostID($id: ID!) {
        post_upvote_downvote: getDownvotes_PostID(id: $id) {
            post_id
            author_id
        }
    }
`
export const GET_SECURITY_QUESTIONS_BY_AUTHOR_ID = gql`
    query getSecurityQuestionsByAuthorID($id: ID!) {
        security_questions: getSecurityQuestionsByAuthorID(id: $id) {
            user_id
            question
        }
    }
`
//MUTATIONS--------------------------------------------------------------------------------------------------------------------->
export const CREATE_POST = gql`
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
export const UPDATE_POST = gql`
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
export const DELETE_POST = gql`
    mutation deletePost($post: DeletePostInput!){
        deletePost(post: $post) {
            id
        }
    }
`
export const LOCK_POST = gql`
mutation lockPost($post: LockPostInput!){
    lockPost(post: $post) {
        id
        active
    }
}
`
export const CREATE_COMMENT = gql`
    mutation createComment($comment: CommentInput!){
        createComment(comment: $comment) {
            post_id
            author_id
            parent_comment_id
            comment
        }
    }
`
export const UPDATE_COMMENT = gql`
    mutation updateComment($comment: UpdateCommentInput!){
        updateComment(comment: $comment) {
            id
            comment
            updated_at
        }
    }
`
export const DELETE_COMMENT = gql`
    mutation deleteComment($comment: DeleteCommentInput!){
        deleteComment(comment: $comment) {
            id
        }
    }
`
export const DELETE_PARENT_COMMENT = gql`
mutation deleteParentComment($comment: DeleteCommentInput!){
    deleteParentComment(comment: $comment) {
        id
    }
}
`
export const CREATE_COMMUNITY = gql`
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
export const UNBAN_USER = gql`
    mutation unbanUser($communityban: CommunityBanInput!){
        unbanUser(communityban: $communityban) {
            community_id
            user_id
        }
    }
`
export const REGISTER_USER = gql`
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
export const SEND_MESSAGE = gql`
    mutation sendMessage($message: MessageInput!) {
        sendMessage(message: $message) {
            sender_id
            recipient_id
            subject_line
            message
        }
    }
`
export const DELETE_MESSAGE = gql`
    mutation deleteMessage($message: MessageInput!) {
        deleteMessage(message: $message) {
            id
        }
    }
`
export const DELETE_MESSAGE_SENDER_RECIPIENT = gql`
    mutation deleteMessage_sender_recipient($message: MessageInput!) {
        deleteMessage_sender_recipient(message: $message) {
            id
            sender_delete
            recipient_delete
        }
    }
`
export const POST_UPVOTE = gql`
    mutation postUpvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        postUpvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`
export const POST_DOWNVOTE = gql`
    mutation postDownvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        postDownvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`
export const REMOVE_POST_UPVOTE = gql`
    mutation removePostUpvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        removePostUpvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`
export const REMOVE_POST_DOWNVOTE = gql`
    mutation removePostDownvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        removePostDownvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`
export const CREATE_SECURITY_QUESTION = gql`
    mutation createSecurityQuestion($securityQuestion: Security_Question_Input!) {
        createSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
            answer
        }
    }
`
export const UPDATE_SECURITY_QUESTION = gql`
    mutation updateSecurityQuestion($securityQuestion: Security_Question_Input!) {
        updateSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
            answer
        }
    }
`
export const REMOVE_SECURITY_QUESTION = gql`
    mutation removeSecurityQuestion($securityQuestion: Security_Question_Input!) {
        removeSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
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