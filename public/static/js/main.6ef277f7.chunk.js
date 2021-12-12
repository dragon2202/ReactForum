(this.webpackJsonpreactforum=this.webpackJsonpreactforum||[]).push([[0],{570:function(e,t,s){},571:function(e,t,s){"use strict";s.r(t);var i=s(0),a=s.n(i),n=s(45),c=s.n(n),o=s(11),r=s(83),l=s.n(r),m=s(44),d=s(581),j=s(14),u=s.n(j),b=s(32),h=s.n(b),p=s(91),x=s.n(p),O=s(584),y=s(1);const g=[{title:"Home",path:"/"},{title:"Community",path:"/communities"},{title:"Inbox",path:"/inbox"}];function _(){const e=Object(i.useRef)(null),t=Object(i.useRef)(null),[s,a]=Object(i.useState)(!1),[n,c,r]=Object(d.a)(["userCookie"]);let j=Object(m.g)();Object(i.useEffect)((()=>(document.addEventListener("click",b,!0),()=>{document.removeEventListener("click",b,!0)})),[]);const b=s=>{t.current&&t.current.contains(s.target)||e.current&&!e.current.contains(s.target)&&a(!1)};return Object(y.jsxs)("nav",{className:`site-navigation ${s&&"active"}`,children:[Object(y.jsx)("span",{className:"menu-title",children:" My Awesome React Forum "}),Object(y.jsxs)("div",{className:"menu-content-container",ref:e,children:[Object(y.jsx)("ul",{children:g.map(((e,t)=>Object(y.jsx)("li",{children:Object(y.jsx)(o.b,{to:e.path,children:e.title})},t)))}),Object(y.jsxs)("div",{className:"menu-avatar-container",children:[Object(y.jsx)(l.a,{size:50,src:"https://joeschmoe.io/api/v1/jenni"}),Object(y.jsx)(x.a,{placement:"bottomRight",overlay:void 0==n.userCookie||"undefined"==n.userCookie?Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{children:Object(y.jsx)(o.b,{to:"/login",children:"Login"})},"0"),Object(y.jsx)(h.a.Item,{children:Object(y.jsx)(o.b,{to:"/register",children:"Register"})},"1")]}):Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{children:Object(y.jsx)(o.b,{to:"/account",children:"Account"})},"0"),Object(y.jsx)(h.a.Item,{onClick:()=>{r("userCookie",{path:"/",sameSite:"lax",secure:!0}),u.a.success({content:"You successfully logged out.",style:{marginTop:"10vh"}},7),j.push("/")},children:"Log Out"},"1")]}),children:Object(y.jsxs)("a",{className:"ant-dropdown-link",onClick:e=>e.preventDefault(),children:[void 0==n.userCookie?Object(y.jsx)("span",{className:"menu-avatar-name",children:"Guest "}):Object(y.jsxs)("span",{className:"menu-avatar-name",children:[n.userCookie.username," "]}),Object(y.jsx)(O.a,{})]})})]})]}),Object(y.jsx)("i",{className:"icon ionicons ion-ios-menu",ref:t,onClick:e=>a(!s),children:" "})]})}var v=s(583),w=s(19),f=s.n(w),C=s(29),I=s.n(C),N=s(41),k=s.n(N),M=s(62),Y=s.n(M),P=s(63),S=s.n(P),$=s(582),D=s(138),T=s.n(D),U=s(139),A=s.n(U),L=s(15),q=s.n(L);q.a`
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
`;const R=q.a`
    query getPostRecentByAuthorID($id: ID!) {
        post: getPostRecentByAuthorID(id: $id) {
            id
            author_id
        }
    }
`,E=(q.a`
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
`,q.a`
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
`,q.a`
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
`),Q=(q.a`
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
`,q.a`
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
`),F=(q.a`
    query getCommunity($id: ID!) {
        community: getCommunity(id: $id) {
            id
            title
            summary
        }
    }
`,q.a`
    query getAllCommunities {
        community: getAllCommunities {
            id
            title
            summary
        }
    }
`),z=q.a`
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
`,B=q.a`
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
`,H=q.a`
    query checkCommunityName($name: String!) {
        community: checkCommunityName(name: $name) {
            id
            title
        }
    }
`,V=(q.a`
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
`,q.a`
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
`),W=q.a`
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
`,K=(q.a`
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
`,q.a`
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
`,q.a`
    query getCommentsbyPostID($id: ID!) {
        comment: getCommentsbyPostID(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`,q.a`
    query getCommentsbyAuthorID($id: ID!) {
        comment: getCommentsbyAuthorID(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`,q.a`
    query getCommentsbyAuthorIDRecent($id: ID!) {
        comment: getCommentsbyAuthorIDRecent(id: $id) {
            id
            post_id
            author_id
            comment
        }
    }
`,q.a`
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
`),J=(q.a`
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
`,q.a`
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
`,q.a`
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
`,q.a`
    query getPermission($id: ID!) {
        permission: getPermission(id: $id) {
            id
            action
        }
    }
`,q.a`
    query getUser($id: ID!) {
        user: getUser(id: $id) {
            id
            email
            username
        }
    }
`),G=q.a`
    query getUserByEmail($email: String!) {
        user: getUserByEmail(email: $email) {
            id
            email
            username
        }
    }
`,X=q.a`
    query getAllUser {
        user: getAllUser {
            id
            email
            username
        }
    }
`,Z=q.a` 
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
`,ee=(q.a`
    query getUserQuestion($email: String!) {
        user: getUserQuestion(email: $email) {
            id
            email
        }
    }
`,q.a`
    query checkUserEmail($email: String!) {
        user: checkUserEmail(email: $email) {
            id
            email
        }
    }
`),te=q.a`
    query checkUserPassword($id: ID!, $password: String!) {
        user: checkUserPassword(id: $id, password: $password) {
            id
            email
        }
    }
`,se=q.a`
    query checkQuestion($user_id: ID!, $question: String!, $answer: String!) {
        security_question: checkQuestion(user_id: $user_id, question: $question, answer: $answer) {
            user_id
            question
        }
    }
`,ie=q.a`
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
`,ae=q.a`
    query loginUser($email: String!, $password: String!) {
        user: loginUser(email: $email, password: $password) {
            id
            email
            username
        }
    }
`,ne=q.a`
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
`,ce=(q.a`
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
`,q.a`
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
`,q.a`
    query checkPostUpvote($author_id: ID!, $post_id: ID!) {
        post_upvote_downvote: checkPostUpvote(author_id: $author_id, post_id: $post_id) {
            post_id
            author_id
        }
    }
`),oe=q.a`
    query checkPostDownvote($author_id: ID!, $post_id: ID!) {
        post_upvote_downvote: checkPostDownvote(author_id: $author_id, post_id: $post_id) {
            post_id
            author_id
        }
    }
`,re=(q.a`
    query getUpvotes_PostID($id: ID!) {
        post_upvote_downvote: getUpvotes_PostID(id: $id) {
            post_id
            author_id
        }
    }
`,q.a`
    query getDownvotes_PostID($id: ID!) {
        post_upvote_downvote: getDownvotes_PostID(id: $id) {
            post_id
            author_id
        }
    }
`,q.a`
    query getSecurityQuestionsByAuthorID($id: ID!) {
        security_questions: getSecurityQuestionsByAuthorID(id: $id) {
            user_id
            question
        }
    }
`),le=q.a`
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
`,me=q.a`
    mutation updatePost($post: UpdatePostInput!){
        updatePost(post: $post) {
            id
            title
            image
            text
            updated_at
        }
    }
`,de=q.a`
    mutation deletePost($post: DeletePostInput!){
        deletePost(post: $post) {
            id
        }
    }
`,je=q.a`
mutation lockPost($post: LockPostInput!){
    lockPost(post: $post) {
        id
        active
    }
}
`,ue=q.a`
    mutation createComment($comment: CommentInput!){
        createComment(comment: $comment) {
            post_id
            author_id
            parent_comment_id
            comment
        }
    }
`,be=q.a`
    mutation updateComment($comment: UpdateCommentInput!){
        updateComment(comment: $comment) {
            id
            comment
            updated_at
        }
    }
`,he=q.a`
    mutation deleteComment($comment: DeleteCommentInput!){
        deleteComment(comment: $comment) {
            id
        }
    }
`,pe=q.a`
mutation deleteParentComment($comment: DeleteCommentInput!){
    deleteParentComment(comment: $comment) {
        id
    }
}
`,xe=q.a`
mutation createCommunity($communityUser: CommunityUserInput!){
    createCommunity(communityUser: $communityUser) {
        title
        summary
        user_id
    }
}
`,Oe=q.a`
    mutation updateCommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        updateCommunityUserRole(communityuserrole: $communityuserrole) {
            owner_id
            owner_role_id
            community_id
            user_id
            role_id
        }
    }
`,ye=q.a`
    mutation updateCommunityDetails($community: CommunityInput!){
        updateCommunityDetails(community: $community) {
            id
            title
            summary
        }
    }
`,ge=q.a`
    mutation createUser_CommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        createUser_CommunityUserRole(communityuserrole: $communityuserrole) {
            community_id
            user_id
            role_id
        }
    }
`,_e=q.a`
    mutation removeUser_CommunityUserRole($communityuserrole: CommunityUserRoleInput!){
        removeUser_CommunityUserRole(communityuserrole: $communityuserrole) {
            community_id
            user_id
            role_id
        }
    }
`,ve=q.a`
    mutation banUser($communityban: CommunityBanInput!){
        banUser(communityban: $communityban) {
            community_id
            user_id
        }
    }
`,we=q.a`
    mutation unbanUser($communityban: CommunityBanInput!){
        unbanUser(communityban: $communityban) {
            community_id
            user_id
        }
    }
`,fe=q.a`
    mutation registerUser($user: UserInput!){
        registerUser(user: $user) {
            email
            username
            password
        }
    }
`,Ce=q.a`
    mutation changeUserInfo($user: UserInput!) {
        changeUserInfo(user: $user) {
            id
            email
            username
        }
    }
`,Ie=q.a`
    mutation changeUserPassword($user: UserInput!) {
        changeUserPassword(user: $user) {
            id
            password
        }
    }
`,Ne=q.a`
    mutation sendMessage($message: MessageInput!) {
        sendMessage(message: $message) {
            sender_id
            recipient_id
            subject_line
            message
        }
    }
`,ke=q.a`
    mutation deleteMessage($message: MessageInput!) {
        deleteMessage(message: $message) {
            id
        }
    }
`,Me=q.a`
    mutation deleteMessage_sender_recipient($message: MessageInput!) {
        deleteMessage_sender_recipient(message: $message) {
            id
            sender_delete
            recipient_delete
        }
    }
`,Ye=q.a`
    mutation postUpvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        postUpvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`,Pe=q.a`
    mutation postDownvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        postDownvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`,Se=q.a`
    mutation removePostUpvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        removePostUpvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`,$e=q.a`
    mutation removePostDownvote($post_upvote_downvote: Post_Upvote_Downvote_Input!) {
        removePostDownvote(post_upvote_downvote: $post_upvote_downvote) {
            post_id
            author_id
        }
    }
`,De=q.a`
    mutation createSecurityQuestion($securityQuestion: Security_Question_Input!) {
        createSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
            answer
        }
    }
`,Te=q.a`
    mutation updateSecurityQuestion($securityQuestion: Security_Question_Input!) {
        updateSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
            answer
        }
    }
`,Ue=q.a`
    mutation removeSecurityQuestion($securityQuestion: Security_Question_Input!) {
        removeSecurityQuestion(securityQuestion: $securityQuestion) {
            user_id
            question
        }
    }
`;async function Ae(e,t,s,i,a){await e({variables:{post_id:a,author_id:i}}),await t({variables:{post_upvote_downvote:{post_id:a,author_id:i}}}),s()}async function Le(e,t,s,i){await e({variables:{post_upvote_downvote:{post_id:i,author_id:s}}}),t()}async function qe(e,t,s,i){await e({variables:{post_upvote_downvote:{post_id:i,author_id:s}}}),t()}var Re=({post:e,refetch:t})=>{const[s]=Object($.useMutation)(Ye),[i]=Object($.useMutation)(Se),[a]=Object($.useLazyQuery)(oe),[n]=Object($.useMutation)(Pe),[c]=Object($.useMutation)($e),[o]=Object($.useLazyQuery)(ce),[r]=Object(d.a)(["userCookie"]);return void 0===r.userCookie?Object(y.jsxs)("div",{className:"like_dislike",children:[Object(y.jsx)("span",{children:Object(y.jsx)(T.a,{onClick:()=>u.a.warning({content:"Login to like post",style:{marginTop:"10vh"}},10)})}),Object(y.jsx)("span",{children:e.post_upvotes.length-e.post_downvotes.length}),Object(y.jsx)("span",{children:Object(y.jsx)(A.a,{onClick:()=>u.a.warning({content:"Login to dislike post",style:{marginTop:"10vh"}},10)})})]}):e.post_upvotes.find((e=>e.author_id===r.userCookie.id))?Object(y.jsxs)("div",{className:"like_dislike",children:[Object(y.jsx)("span",{children:Object(y.jsx)(T.a,{style:{color:"#065fd4"},onClick:()=>{Le(i,t,r.userCookie.id,e.id)}})}),Object(y.jsx)("span",{children:e.post_upvotes.length-e.post_downvotes.length}),Object(y.jsx)("span",{children:Object(y.jsx)(A.a,{onClick:()=>Ae(o,n,t,r.userCookie.id,e.id)})})]}):e.post_downvotes.find((e=>e.author_id===r.userCookie.id))?Object(y.jsxs)("div",{className:"like_dislike",children:[Object(y.jsx)("span",{children:Object(y.jsx)(T.a,{onClick:()=>Ae(a,s,t,r.userCookie.id,e.id)})}),Object(y.jsx)("span",{children:e.post_upvotes.length-e.post_downvotes.length}),Object(y.jsx)("span",{children:Object(y.jsx)(A.a,{style:{color:"#065fd4"},onClick:()=>{Le(c,t,r.userCookie.id,e.id)}})})]}):Object(y.jsxs)("div",{className:"like_dislike",children:[Object(y.jsx)("span",{children:Object(y.jsx)(T.a,{onClick:()=>qe(s,t,r.userCookie.id,e.id)})}),Object(y.jsx)("span",{children:e.post_upvotes.length-e.post_downvotes.length}),Object(y.jsx)("span",{children:Object(y.jsx)(A.a,{onClick:()=>qe(n,t,r.userCookie.id,e.id)})})]})},Ee=s(20),Qe=s.n(Ee);const{Text:Fe}=Y.a,ze=({item:e})=>Object(y.jsxs)("div",{children:[Object(y.jsx)(o.b,{to:"/community/"+e.community.id,children:e.community.title}),Object(y.jsxs)(Fe,{type:"secondary",children:[" Posted by "," ",Object(y.jsx)(o.b,{to:"/user/"+e.user.id,children:e.user.username})," "," "]}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:Object(y.jsx)("b",{children:e.title})})]});var Be=({item:e,refetch:t})=>{switch(e.type){case"Post":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(ze,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("p",{style:{whiteSpace:"pre-line"},children:e.text})},e.id)]});case"Link":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(ze,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("a",{style:{wordWrap:"break-word"},href:`http://${e.text}`,children:e.text})},e.id)]});case"Image":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(ze,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("img",{alt:"",src:e.image,style:{maxWidth:"100%"}})},e.id)]})}};var He=({post:e,postQueryRefetch:t})=>Object(y.jsx)("div",{children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"large",className:"post-list",pagination:{position:"bottom",pageSize:10},dataSource:e,renderItem:e=>Object(y.jsx)(Be,{item:e,refetch:t})})}),Ve=s(21),We=s.n(Ve),Ke=s(279),Je=s.n(Ke),Ge=s(115),Xe=s.n(Ge);function Ze(){let e=Object(m.g)();const t=t=>e.push({pathname:"/createpost",state:{item:t}});return Object(y.jsx)("div",{className:"create-post-nav",children:Object(y.jsxs)(h.a,{mode:"horizontal",children:[Object(y.jsx)(h.a.Item,{onClick:()=>{t("Post")},className:"MenuItemPost",icon:Object(y.jsx)(We.a,{placeholder:"Create Post"})},"Post"),Object(y.jsx)(h.a.Item,{onClick:()=>{t("Image")},className:"MenuItemImage",icon:Object(y.jsx)(Je.a,{style:{fontSize:"1.5em"}})},"Image"),Object(y.jsx)(h.a.Item,{onClick:()=>{t("Link")},className:"MenuItemLink",icon:Object(y.jsx)(Xe.a,{style:{fontSize:"1.5em"}})},"Link")]})})}var et=({})=>Object(y.jsxs)(f.a,{className:"directory",title:"Directory",children:[Object(y.jsxs)("div",{className:"column",children:[Object(y.jsx)(o.b,{to:"/",className:"link",children:"Home"}),Object(y.jsx)("br",{style:{marginBottom:"0.5em"}}),Object(y.jsx)(o.b,{to:"/account",className:"link",children:"Account"}),Object(y.jsx)("br",{style:{marginBottom:"0.5em"}}),Object(y.jsx)(o.b,{to:"/inbox",className:"link",children:"Inbox"})]}),Object(y.jsxs)("div",{className:"column",children:[Object(y.jsx)(o.b,{to:"/createpost",className:"link",children:"Create Post"}),Object(y.jsx)("br",{style:{marginBottom:"0.5em"}}),Object(y.jsx)(o.b,{to:"/communities",className:"link",children:"Community"}),Object(y.jsx)("br",{style:{marginBottom:"0.5em"}})]})]});function tt(e){return!!e&&e.constructor===Object}function st(e,t){const{data:s,error:i,loading:a}=Object($.useQuery)(t,{variables:{id:e}});return a?"loading":i?"error":s}function it(e){const{data:t,error:s,loading:i}=Object($.useQuery)(e);return i?"loading":s?"error":t}function at(e,t){const{data:s,error:i,loading:a,refetch:n}=Object($.useQuery)(t,{variables:{id:e}});return a?"loading":i?"error":[s,n]}function nt(){let[e,t]=function(e){const{data:t,error:s,loading:i,refetch:a}=Object($.useQuery)(e);return i?"loading":s?"error":[t,a]}(E),s=it(F);return tt(s)&&tt(e)?Object(y.jsx)("main",{className:"home",children:Object(y.jsx)("section",{className:"container",children:Object(y.jsxs)("div",{className:"row",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Home Page"})}),Object(y.jsxs)("div",{className:"masonry-card-grid",children:[Object(y.jsxs)("div",{className:"nested-section",children:[Object(y.jsx)("section",{className:"create-post",children:Object(y.jsx)(Ze,{})}),Object(y.jsx)("section",{className:"post-card",children:Object(y.jsx)(He,{post:e.post,postQueryRefetch:t})})]}),Object(y.jsxs)("div",{className:"community-card",children:[Object(y.jsx)(f.a,{title:"Communities",children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"small",className:"community-list",pagination:{position:"bottom",pageSize:10},dataSource:s.community,renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("div",{children:Object(y.jsx)(o.b,{to:"/community/"+e.id,children:e.title})})},e.id)})}),Object(y.jsx)(et,{})]})]})]})})}):Object(y.jsxs)("main",{className:"home",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Home Page"})}),Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})]})}var ct=s(59),ot=s.n(ct),rt=s(82),lt=s.n(rt),mt=s(202),dt=s.n(mt),jt=s(203),ut=s.n(jt);const{confirm:bt}=ot.a;var ht=({query:e,pageID:t,userID:s,JoinCommunity:i,joinMutation:a,LeaveCommunity:n,leaveMutation:c,refetch:r})=>{const l=e.communityuserrole.find((e=>e.user_id===s)),m=e.communityban.find((e=>e.user_id===s)),d=(t,s)=>{bt({title:"Leave Community - "+e.title,content:"Are you sure you want to leave this community?",okText:"Confirm",onOk(){n(t,c),u.a.success({content:"You have successfully left "+e.title,style:{marginTop:"5vh"}},10),s()},width:"125vh"})};return Object(y.jsx)(f.a,{title:"Description",className:"description",extra:void 0!==l&&(l.user_id===s&&1===l.role_id)?Object(y.jsx)("span",{className:"edit-delete",children:Object(y.jsx)(o.b,{to:`/editcommunity/${t}`,className:"edit",children:Object(y.jsx)(lt.a,{},"edit")})}):void 0!==l&&(l.user_id===s&&2===l.role_id)?Object(y.jsxs)("span",{className:"edit-delete",children:[Object(y.jsx)(o.b,{to:`/editcommunity/${t}`,className:"edit",style:{paddingRight:"5px"},children:Object(y.jsx)(lt.a,{},"edit")}),Object(y.jsx)(dt.a,{type:"primary",onClick:()=>{d(l,r)}})]}):void 0!==l&&(l.user_id===s&&3===l.role_id)?Object(y.jsx)(dt.a,{type:"primary",onClick:()=>{d(l,r)}}):void 0!==m?Object(y.jsx)(ut.a,{type:"primary",onClick:()=>{u.a.error({content:"You were banned from this community. Message an admin to lift ban.",style:{marginTop:"5vh"}},10)}}):null!==s?Object(y.jsx)(ut.a,{type:"primary",onClick:()=>{e.public,bt({title:"Join Community - "+e.title,content:"Are you sure you want to join this community?",okText:"Confirm",onOk(){i(t,s,a),u.a.success({content:"You have successfully joined "+e.title,style:{marginTop:"5vh"}},10),r()},width:"125vh"})}}):null,children:Object(y.jsx)("p",{children:e.summary})})};const{Text:pt}=Y.a,xt=({item:e})=>Object(y.jsxs)("div",{children:[Object(y.jsxs)(pt,{type:"secondary",children:[" Posted by "," ",Object(y.jsx)(o.b,{to:"/user/"+e.user.id,children:e.user.username})," "," "]}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:Object(y.jsx)("b",{children:e.title})})]});var Ot=({post:e,refetch:t})=>{switch(e.type){case"Image":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(xt,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("img",{alt:"",src:e.image,style:{maxWidth:"100%"}})},e.id)]});case"Post":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(xt,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("p",{style:{whiteSpace:"pre-line"},children:e.text})},e.id)]});case"Link":return Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)(Re,{post:e,refetch:t}),Object(y.jsx)(f.a,{className:"content",type:"inner",title:Object(y.jsx)(xt,{item:e}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+e.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("a",{style:{wordWrap:"break-word"},href:`http://${e.text}`,children:e.text})},e.id)]})}};var yt=({query:e,refetch:t})=>Object(y.jsx)(I.a,{itemLayout:"vertical",size:"large",className:"post-list",pagination:{position:"bottom",pageSize:10},dataSource:e.community.post,renderItem:e=>Object(y.jsx)(Ot,{post:e,refetch:t})});async function gt(e,t,s){const i={community_id:parseInt(e),user_id:t,role_id:3};await s({variables:{communityuserrole:i}})}async function _t(e,t){const s={community_id:e.community_id,user_id:e.user_id,role_id:e.role_id};await t({variables:{communityuserrole:s}})}function vt(){let{id:e}=Object(m.i)(),[t,s]=at(e,z);const[i]=Object($.useMutation)(ge),[a]=Object($.useMutation)(_e),[n]=Object(d.a)(["userCookie"]);return tt(t)?Object(y.jsx)("main",{className:"communitypost",children:Object(y.jsx)("section",{className:"container",children:Object(y.jsxs)("div",{className:"row",children:[Object(y.jsx)("h3",{className:"page-title",children:Object(y.jsx)("b",{children:t.community.title})}),Object(y.jsxs)("div",{className:"masonry-card-grid",children:[Object(y.jsxs)("div",{className:"nested-section",children:[Object(y.jsx)("section",{className:"create-post-nav",children:Object(y.jsx)(Ze,{})}),Object(y.jsx)("section",{className:"post-card",children:Object(y.jsx)(yt,{query:t,refetch:s})})]}),Object(y.jsx)("div",{className:"about-card",children:Object(y.jsx)(ht,{query:t.community,pageID:e,userID:void 0!==n.userCookie?n.userCookie.id:null,JoinCommunity:gt,joinMutation:i,LeaveCommunity:_t,leaveMutation:a,refetch:s})})]})]})})}):Object(y.jsx)("main",{className:"communitypost",children:Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})})}var wt=s(104),ft=s.n(wt);var Ct=({item:e,setHovered:t})=>{const[s,a]=Object(i.useState)(""),[n]=Object(d.a)(["userCookie"]);return Object(y.jsx)("div",{className:"card-grid",children:Object(y.jsx)("div",{className:"communities-list",children:Object(y.jsx)(f.a,{title:"Community",extra:void 0==n.userCookie?null:Object(y.jsx)(o.b,{to:"/createcommunity",children:" Create a community"}),children:Object(y.jsx)(I.a,{header:Object(y.jsx)(ft.a,{className:"search",placeholder:"Search Community by Name",onChange:e=>{a(e.target.value)}}),itemLayout:"vertical",size:"large",className:"community-list",pagination:{position:"bottom",pageSize:10},dataSource:e,renderItem:e=>e.title.toLowerCase().includes(s.toLowerCase())?Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(o.b,{to:"/community/"+e.id,onMouseEnter:()=>t({title:e.title,summary:e.summary}),children:e.title})},e.id):null})})})})};var It=({community:e})=>null===e?Object(y.jsx)(f.a,{className:"community-details",title:"List of Communities",children:"Hover over the community's name to see the summary"}):Object(y.jsxs)(f.a,{className:"community-details",children:[Object(y.jsx)("h3",{children:e.title}),Object(y.jsx)("p",{children:e.summary})]});function Nt(){const[e,t]=Object(i.useState)(null);let s=it(F);return tt(s)?Object(y.jsxs)("main",{className:"communities",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Community Home Page"})}),Object(y.jsxs)("span",{className:"nested-section",onMouseLeave:()=>t(null),children:[Object(y.jsx)(Ct,{item:s.community,setHovered:t}),Object(y.jsxs)("div",{className:"description-directory",children:[Object(y.jsx)(It,{community:e}),Object(y.jsx)(et,{})]})]})]}):Object(y.jsxs)("main",{className:"communities",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Community Home Page"})}),Object(y.jsx)("p",{style:{textAlign:"center"},children:"Loading..."})]})}var kt=s(53),Mt=s.n(kt),Yt=s(10),Pt=s.n(Yt),St=s(25),$t=s.n(St),Dt=s(197),Tt=s.n(Dt),Ut=s(120),At=s.n(Ut),Lt=s(133),qt=s.n(Lt),Rt=s(75),Et=s.n(Rt),Qt=s(280),Ft=s.n(Qt);const{confirm:zt}=ot.a;function Bt(e,t,s,i,a,n){zt({title:"Update Role",content:1===s?"Are you sure you want to hand ownership of this community to this person? You will become an Admin.":"Are you sure you want to change "+t+"'s role to "+i,onOk(){!async function(e,t,s,i){let a={...e,role_id:t};await s({variables:{communityuserrole:a}}),u.a.success({content:"You have successfully updated a user's role.",style:{marginTop:"5vh"}},10),i()}(e,s,a,n)},width:"125vh"})}var Ht=({role_title:e,key:t,communityuserrole:s,username:i,mutation:a,refetch:n})=>"Owner"===e?Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{onClick:()=>Bt(s,i,1,"Owner",a,n),children:"Owner"},t),Object(y.jsx)(h.a.Item,{onClick:()=>Bt(s,i,2,"Admin",a,n),children:"Admin"},t),Object(y.jsx)(h.a.Item,{onClick:()=>Bt(s,i,3,"User",a,n),children:"User"},t)]}):"Admin"===e?Object(y.jsx)(h.a,{children:Object(y.jsx)(h.a.Item,{onClick:()=>Bt(s,i,2,"Admin",a,n),children:Object(y.jsx)("div",{children:"Admin"})},t)}):void 0;const{confirm:Vt}=ot.a;function Wt(e,t,s,i,a){Vt({title:"Remove User",content:"Are you sure you want to remove this person from the community?",onOk(){!async function(e,t,s,i,a){const n={community_id:e,user_id:t,role_id:s};await i({variables:{communityuserrole:n}}),u.a.success({content:"You have successfully removed a user from this community.",style:{marginTop:"5vh"}},10),a()}(e,t,s,i,a)},width:"125vh"})}function Kt(e,t,s,i){Vt({title:"Ban User",content:"Are you sure you want to ban this person from the community?",onOk(){!async function(e,t,s,i){const a={community_id:e,user_id:t};await s({variables:{communityban:a}}),u.a.success({content:"You have successfully banned a user from this community.",style:{marginTop:"5vh"}},10),i()}(e,t,s,i)},width:"125vh"})}function Jt(e,t,s,i){Vt({title:"Unban User",content:"Are you sure you want to unban this person from the community?",onOk(){!async function(e,t,s,i){const a={community_id:e,user_id:t};await s({variables:{communityban:a}}),u.a.success({content:"You have successfully banned a user from this community.",style:{marginTop:"5vh"}},10),i()}(e,t,s,i)},width:"125vh"})}const{TabPane:Gt}=Mt.a;function Xt(){let{id:e}=Object(m.i)(),[t,s]=at(e,B);const[a,n]=Object(i.useState)("1"),[c,o]=Object(i.useState)(""),[r]=Object($.useMutation)(Oe),[l]=Object($.useMutation)(_e),[j]=Object($.useMutation)(ye),[b]=Object($.useMutation)(ve),[h]=Object($.useMutation)(we),[p]=Object(d.a)(["userCookie"]);let O,g=void 0===t.community?null:t.community.communityuserrole.find((e=>e.user_id===p.userCookie.id));if(void 0===p.userCookie)return Object(y.jsx)(m.a,{to:"/error"});if(!tt(t))return Object(y.jsxs)("main",{className:"editcommunity",children:[Object(y.jsx)("h3",{children:"Edit Community"}),Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})]});return Object(y.jsxs)("main",{className:"editcommunity",children:[Object(y.jsx)("h3",{children:"Edit Community"}),Object(y.jsx)(f.a,{className:"card-tab",children:Object(y.jsxs)(Mt.a,{type:"card",className:"tab",defaultActiveKey:a,children:[Object(y.jsxs)(Gt,{tab:"Edit Users in Community",children:[Object(y.jsx)(Tt.a,{className:"search-bar",placeholder:"Search Users",onChange:function(e){o(e.target.value)},className:"search-bar"}),Object(y.jsx)(I.a,{itemLayout:"vertical",size:"large",dataSource:t.community.communityuserrole,renderItem:t=>t.user.username.toLowerCase().includes(c.toLowerCase())?Object(y.jsx)(I.a.Item,{children:Object(y.jsxs)(At.a,{title:t.user.username,className:"user-info",extra:g.user_id===t.user_id||g.role_id>=t.role_id?null:Object(y.jsxs)("span",{children:[Object(y.jsx)(Ft.a,{onClick:()=>Kt(t.community_id,t.user_id,b,s),style:{marginRight:"10px"}}),Object(y.jsx)(Et.a,{onClick:()=>Wt(t.community_id,t.user_id,t.role_id,l,s)})]}),children:[Object(y.jsx)(At.a.Item,{label:"Email",children:t.user.email}),Object(y.jsx)(At.a.Item,{label:"Current Role",children:t.role.title}),p.userCookie.id===t.user_id?null:"Owner"===g.role.title||"Admin"!==t.role.title&&"Owner"!==t.role.title?Object(y.jsx)(At.a.Item,{label:"Edit Role",children:Object(y.jsx)(x.a,{overlay:Object(y.jsx)(Ht,{role_title:g.role.title,communityuserrole:O={owner_id:g.user_id,owner_role_id:g.role_id,community_id:parseInt(e),user_id:t.user.id},username:t.user.username,mutation:r,refetch:s},t.user_id+t.role_id),children:Object(y.jsxs)("a",{children:[" ",t.role.title," ",Object(y.jsx)(qt.a,{})]})})}):null]})},t.user_id):null})]},"1"),Object(y.jsx)(Gt,{tab:"Edit Community Details",children:Object(y.jsxs)(Pt.a,{className:"community-form",labelCol:{span:4},wrapperCol:{span:16},name:"basic",onFinish:t=>{!async function(e,t,s,i,a){const n={id:parseInt(t),title:e.title,summary:e.description};await s({variables:{community:n}}),u.a.success({content:"You have successfully updated details of the community.",style:{marginTop:"5vh"}},10),a("2"),i()}(t,e,j,s,n)},children:[Object(y.jsx)(Pt.a.Item,{label:"Title",name:"title",initialValue:t.community.title,children:Object(y.jsx)(We.a,{className:"title"})}),Object(y.jsx)(Pt.a.Item,{label:"Description",name:"description",initialValue:t.community.summary,children:Object(y.jsx)(We.a.TextArea,{className:"description"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:4,span:16},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})},"2"),Object(y.jsx)(Gt,{tab:"Community Bans",children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"large",dataSource:t.community.communityban,renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsxs)("span",{children:[e.user.username,Object(y.jsx)(Et.a,{style:{float:"right"},onClick:()=>Jt(e.community_id,e.user_id,h,s)})]})})})},"3")]})})]})}const{TextArea:Zt}=We.a;function es(){let e=Object(m.g)();const[t]=Object($.useMutation)(xe),[s,a]=Object(i.useState)(""),[n,c]=Object(i.useState)(null),[o]=Object(d.a)(["userCookie"]),r=window.localStorage,[l]=Object($.useLazyQuery)(H,{onCompleted:e=>{a(e)}});return Object(i.useEffect)((()=>{null!=r.getItem("reload")&&(u.a.success({content:"You have successfully create a commmunity.",style:{marginTop:"5vh"}},10),r.clear(),e.push("/communities"))}),[]),Object(i.useEffect)((async()=>{s&&(s.community.title?u.a.warning("This community title is already taken. Input a different one.",20):(await t({variables:{communityUser:n}}),window.location.reload()))}),[s]),Object(y.jsxs)("div",{className:"createcommunity",children:[Object(y.jsx)("h3",{children:"Create Community"}),Object(y.jsxs)(Pt.a,{className:"create-community-form",labelCol:{span:6},wrapperCol:{span:12},onFinish:async function(e){var t=0;void 0!==e.title&&""!==e.title||(u.a.warning({content:"Please fill out title",style:{marginTop:"5vh"}},10),t++),void 0!==e.summary&&""!==e.summary||(u.a.warning({content:"Please fill out summary",style:{marginTop:"5vh"}},10),t++),r.setItem("reload",1);var s={title:e.title,summary:e.summary,user_id:o.userCookie.id};c(s),0===t&&l({variables:{name:e.title}})},children:[Object(y.jsx)(Pt.a.Item,{label:"Title",name:"title",children:Object(y.jsx)(We.a,{})}),Object(y.jsx)(Pt.a.Item,{label:"Summary",name:"summary",children:Object(y.jsx)(Zt,{rows:5,spellCheck:"false"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:6,span:12},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})]})}var ts=({})=>Object(y.jsxs)(f.a,{className:"LoginOrRegister",children:[Object(y.jsx)("div",{style:{float:"left",marginLeft:"20px",marginTop:"5px"},children:Object(y.jsx)("span",{children:"Login or sign up to access this content"})}),Object(y.jsxs)("div",{style:{float:"right",marginRight:"20px"},children:[Object(y.jsx)($t.a,{style:{marginRight:"10px"},children:Object(y.jsx)(o.b,{to:"/login",children:"Login Page"})}),Object(y.jsx)($t.a,{style:{marginLeft:"10px"},type:"primary",children:Object(y.jsx)(o.b,{to:"/register",children:"Register Page"})})]})]}),ss=s(281),is=s.n(ss),as=s(282),ns=s.n(as),cs=s(283),os=s.n(cs),rs=s(284),ls=s.n(rs);var ms=({imageState:e,setImageState:t})=>Object(y.jsx)(is.a,{multiple:!0,value:e,onChange:e=>t(e),maxNumber:1,dataURLKey:"data_url",className:"ImageUploading",children:({imageList:e,onImageUpload:t,onImageUpdate:s,onImageRemove:i})=>Object(y.jsxs)("div",{className:"upload_image-wrapper",children:[Object(y.jsx)($t.a,{className:"uploadButton",icon:Object(y.jsx)(ns.a,{}),onClick:t,children:"Upload Image"}),e.map(((e,t)=>Object(y.jsxs)("div",{className:"image-item",children:[Object(y.jsxs)("div",{className:"image-item__btn-wrapper",children:[Object(y.jsx)($t.a,{className:"update",icon:Object(y.jsx)(os.a,{}),onClick:()=>s(t),children:"Update"}),Object(y.jsx)($t.a,{className:"remove",icon:Object(y.jsx)(ls.a,{}),onClick:()=>i(t),children:"Remove"})]}),Object(y.jsx)("img",{className:"preview-image",src:e.data_url,alt:""})]},t)))]})});const{TextArea:ds}=We.a,js=({community:e})=>""===e?Object(y.jsx)($t.a,{disabled:!0,children:"Submit"}):Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"});async function us(e,t,s,i,a,n,c){let o;if("Post"!==t&&"Link"!==t||e.title&&e.text)if("Image"!==t||e.title&&0!==a.length)switch(t){case"Post":case"Link":o={author_id:i,title:e.title,type:t,image:null,text:e.text,active:1,community_id:s.id},await n({variables:{post:o}}),c({variables:{id:i}});break;case"Image":o={author_id:i,title:e.title,type:t,image:a[0].data_url,text:null,active:1,community_id:s.id},await n({variables:{post:o}}),c({variables:{id:i}})}else u.a.warning({content:"Please input both a title and an image ",style:{marginTop:"5vh"}},10);else u.a.warning({content:"Please fill out both title and description ",style:{marginTop:"5vh"}},10)}var bs=({type:e,community:t,author_id:s})=>{let a=Object(m.g)();const[n,c]=Object(i.useState)([]),[o]=Object($.useMutation)(le),[r]=Object($.useLazyQuery)(R,{onCompleted:e=>{u.a.success({content:"You have successfully posted",style:{marginTop:"5vh"}},15),a.push("/viewpost/"+e.post.id)},fetchPolicy:"network-only"});switch(e){case"Post":return Object(y.jsxs)(Pt.a,{className:"createpost_post",onFinish:i=>us(i,e,t,s,n,o,r),children:[Object(y.jsx)(Pt.a.Item,{name:"title",children:Object(y.jsx)(We.a,{placeholder:"Title"})}),Object(y.jsx)(Pt.a.Item,{name:"text",children:Object(y.jsx)(ds,{className:"post_textarea",allowClear:!0,placeholder:"Text"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)(js,{community:t})})]});case"Image":return Object(y.jsxs)(Pt.a,{className:"create-post_image",onFinish:i=>us(i,e,t,s,n,o,r),children:[Object(y.jsx)(Pt.a.Item,{name:"title",children:Object(y.jsx)(We.a,{placeholder:"Title"})}),Object(y.jsx)(Pt.a.Item,{name:"image",className:"image",children:Object(y.jsx)(ms,{imageState:n,setImageState:c})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)(js,{community:t})})]});case"Link":return Object(y.jsxs)(Pt.a,{className:"create-post_link",onFinish:i=>us(i,e,t,s,n,o,r),children:[Object(y.jsx)(Pt.a.Item,{name:"title",children:Object(y.jsx)(We.a,{placeholder:"Title"})}),Object(y.jsx)(Pt.a.Item,{name:"text",extra:"Correct Format: www.google.com or google.com | Incorrect Format: https://google.com or http://google.com",children:Object(y.jsx)(We.a,{placeholder:"Link"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)(js,{community:t})})]})}};const hs=({})=>Object(y.jsx)(f.a,{className:"rules",children:Object(y.jsxs)(I.a,{className:"rules",header:"Posting Rules",children:[Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Keep it legal, and avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions."})}),Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Harrassment, Bullying, and threats are strictly forbidden"})}),Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Abide by community rules. Post authentic content."})}),Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Respect the privacy of others. Instigating harassment, for example by revealing someone\u2019s personal or confidential information, is not allowed. Never post or threaten to post intimate or sexually-explicit media of someone without their consent."})}),Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Do not post or encourage the posting of sexual or suggestive content involving minors."})}),Object(y.jsx)(I.a.Item,{children:Object(y.jsx)("p",{children:"Don\u2019t impersonate an individual or an entity in a misleading or deceptive manner."})})]})});var ps=({item:e})=>tt(e)?Object(y.jsxs)("div",{className:"community_rules",children:[Object(y.jsxs)(f.a,{children:[Object(y.jsx)("div",{className:"title",children:e.community.title}),e.community.summary]}),Object(y.jsx)(hs,{}),Object(y.jsx)(et,{})]}):Object(y.jsxs)("div",{className:"community_rules",children:[Object(y.jsx)(hs,{}),Object(y.jsx)(et,{})]});var xs=({communityQuery:e,community:t,setCommunity:s})=>0===e.length?Object(y.jsx)($t.a,{children:"Join a Community to Post "}):Object(y.jsx)(x.a,{className:"dropdown",overlay:Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{onClick:()=>s(""),children:"No Community"},0),e.map((e=>Object(y.jsx)(h.a.Item,{onClick:()=>s({title:e.community.title,id:e.community.id}),children:e.community.title},e.community.id)))]}),children:Object(y.jsx)($t.a,{className:"dropdown-button",children:Object(y.jsxs)("div",{className:"button-style",children:[Object(y.jsx)("span",{children:0===t.length?"Choose a Community":t.title}),Object(y.jsx)("span",{children:Object(y.jsx)(qt.a,{})})]})})}),Os=s(172),ys=s.n(Os),gs=s(285),_s=s.n(gs);var vs=({currentMenu:e,setMenu:t})=>Object(y.jsxs)(h.a,{className:"createpost_menu",mode:"horizontal",selectedKeys:[e],children:[Object(y.jsx)(h.a.Item,{icon:Object(y.jsx)(_s.a,{}),onClick:()=>t("Post"),children:"Post"},"Post"),Object(y.jsx)(h.a.Item,{icon:Object(y.jsx)(ys.a,{}),onClick:()=>t("Image"),children:"Image"},"Image"),Object(y.jsx)(h.a.Item,{icon:Object(y.jsx)(Xe.a,{}),onClick:()=>t("Link"),children:"Link"},"Link")]});function ws(){const e=Object(m.h)(),[t]=Object(d.a)(["userCookie"]),[s,a]=Object(i.useState)("Post"),[n,c]=Object(i.useState)("");let o=tt(t.userCookie)?st(t.userCookie.id,W):null;return Object(i.useEffect)((()=>{e.state&&a(e.state.item)}),[e]),tt(t.userCookie)?tt(o)?Object(y.jsx)("main",{className:"createpost",children:Object(y.jsxs)("div",{className:"createpost_community_rules",children:[Object(y.jsxs)("div",{className:"createpost-wrapper",children:[Object(y.jsx)("div",{className:"header",children:"Create a Post"}),Object(y.jsx)("hr",{className:"horizontal-rule"}),Object(y.jsx)(xs,{communityQuery:o.communityuserrole,community:n,setCommunity:c}),Object(y.jsxs)(f.a,{className:"createpost_card",children:[Object(y.jsx)(vs,{setMenu:a,currentMenu:s}),Object(y.jsx)(bs,{type:s,community:n,author_id:t.userCookie.id})]})]}),Object(y.jsx)(ps,{item:o.communityuserrole.find((e=>e.community.id===n.id))})]})}):Object(y.jsxs)("main",{className:"createpost",children:[Object(y.jsx)("h3",{children:"Create Post"}),Object(y.jsx)("p",{style:{textAlign:"center"},children:"Loading..."})]}):Object(y.jsxs)("main",{className:"createpost",children:[Object(y.jsx)("h3",{children:"Create Post"}),Object(y.jsx)(ts,{})]})}var fs=s(173),Cs=s.n(fs),Is=s(155),Ns=s.n(Is);const{confirm:ks}=ot.a;function Ms(e,t,s,i,a,n){ks({title:"Delete Post",content:"Note: Deleting posts with commments will make it inactive, making the post still accessible. Posts without comments will be removed forever.",icon:null,onOk(){!async function(e,t,s,i,a,n){if(t.userCookie.id==e.author_id){const t={id:parseInt(s),commentLength:e.comment.length};await i({variables:{post:t}}),u.a.success({content:"You have successfully deleted a post",style:{marginTop:"5vh"}},10),n.push("/")}else u.a.error({content:"This action cannot be completed as you are not the author",style:{marginTop:"5vh"}},10)}(e,t,s,i,0,n)},width:"125vh"})}function Ys(e,t,s,i,a){ks({title:"Change Post's Active Status",content:"Note: Changing active status of a post will make the enable/disable the author from making edits. Inactive posts will be hidden from being on View Post Page and Home Page.",icon:null,onOk(){!async function(e,t,s,i,a){if(t.userCookie.id===e.author_id){a.setItem("reload",5);const t={id:parseInt(s),active:e.active};await i({variables:{post:t}}),window.location.reload()}else u.a.error({content:"This action cannot be completed as you are not the author",style:{marginTop:"5vh"}},10)}(e,t,s,i,a)},width:"125vh"})}function Ps(e){switch(e.type){case"Image":return Object(y.jsx)("img",{alt:"",src:e.image,style:{maxHeight:"60vh",display:"block",marginLeft:"auto",marginRight:"auto"}});case"Post":return Object(y.jsx)("p",{children:e.text});case"Link":return Object(y.jsx)("a",{href:`https://${e.text}`,children:e.text})}}const{Text:Ss}=Y.a,$s=({item:e})=>Object(y.jsxs)("div",{children:[Object(y.jsx)(Ss,{type:"secondary",children:" Posted by "+e.user.username+" "}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:Object(y.jsx)("b",{children:e.title})})]});var Ds=({post:e,id:t,cookies:s,isEditable:i,triggerEditable:a,deletePostMutation:n,lockPostMutation:c,localStorage:o,history:r})=>Object(y.jsxs)(f.a,{title:Object(y.jsx)($s,{item:e}),className:"viewpost-card",extra:Object(y.jsxs)(k.a,{title:"Inactive posts are locked and cannot be edited. It will also be hidden in Community and Home.",placement:"bottomLeft",children:[Object(y.jsx)(Ns.a,{})," ",1==e.active?"Status: Active":"Status: Inactive"]}),actions:void 0!==s.userCookie&&s.userCookie.id===e.author_id?[Object(y.jsx)(lt.a,{onClick:()=>a(!i)},"edit"),Object(y.jsx)(Et.a,{onClick:()=>Ms(e,s,t,n,0,r)}),Object(y.jsx)(Cs.a,{onClick:()=>Ys(e,s,t,c,o)})]:null,children:[Object(y.jsx)("div",{className:"clear",children:" "}),Ps(e)]});const{TextArea:Ts}=We.a,{Text:Us}=Y.a,As=({item:e})=>Object(y.jsxs)("div",{children:[Object(y.jsx)(o.b,{to:"/viewpost/"+e.community.id,children:e.community.title}),Object(y.jsx)(Us,{type:"secondary",children:" Posted by "+e.user.username+" "}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:Object(y.jsx)("b",{children:e.title})})]});var Ls=({post:e,id:t,post_type:s,cookies:a,isEditable:n,triggerEditable:c,deletePostMutation:o,lockPostMutation:r,update_post_mutation:l,localStorage:m,history:d})=>{const[j,b]=Object(i.useState)([]),h=t=>{!async function(e,t,s,i,a){let n;switch(a.setItem("reload",6),e.type){case"Post":n={id:parseInt(e.id),title:t.title,image:null,text:t.text,updated_at:Qe()(new Date).format("YYYY-MM-DD HH:mm:ss").toString()};try{await i({variables:{post:n}}),window.location.reload()}catch(c){u.a.error({content:"An error has occurred. ",style:{marginTop:"5vh"}},10)}break;case"Image":n={id:parseInt(e.id),title:t.title,image:0!==s.length?s[0].data_url:null,text:null,updated_at:Qe()(new Date).format("YYYY-MM-DD HH:mm:ss").toString()};try{await i({variables:{post:n}}),window.location.reload()}catch(c){u.a.error({content:"An error has occurred. ",style:{marginTop:"5vh"}},10)}break;case"Link":n={id:parseInt(e.id),title:t.title,image:null,text:t.text,updated_at:Qe()(new Date).format("YYYY-MM-DD HH:mm:ss").toString()};try{await i({variables:{post:n}}),window.location.reload()}catch(c){u.a.error({content:"An error has occurred. ",style:{marginTop:"5vh"}},10)}}}(e,t,j,l,m)},p=({post_type:t})=>{switch(t){case"Post":return Object(y.jsx)("div",{className:"viewpost_edit_post",children:Object(y.jsxs)(Pt.a,{name:"edit_post",className:"edit-post_post",initialValues:{title:e.title,text:e.text},onFinish:h,children:[Object(y.jsx)(Pt.a.Item,{name:"title",children:Object(y.jsx)(We.a,{})}),Object(y.jsx)(Pt.a.Item,{name:"text",children:Object(y.jsx)(Ts,{className:"textArea",spellCheck:"false",allowClear:!0})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})});case"Link":return Object(y.jsx)("div",{className:"viewpost_edit-link",children:Object(y.jsx)("div",{className:"edit-content-link",children:Object(y.jsxs)(Pt.a,{name:"edit_post",className:"edit-post_link",initialValues:{title:e.title,link:e.text},onFinish:h,children:[Object(y.jsx)(Pt.a.Item,{name:"title",children:Object(y.jsx)(We.a,{})}),Object(y.jsx)(Pt.a.Item,{name:"link",extra:"Correct Format: www.google.com or google.com | Incorrect Format: https://google.com or http://google.com",children:Object(y.jsx)(We.a,{})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})})});case"Image":return Object(y.jsxs)("div",{className:"viewpost_edit_image",children:[Object(y.jsxs)("div",{className:"current-image",children:[Object(y.jsx)("h2",{className:"header2",children:"Current Image"}),Object(y.jsx)("img",{className:"image",src:e.image,alt:""})]}),Object(y.jsxs)("div",{className:"edit-post_image",children:[Object(y.jsx)("h2",{className:"header2",children:"Change Current Image"}),Object(y.jsxs)(Pt.a,{name:"edit_post",initialValues:{title:e.title},onFinish:h,layout:"vertical",className:"form",children:[Object(y.jsx)(Pt.a.Item,{name:"title",className:"edit-post_image_title",label:"Title",children:Object(y.jsx)(We.a,{})}),Object(y.jsx)(Pt.a.Item,{name:"image",className:"edit-post_image_image",children:Object(y.jsx)(ms,{imageState:j,setImageState:b})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})]})]})}};return Object(y.jsx)(f.a,{title:Object(y.jsx)(As,{item:e}),className:"viewpost-editcard",actions:void 0!==a.userCookie&&a.userCookie.id===e.author_id?[Object(y.jsx)(lt.a,{onClick:()=>c(!n)},"edit"),Object(y.jsx)(Et.a,{onClick:()=>Ms(e,a,t,o,0,d)}),Object(y.jsx)(Cs.a,{onClick:()=>Ys(e,a,t,r,m)})]:null,children:Object(y.jsx)(p,{post_type:s})})},qs=s(76),Rs=s.n(qs);const{TextArea:Es}=We.a,{confirm:Qs}=ot.a,Fs=({commentsObj:e,parentID:t,handleChange:s,handleSubmit:a,handleEditSubmit:n,showConfirm:c,value:o,cookies:r})=>{const[l,m]=Object(i.useState)(""),[d,j]=Object(i.useState)("");return e.filter((e=>e.parent_comment_id===t)).map((t=>Object(y.jsxs)(Rs.a,{actions:[void 0!=r.userCookie?Object(y.jsxs)("div",{children:[Object(y.jsx)("span",{style:{cursor:"pointer"},onClick:()=>{m(l===t.id?"":t.id)},children:"Reply"},"comment-list-reply-to-"+t.id.toString()),r.userCookie.id==t.author_id?Object(y.jsxs)("span",{children:[Object(y.jsx)("span",{style:{marginLeft:"5px",cursor:"pointer"},onClick:()=>{j(d===t.id?"":t.id)},children:"Edit"},"comment-list-edit-"+t.id.toString()),Object(y.jsx)("span",{style:{marginLeft:"5px",cursor:"pointer"},onClick:()=>{c(t.id)},children:"Delete"},"comment-list-delete-"+t.id.toString())]}):null]}):Object(y.jsx)("span",{children:"Login to reply"})],author:t.user.username,datetime:Qe()(parseInt(t.updated_at)).format("MMMM Do YYYY, h:mm:ss a"),content:d===t.id?Object(y.jsx)(zs,{display:d===t.id,EditorKey:t.id,onChange:e=>s(e),onSubmit:()=>n(o,t.id),defaultValue:t.comment}):null==t.comment?Object(y.jsx)("p",{style:{fontWeight:"bold"},children:"This post is unavailable or deleted"}):Object(y.jsx)("p",{children:t.comment}),children:[Object(y.jsx)(zs,{display:l===t.id,EditorKey:t.id,onChange:e=>s(e),onSubmit:()=>a(o,t.id),value:o,defaultValue:""}),Object(y.jsx)(Fs,{commentsObj:e,parentID:t.id,handleChange:s,handleSubmit:a,handleEditSubmit:n,showConfirm:c,value:o,cookies:r})]},t.id)))},zs=({display:e,EditorKey:t,onChange:s,onSubmit:i,defaultValue:a})=>!1===e?null:Object(y.jsxs)(Pt.a,{children:[Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)(Es,{className:"editor",rows:4,onChange:s,defaultValue:a})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{htmlType:"submit",type:"primary",onClick:i,children:"Submit"})})]},t);var Bs=({commentsObj:e})=>{const t=e.filter((e=>null===e.parent_comment_id)),[s,a]=Object(i.useState)(""),[n,c]=Object(i.useState)(""),[o,r]=Object(i.useState)(""),[l]=Object(d.a)(["userCookie"]),[j]=Object($.useMutation)(ue),[u]=Object($.useMutation)(be),[b]=Object($.useMutation)(he),[h]=Object($.useMutation)(pe);let{id:p}=Object(m.i)();const x=window.localStorage,[O,g]=Object(i.useState)(null),[_]=Object($.useLazyQuery)(K,{onCompleted:e=>{g(e.comment)}});function v(e){Qs({title:"Are you sure you want to delete this comment?",content:"Note: Parent comments will not be deleted until the child comments are deleted as well",onOk(){!async function(e){_({variables:{id:parseInt(e)}})}(e)},width:"125vh"})}Object(i.useEffect)((async()=>{null!==O&&(0===O.child.length?(x.setItem("reload",2),await b({variables:{comment:{id:O.id}}}),null!==O.parent.id&&null===O.parent.comment?_({variables:{id:parseInt(O.parent.id)}}):window.location.reload()):(x.setItem("reload",2),await h({variables:{comment:{id:O.id}}}),window.location.reload()))}),[O]);const w=e=>{r(e.target.value)};async function f(e,t){x.setItem("reload",1);const s={post_id:parseInt(p),author_id:l.userCookie.id,parent_comment_id:t,comment:e};await j({variables:{comment:s}}),window.location.reload()}async function C(e,t){x.setItem("reload",3);const s={id:parseInt(t),comment:e,updated_at:Qe()(new Date).format("YYYY-MM-DD HH:mm:ss").toString()};await u({variables:{comment:s}}),window.location.reload()}return t.map((t=>Object(y.jsxs)(Rs.a,{actions:[void 0!=l.userCookie?Object(y.jsxs)("div",{children:[Object(y.jsx)("span",{style:{cursor:"pointer"},onClick:()=>{a(s===t.id?"":t.id)},children:"Reply"},"comment-list-reply-to-"+t.id.toString()),l.userCookie.id==t.author_id?Object(y.jsxs)("span",{children:[Object(y.jsx)("span",{style:{marginLeft:"5px",cursor:"pointer"},onClick:()=>{c(n===t.id?"":t.id)},children:"Edit"},"comment-list-edit-"+t.id.toString()),Object(y.jsx)("span",{style:{marginLeft:"5px",cursor:"pointer"},onClick:()=>{v(t.id)},children:"Delete"},"comment-list-delete-"+t.id.toString())]}):null]}):Object(y.jsx)("span",{children:"Login to reply"})],author:t.user.username,datetime:Qe()(parseInt(t.updated_at)).format("MMMM Do YYYY, h:mm:ss a"),content:n===t.id?Object(y.jsx)(zs,{display:n===t.id,EditorKey:t.id,onChange:e=>w(e),onSubmit:()=>C(o,t.id),defaultValue:t.comment}):null==t.comment?Object(y.jsx)("p",{style:{fontWeight:"bold"},children:"This post is unavailable or deleted"}):Object(y.jsx)("p",{children:t.comment}),children:[Object(y.jsx)(zs,{display:s===t.id,EditorKey:t.id,onChange:e=>w(e),onSubmit:()=>f(o,t.id),value:o,defaultValue:""}),Object(y.jsx)(Fs,{commentsObj:e,parentID:t.id,handleChange:w,handleSubmit:f,handleEditSubmit:C,showConfirm:v,value:o,cookies:l})]},t.id)))};const{TextArea:Hs}=We.a;function Vs(){let e=Object(m.g)(),{id:t}=Object(m.i)(),s=st(t,Q);const[a,n]=Object(i.useState)(""),[c,r]=Object(i.useState)(!1),[l]=Object($.useMutation)(ue),[j]=Object($.useMutation)(de),[b]=Object($.useMutation)(je),[h]=Object($.useMutation)(me),[p]=Object(d.a)(["userCookie"]),x=window.localStorage;if(Object(i.useEffect)((()=>{null!=x.getItem("reload")&&(!function(e){switch(parseInt(e.getItem("reload"))){case 1:u.a.success({content:"You have successfully commented",style:{marginTop:"5vh"}},10);break;case 2:u.a.success({content:"You have successfully deleted a comment.",style:{marginTop:"5vh"}},10);break;case 3:u.a.success({content:"You have successfully changed a comment",style:{marginTop:"5vh"}},10);break;case 4:u.a.success({content:"You have successfully deleted a post. Posts are inactive instead if it has comment(s). ",style:{marginTop:"5vh"}},20);break;case 5:u.a.success({content:"You have successfully changed the active status of your post.",style:{marginTop:"5vh"}},20);break;case 6:u.a.success({content:"You have successfully updated your post.",style:{marginTop:"5vh"}},20)}}(x),x.clear())}),[]),!tt(s))return Object(y.jsx)("main",{className:"viewpost",children:Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})});const O=({toggle:i})=>i?Object(y.jsx)(Ls,{post:s.post,id:t,post_type:s.post.type,cookies:p,isEditable:c,triggerEditable:r,deletePostMutation:j,lockPostMutation:b,update_post_mutation:h,localStorage:x,history:e}):Object(y.jsx)(Ds,{post:s.post,id:t,cookies:p,isEditable:c,triggerEditable:r,deletePostMutation:j,lockPostMutation:b,localStorage:x,history:e});return Object(y.jsxs)("main",{className:"viewpost",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:c?"Edit Post":"View Post"})}),Object(y.jsxs)("div",{className:"Post_Comment_Community",children:[Object(y.jsxs)("div",{className:"Post_Comment",children:[Object(y.jsx)(O,{toggle:c}),Object(y.jsx)("div",{className:"CommentDisplay",children:Object(y.jsxs)(f.a,{title:`${s.post.comment.length} ${s.post.comment.length>1?"comments":"comment"}`,children:[void 0!==p.userCookie?Object(y.jsx)(f.a,{className:"CommentForm",children:Object(y.jsxs)(Pt.a,{children:[Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)(Hs,{className:"editor",rows:4,onChange:e=>n(e.target.value)})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{htmlType:"submit",type:"primary",onClick:()=>async function(e,t,s,i,a){e.setItem("reload",1);const n={post_id:parseInt(t),author_id:s.userCookie.id,parent_comment_id:null,comment:i};await a({variables:{comment:n}}),window.location.reload()}(x,t,p,a,l),children:"Add Comment"})})]},0)}):Object(y.jsx)(ts,{}),Object(y.jsx)(Bs,{commentsObj:s.post.comment})]})})]}),Object(y.jsxs)("div",{className:"community_directory",children:[Object(y.jsxs)(f.a,{children:[Object(y.jsx)("div",{className:"title",children:Object(y.jsx)(o.b,{to:"/community/"+s.post.community.id,children:s.post.community.title})}),s.post.community.summary]}),Object(y.jsx)(et,{})]})]})]})}var Ws=s(116),Ks=s.n(Ws),Js=s(137),Gs=s.n(Js);function Xs(e){var t=0;for(const s in e)void 0!==e[s]&&""!==e[s]||(u.a.warning({content:`Please fill out ${s}`,style:{marginTop:"4vh"},duration:6}),t++);return!(t>0)}function Zs(){let e=Object(m.g)();const[t,s]=Object(d.a)(["userCookie"]),[i]=Object($.useLazyQuery)(ae,{onCompleted:t=>{null===t.user.id?u.a.error({content:"Wrong Password. Please try again.",style:{marginTop:"5vh"}},10):(s("userCookie",t.user,{path:"/",sameSite:"lax",secure:!0,expires:0}),u.a.success({content:"You successfully logged in.",style:{marginTop:"5vh"}},10),e.push("/account"))},onError:e=>{u.a.error({content:"No account found for this email. Please try again.",style:{marginTop:"5vh"}},10)}}),a=e=>{Xs(e)&&i({variables:{email:e.email,password:e.password}})};return void 0===t.userCookie?Object(y.jsx)("main",{className:"login",children:Object(y.jsxs)(Pt.a,{name:"normal_login",className:"login-form",onFinish:a,children:[Object(y.jsx)("h3",{style:{textAlign:"center"},children:Object(y.jsx)("b",{children:"User Login"})}),Object(y.jsx)("h3",{style:{textAlign:"center"},children:"Note: Password Recovery and Reset is not supported"}),Object(y.jsx)(Pt.a.Item,{name:"email",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Ks.a,{className:"site-form-item-icon"}),placeholder:"Email",type:"email"})}),Object(y.jsx)(Pt.a.Item,{name:"password",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Gs.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})}),Object(y.jsxs)(Pt.a.Item,{children:[Object(y.jsx)("span",{children:Object(y.jsx)(o.b,{to:"/register",children:"Register now!"})}),Object(y.jsx)(o.b,{to:"/forgot",className:"login-form-forgot",style:{float:"right"},children:"Forgot password!"})]}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Log in"})})]})}):Object(y.jsxs)("main",{className:"login",children:[Object(y.jsx)("div",{className:"logged-in",children:Object(y.jsx)("h1",{children:"You're already logged in."})}),Object(y.jsx)("div",{className:"redirect",children:Object(y.jsx)(o.b,{to:"/",children:"Redirect to Home"})})]})}var ei=s(286),ti=s.n(ei);function si(){let e=Object(m.g)();const[t]=Object(d.a)(["userCookie"]),[s,a]=Object(i.useState)(null),[n]=Object($.useMutation)(fe),[c]=Object($.useLazyQuery)(ee,{onCompleted:async t=>{t.user.email?u.a.warning("Email is already registered.",20):(await n({variables:{user:s}}),u.a.success({content:"Account has been successfully registered.",style:{marginTop:"5vh"}},10),e.push("/login"))}});return void 0===t.userCookie?Object(y.jsx)("main",{className:"register",children:Object(y.jsxs)(Pt.a,{name:"normal_register",className:"register-form",onFinish:async function(e){a({email:e.Email,password:e.Password,username:e.Username}),Xs(e)&&(e.Password===e.ConfirmPassword?c({variables:{email:e.Email}}):u.a.warning("Passwords do not match.",10))},children:[Object(y.jsx)("h3",{style:{textAlign:"center"},children:Object(y.jsx)("b",{children:"User Register"})}),Object(y.jsx)("h3",{style:{textAlign:"center"},children:"Note: Password Recovery and Reset is not supported"}),Object(y.jsx)(Pt.a.Item,{name:"Email",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Ks.a,{className:"site-form-item-icon"}),type:"email",placeholder:"Please input your email!"})}),Object(y.jsx)(Pt.a.Item,{name:"Username",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(ti.a,{className:"site-form-item-icon"}),placeholder:"Please input your Username"})}),Object(y.jsx)(Pt.a.Item,{name:"Password",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Gs.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Please input your Password!"})}),Object(y.jsx)(Pt.a.Item,{name:"ConfirmPassword",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Gs.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Please confirm your Password!"})}),Object(y.jsxs)(Pt.a.Item,{children:[Object(y.jsx)("span",{children:Object(y.jsx)(o.b,{to:"/login",children:"Login!"})}),Object(y.jsx)(o.b,{to:"/forgot",className:"login-form-forgot",style:{float:"right"},children:"Forgot password!"})]}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Sign Up"})})]})}):Object(y.jsxs)("main",{className:"login",children:[Object(y.jsx)("div",{className:"logged-in",children:Object(y.jsx)("h1",{children:"You're already logged in."})}),Object(y.jsx)("div",{className:"redirect",children:Object(y.jsx)(o.b,{to:"/",children:"Redirect to Home"})})]})}function ii(){const[e,t]=Object(i.useState)(null),[s,a]=Object(i.useState)(null),n=Object(m.g)(),[c]=Object($.useMutation)(Ie),[r]=Object($.useLazyQuery)(re,{onCompleted:async e=>{t(e)},fetchPolicy:"network-only"}),[l]=Object($.useLazyQuery)(G,{onCompleted:async e=>{null!==e.user.id?r({variables:{id:e.user.id}}):u.a.error({content:"No Account has been found with provided input",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"}),[d]=Object($.useLazyQuery)(se,{onCompleted:async e=>{null!==e.security_question.user_id?(c({variables:{user:{id:e.security_question.user_id,password:"password"}}}),u.a.success({content:'Your password has been reset. Use "password" to login. Go to account settings to change it to a new one.',style:{marginTop:"5vh"}},20),n.push("/login")):u.a.error({content:"Wrong Answer. Try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"});return Object(i.useEffect)((()=>{var t;null!==e&&null!==e.user&&a((t=e.security_questions.length,Math.floor(Math.random()*t)))}),[e]),null!==e&&null!==s?Object(y.jsx)("main",{className:"forgot",children:Object(y.jsxs)(Pt.a,{name:"forgot",className:"forgot-form",initialValues:{email:e.email},onFinish:t=>function(e,t,s){e({variables:{user_id:t.user_id,question:t.question,answer:s}})}(d,e.security_questions[s],t.answer),children:[Object(y.jsx)("h3",{style:{textAlign:"center"},children:Object(y.jsx)("b",{children:"Forgot Password"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsxs)("div",{children:["Security Question: ",e.security_questions[s].question]})}),Object(y.jsx)(Pt.a.Item,{name:"answer",children:Object(y.jsx)(We.a,{placeholder:"Please input your answer"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",className:"forgot-form-button",children:"Reset Password"})}),Object(y.jsxs)(Pt.a.Item,{children:[Object(y.jsx)("span",{children:Object(y.jsx)(o.b,{to:"/login",children:"Login!"})}),Object(y.jsx)(o.b,{to:"/register",style:{float:"right"},children:"Register!"})]})]})}):Object(y.jsx)("main",{className:"forgot",children:Object(y.jsxs)(Pt.a,{name:"forgot",className:"forgot-form",onFinish:e=>function(e,t){e({variables:{email:t}})}(l,e.email),children:[Object(y.jsx)("h3",{style:{textAlign:"center"},children:Object(y.jsx)("b",{children:"Forgot Password"})}),Object(y.jsx)(Pt.a.Item,{name:"email",children:Object(y.jsx)(We.a,{prefix:Object(y.jsx)(Ks.a,{className:"site-form-item-icon"}),type:"email",placeholder:"Please input your email!"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",className:"forgot-form-button",children:"Forgot Password"})}),Object(y.jsxs)(Pt.a.Item,{children:[Object(y.jsx)("span",{children:Object(y.jsx)(o.b,{to:"/login",children:"Login!"})}),Object(y.jsx)(o.b,{to:"/register",style:{float:"right"},children:"Register!"})]})]})})}var ai=s(194),ni=s.n(ai);const{TabPane:ci}=Mt.a,oi=({user:e})=>Object(y.jsxs)(f.a,{className:"personal_card",children:[Object(y.jsx)("div",{className:"css-header"}),Object(y.jsxs)("div",{children:[Object(y.jsx)(l.a,{shape:"square",size:80,style:{borderStyle:"solid 1px",backgroundColor:"pink"},src:"https://joeschmoe.io/api/v1/jon"}),Object(y.jsx)("p",{children:Object(y.jsxs)("strong",{children:["u/",e.username]})}),Object(y.jsx)(o.b,{to:"/accountsettings",children:"Settings"})]})]});function ri(){const[e]=Object(d.a)(["userCookie"]);let[t,s]=void 0!==e.userCookie?at(e.userCookie.id,V):null;return void 0===e.userCookie?Object(y.jsxs)("main",{className:"account",children:[Object(y.jsx)("h3",{children:"Account"}),Object(y.jsx)(ts,{})]}):tt(t)?Object(y.jsx)("main",{className:"account",children:Object(y.jsx)("section",{className:"container",children:Object(y.jsxs)("div",{className:"row",children:[Object(y.jsx)("h3",{className:"header-3",children:Object(y.jsx)("b",{children:"Account"})}),Object(y.jsxs)("div",{className:"posts-list",children:[Object(y.jsxs)("div",{className:"posts",children:[Object(y.jsx)("section",{className:"create-post-nav",children:Object(y.jsx)(Ze,{})}),Object(y.jsx)("section",{className:"post-list",children:Object(y.jsx)(f.a,{className:"card",children:0===t.communityuserrole.length?Object(y.jsx)(ni.a,{}):Object(y.jsx)(Mt.a,{type:"line",children:t.communityuserrole.map(((e,i)=>Object(y.jsx)(ci,{tab:e.community.title,children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"large",className:"account-community-post",pagination:{position:"bottom",pageSize:5},dataSource:t.communityuserrole[i].community.post,renderItem:e=>Object(y.jsx)(Be,{item:e,refetch:s})})},e.community_id)))})})})]}),Object(y.jsxs)("div",{className:"personal",children:[Object(y.jsx)(oi,{user:t.user}),Object(y.jsx)(f.a,{className:"personal-post-card",title:"List of your Posts",children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"small",className:"user-post",pagination:{position:"bottom",pageSize:10},dataSource:t.post,renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(o.b,{to:"/viewpost/"+e.id,children:e.title})},e.id)})}),Object(y.jsx)(f.a,{className:"personal-community-card",title:"List of your Communities",children:Object(y.jsx)(I.a,{itemLayout:"vertical",size:"small",className:"about-community",dataSource:t.communityuserrole,pagination:{position:"bottom",pageSize:10},renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(o.b,{to:{pathname:"/community/"+e.community.id},children:e.community.title})},e.community.id)})})]})]})]})})}):Object(y.jsxs)("main",{className:"account",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Account"})}),Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})]})}const{confirm:li}=ot.a;function mi(e,t,s,i){li({title:"Update Security Question",icon:null,width:"700px",closable:!0,okButtonProps:{style:{display:"none"}},cancelButtonProps:{style:{display:"none"}},content:Object(y.jsxs)(Pt.a,{name:"update-question",style:{marginTop:"20px"},labelCol:{span:6},wrapperCol:{span:14},onFinish:t=>function(e,t,s,i){Xs(s)&&(i({user_id:t,question:s.question,answer:s.answer}),e({variables:{id:t,password:s.password}}))}(e,s,t,i),initialValues:{question:t},children:[Object(y.jsx)(Pt.a.Item,{label:"Question",name:"question",children:Object(y.jsx)(We.a,{type:"text",placeholder:"Enter security question",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"Answer",name:"answer",children:Object(y.jsx)(We.a,{type:"text",placeholder:"Enter answer to security question",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"Password",name:"password",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter Password to verify identity",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:6,span:14},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})})}function di(e,t,s,i){li({title:"Remove Security Question: "+t,icon:null,width:"700px",closable:!0,okButtonProps:{style:{display:"none"}},cancelButtonProps:{style:{display:"none"}},content:Object(y.jsxs)(Pt.a,{name:"remove-question",style:{marginTop:"20px"},labelCol:{span:6},wrapperCol:{span:14},onFinish:a=>function(e,t,s,i,a){Xs(i)&&(a({user_id:t,question:s}),e({variables:{id:t,password:i.password}}))}(e,s,t,a,i),children:[Object(y.jsx)(Pt.a.Item,{label:"Password",name:"password",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter Password to verify identity",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:6,span:14},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})})}const{TabPane:ji}=Mt.a;function ui(){const[e,t]=Object(d.a)(["userCookie"]),[s,a]=Object(i.useState)(null),[n]=Pt.a.useForm(),[c]=Pt.a.useForm(),[o]=Pt.a.useForm(),[r]=Object($.useMutation)(Ce),[l]=Object($.useMutation)(Ie),[m]=Object($.useMutation)(De),[j]=Object($.useMutation)(Te),[b]=Object($.useMutation)(Ue),[h,p]=void 0!==e.userCookie?at(e.userCookie.id,re):null,[x]=Object($.useLazyQuery)(J,{onCompleted:async e=>{tt(e)?t("userCookie",e.user,{path:"/",sameSite:"lax",secure:!0,expires:0}):u.a.warning({content:"An error has occurred",style:{marginTop:"5vh"}},10)},fetchPolicy:"network-only"}),[O]=Object($.useLazyQuery)(ie,{onCompleted:async t=>{null!==t.passwordCheck.id?null===t.emailCheck.id||t.emailCheck.email===e.userCookie.email?(await r({variables:{user:s}}),await x({variables:{id:e.userCookie.id}}),n.setFieldsValue({password:""}),u.a.success({content:"Account detail has been updated",style:{marginTop:"5vh"}},6)):u.a.warning({content:"Email is already in use. Try another email address.",style:{marginTop:"5vh"}},6):u.a.warning({content:"Password is incorrect, try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"}),[g]=Object($.useLazyQuery)(te,{onCompleted:async e=>{null!==e.user.id?(await l({variables:{user:s}}),c.resetFields(),u.a.success({content:"Your password has been updated",style:{marginTop:"5vh"}},6)):u.a.warning({content:"Password is incorrect, try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"}),[_]=Object($.useLazyQuery)(te,{onCompleted:async e=>{null!==e.user.id?(await m({variables:{securityQuestion:s}}),p(),o.resetFields(),u.a.success({content:"You have successfully created a security question",style:{marginTop:"5vh"}},6)):u.a.warning({content:"Password is incorrect, try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"}),[v]=Object($.useLazyQuery)(te,{onCompleted:async e=>{null!==e.user.id?(await j({variables:{securityQuestion:s}}),p(),u.a.success({content:"You have successfully updated a security question",style:{marginTop:"5vh"}},6)):u.a.warning({content:"Password is incorrect, try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"}),[w]=Object($.useLazyQuery)(te,{onCompleted:async e=>{null!==e.user.id?(await b({variables:{securityQuestion:s}}),p(),u.a.success({content:"You have successfully removed a security question",style:{marginTop:"5vh"}},6)):u.a.warning({content:"Password is incorrect, try again",style:{marginTop:"5vh"}},6)},fetchPolicy:"network-only"});return void 0===e.userCookie?Object(y.jsxs)("main",{className:"accountsettings",children:[Object(y.jsx)("h3",{className:"header-3",children:Object(y.jsx)("b",{children:"Account Settings"})}),Object(y.jsx)(ts,{})]}):Object(y.jsx)("main",{className:"accountsettings",children:Object(y.jsx)("section",{className:"container",children:Object(y.jsxs)("div",{className:"row",children:[Object(y.jsx)("h3",{className:"header-3",children:Object(y.jsx)("b",{children:"Account Settings"})}),Object(y.jsxs)(Mt.a,{type:"card",children:[Object(y.jsx)(ji,{tab:"Change Account Information",children:Object(y.jsxs)(Pt.a,{name:"edit-info",labelCol:{span:8},wrapperCol:{span:8},initialValues:{username:e.userCookie.username,email:e.userCookie.email},form:n,onFinish:t=>function(e,t,s,i){Xs(s)&&(i({id:t,email:s.email,username:s.username}),e({variables:{id:t,email:s.email,password:s.password}}))}(O,e.userCookie.id,t,a),children:[Object(y.jsx)(Pt.a.Item,{label:"Username",name:"username",children:Object(y.jsx)(We.a,{placeholder:"Enter username you wish to change to."})}),Object(y.jsx)(Pt.a.Item,{label:"Email",name:"email",children:Object(y.jsx)(We.a,{type:"email",placeholder:"Enter email address you wish to change to."})}),Object(y.jsx)(Pt.a.Item,{label:"Password",name:"password",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter password to verify identity",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:8,span:8},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})},"1"),Object(y.jsx)(ji,{tab:"Change Password",children:Object(y.jsxs)(Pt.a,{name:"edit-password",labelCol:{span:8},wrapperCol:{span:8},form:c,onFinish:t=>function(e,t,s,i){Xs(s)&&(s.NewPassword===s.ConfirmPassword?(i({id:t,password:s.NewPassword}),e({variables:{id:t,password:s.Password}})):u.a.warning({content:"New passwords don't match",style:{marginTop:"5vh"}},10))}(g,e.userCookie.id,t,a),children:[Object(y.jsx)(Pt.a.Item,{label:"Password",name:"Password",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter Password to verify identity",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"New Password",name:"NewPassword",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter New Password",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"New Password",name:"ConfirmPassword",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Re-enter New Password",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:8,span:8},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})},"2"),Object(y.jsx)(ji,{tab:"Security Questions",children:Object(y.jsxs)("div",{className:"question-display-form",children:[Object(y.jsx)(I.a,{className:"question-display",header:Object(y.jsxs)("strong",{children:["Security questions for ",e.userCookie.username]}),bordered:!0,dataSource:h.security_questions,renderItem:t=>Object(y.jsx)(I.a.Item,{className:"list-items",children:Object(y.jsxs)("div",{className:"question-actions",children:[Object(y.jsx)("div",{className:"question",children:t.question}),Object(y.jsxs)("div",{className:"actions",children:[Object(y.jsx)(lt.a,{onClick:()=>mi(v,t.question,e.userCookie.id,a)}),Object(y.jsx)(Et.a,{onClick:()=>di(w,t.question,e.userCookie.id,a)})]})]})})}),Object(y.jsxs)(Pt.a,{className:"question-form",labelCol:{span:8},wrapperCol:{span:18},form:o,onFinish:t=>function(e,t,s,i){Xs(s)&&(i({user_id:t,question:s.question,answer:s.answer}),e({variables:{id:t,password:s.password}}))}(_,e.userCookie.id,t,a),children:[Object(y.jsx)(Pt.a.Item,{label:"Security Question",name:"question",children:Object(y.jsx)(We.a,{type:"text",placeholder:"Enter Security Question",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"Security Answer",name:"answer",children:Object(y.jsx)(We.a,{type:"text",placeholder:"Enter Security Answer",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{label:"Password",name:"password",children:Object(y.jsx)(We.a,{type:"password",placeholder:"Enter Password to verify identity",autoComplete:"new-password"})}),Object(y.jsx)(Pt.a.Item,{wrapperCol:{offset:8,span:8},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})]})},"3")]})]})})})}var bi=s(204),hi=s.n(bi),pi=s(176),xi=s.n(pi),Oi=s(287),yi=s.n(Oi),gi=s(196),_i=s.n(gi);const{confirm:vi}=ot.a,{Text:wi,Title:fi}=Y.a,{Panel:Ci}=xi.a;function Ii(e,t,s){vi({title:"Response to "+e.subject_line,icon:null,content:Object(y.jsxs)(Pt.a,{onFinish:i=>(async(e,t,s,i)=>{await s({variables:{message:{sender_id:t.recipient_id,recipient_id:t.sender_id,subject_line:"RE: "+t.subject_line,message:e.response}}}),i(),ot.a.destroyAll(),u.a.success({content:"Reply has been has been sent.",style:{marginTop:"5vh"}},10)})(i,e,t,s),children:[Object(y.jsx)(Pt.a.Item,{name:"response",children:Object(y.jsx)(We.a,{placeholder:"Input your response here..."})}),Object(y.jsx)(Pt.a.Item,{style:{float:"right"},children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]}),okButtonProps:{style:{display:"none"}},cancelButtonProps:{style:{display:"none"}},closable:!0,maskClosable:!0})}async function Ni(e,t,s,i,a){t?1===e.recipient_delete?await s({variables:{message:{id:e.id}}}):await i({variables:{message:{id:e.id,sender_delete:1,recipient_delete:0}}}):1===e.sender_delete?await s({variables:{message:{id:e.id}}}):await i({variables:{message:{id:e.id,sender_delete:0,recipient_delete:1}}}),a(),u.a.success({content:"Message has been deleted.",style:{marginTop:"5vh"}},10)}const ki=({recipientFilter:e,setRecipientFilter:t,messageQuery:s,deleteMessage:i,deleteMessageSender_Recipient:a,sendMessage:n,messageRefetch:c})=>Object(y.jsxs)("div",{className:"sentFromMessage",children:[Object(y.jsx)(fi,{level:4,type:"secondary",children:"Sent From"}),Object(y.jsx)(x.a.Button,{overlay:Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{onClick:()=>t(""),children:"All Users"},0),[...new Set(s.message.map((e=>e.sender)))].map((e=>Object(y.jsx)(h.a.Item,{onClick:()=>t(e.username),children:e.username},e.id)))]}),children:0===e.length?"User Filter - Non Selected":"All messages from "+e}),Object(y.jsx)(xi.a,{className:"collapse",children:s.message.map((t=>{if(""===e||t.sender.username===e)return Object(y.jsx)(Ci,{className:"panel",header:Object(y.jsxs)("span",{className:"header_span",children:[Object(y.jsxs)("span",{className:"subject",style:{float:"left"},children:["Subject: ",Object(y.jsx)("strong",{children:t.subject_line})]}),Object(y.jsxs)("span",{className:"date",style:{float:"right"},children:[" Sent by "," ",Object(y.jsx)(wi,{type:"secondary",children:t.sender.username})," "," ",Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),children:Qe()(Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})]})]}),className:"panel",children:Object(y.jsx)(f.a,{bordered:!1,actions:[Object(y.jsx)(hi.a,{title:"Are you sure you want to delete this message?",onConfirm:()=>Ni(t,0,i,a,c),icon:null,okText:"Yes",cancelText:"No",children:Object(y.jsx)(Et.a,{})}),Object(y.jsx)(S.a,{onClick:()=>Ii(t,n,c)})],children:t.message})},t.id)}))})]}),Mi=({senderFilter:e,setSenderFilter:t,messageQuery:s,deleteMessage:i,deleteMessageSender_Recipient:a,messageRefetch:n})=>Object(y.jsxs)("div",{className:"sentToMessage",children:[Object(y.jsx)(fi,{level:4,type:"secondary",children:"Sent To"}),Object(y.jsx)(x.a.Button,{overlay:Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{onClick:()=>t(""),children:"All Users"},0),[...new Set(s.sentMessage.map((e=>e.recipient)))].map((e=>Object(y.jsx)(h.a.Item,{onClick:()=>t(e.username),children:e.username},e.id)))]}),children:0===e.length?"User Filter - Non Selected":"All messages sent to "+e}),Object(y.jsx)(xi.a,{className:"collapse",children:s.sentMessage.map((t=>{if(""===e||t.recipient.username===e)return Object(y.jsx)(Ci,{className:"panel",header:Object(y.jsxs)("span",{className:"header_span",children:[Object(y.jsxs)("span",{className:"subject",style:{float:"left"},children:["Subject: ",Object(y.jsx)("strong",{children:t.subject_line})]}),Object(y.jsxs)("span",{className:"date",style:{float:"right"},children:[` Sent to ${t.recipient.username} `,Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),children:Qe()(Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})]})]}),className:"panel",children:Object(y.jsx)(f.a,{bordered:!1,actions:[Object(y.jsx)(hi.a,{title:"Are you sure you want to delete this message?",onConfirm:()=>Ni(t,1,i,a,n),icon:null,okText:"Yes",cancelText:"No",children:Object(y.jsx)(Et.a,{})})],children:t.message})},t.id)}))})]}),Yi=({selectedUser:e,setSelectedUser:t,search:s,setSearch:i,getAllUserQuery:a,sendMessage:n,messageRefetch:c,cookies:o,form:r})=>Object(y.jsxs)(Pt.a,{className:"sendMessage",name:"basic",onFinish:s=>((e,t,s,i,a,n,c)=>{s.forEach((async s=>await a({variables:{message:{sender_id:t.userCookie.id,recipient_id:s.id,subject_line:e.subject_line,message:e.message}}}))),c.resetFields(),i([]),n(),u.a.success({content:"Message has been sent.",style:{marginTop:"5vh"}},10)})(s,o,e,t,n,c,r),layout:"vertical",form:r,children:[Object(y.jsxs)(Pt.a.Item,{label:"Recipient",className:"recipient",children:[Object(y.jsx)("span",{className:"tag-span",children:e.map((s=>Object(y.jsx)(yi.a,{closable:!0,onClose:()=>t(e.filter((e=>e.id!==s.id))),children:s.username},s.id)))}),Object(y.jsx)(_i.a,{overlay:Object(y.jsxs)(h.a,{children:[Object(y.jsx)(h.a.Item,{children:Object(y.jsx)(We.a,{placeholder:"Search User(s)",onClick:e=>e.stopPropagation(),onChange:e=>{i(e.target.value)}})}),a.user.map((i=>{if(i.username.toLowerCase().includes(s.toLowerCase())&&!e.find((e=>e.id===i.id))&&i.id!==o.userCookie.id)return Object(y.jsx)(h.a.Item,{onClick:()=>t([...e,{id:i.id,username:i.username}]),children:i.username},i.id)}))]}),children:"Select user(s) to send a message"})]}),Object(y.jsx)(Pt.a.Item,{label:"Subject Line",name:"subject_line",children:Object(y.jsx)(We.a,{placeholder:"Subject Line"})}),Object(y.jsx)(Pt.a.Item,{label:"Message",name:"message",className:"message",children:Object(y.jsx)(We.a.TextArea,{placeholder:"Message",className:"textArea"})}),Object(y.jsx)(Pt.a.Item,{children:Object(y.jsx)($t.a,{type:"primary",htmlType:"submit",children:"Submit"})})]}),{TabPane:Pi}=Mt.a;function Si(){const[e]=Object(d.a)(["userCookie"]);let[t,s]=void 0!==e.userCookie?at(e.userCookie.id,ne):[null,null],a=it(X);const[n,c]=Object(i.useState)([]),[o,r]=Object(i.useState)(""),[l,m]=Object(i.useState)(""),[j,u]=Object(i.useState)(""),[b]=Object($.useMutation)(Ne),[h]=Object($.useMutation)(ke),[p]=Object($.useMutation)(Me),[x]=Pt.a.useForm();return void 0===e.userCookie?Object(y.jsxs)("main",{className:"inbox",children:[Object(y.jsx)("h3",{children:"Inbox"}),Object(y.jsx)(ts,{})]}):tt(t)&&tt(a)?Object(y.jsxs)("main",{className:"inbox",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Inbox"})}),Object(y.jsx)("div",{className:"flex-container",children:Object(y.jsx)("div",{className:"flex-child",children:Object(y.jsx)(f.a,{bordered:!1,children:Object(y.jsxs)(Mt.a,{type:"card",children:[Object(y.jsx)(Pi,{tab:"Messages",children:Object(y.jsxs)("div",{className:"sentToandFrom",children:[Object(y.jsx)(ki,{recipientFilter:l,setRecipientFilter:m,messageQuery:t,deleteMessage:h,deleteMessageSender_Recipient:p,sendMessage:b,messageRefetch:s}),Object(y.jsx)(Mi,{senderFilter:j,setSenderFilter:u,messageQuery:t,deleteMessage:h,deleteMessageSender_Recipient:p,messageRefetch:s})]})},"1"),Object(y.jsx)(Pi,{tab:"Send Message",children:Object(y.jsx)(Yi,{selectedUser:n,setSelectedUser:c,search:o,setSearch:r,getAllUserQuery:a,sendMessage:b,messageRefetch:s,cookies:e,form:x})},"2")]})})})})]}):Object(y.jsxs)("main",{className:"inbox",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"Inbox"})}),Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})]})}const{Text:$i}=Y.a,Di=({item:e,user:t})=>Object(y.jsxs)("div",{children:[Object(y.jsx)(o.b,{to:"/community/"+e.community.id,children:e.community.title}),Object(y.jsx)($i,{type:"secondary",children:" Posted by "+t.username+" "}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:Object(y.jsx)("b",{children:e.title})})]}),Ti=({id:e,item:t})=>t.map((t=>{if(t.author_id===e)return null!==t.parent.id&&t.author_id!==t.parent.author_id?Object(y.jsx)(f.a,{type:"inner",className:"commentincard",children:Object(y.jsx)(Rs.a,{author:t.parent.user.username,content:t.parent.comment,datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(t.parent.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(t.parent.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),children:Object(y.jsx)(Rs.a,{author:t.user.username,content:t.comment,style:{backgroundColor:"rgba(0, 121, 211, 0.05)",fill:"rgb(135, 138, 140)"},datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})})},t.parent.id)},"child"+t.parent.id):Object(y.jsx)(f.a,{type:"inner",className:"commentincard",children:Object(y.jsx)(Rs.a,{author:t.user.username,content:t.comment,style:{backgroundColor:"rgba(0, 121, 211, 0.05)",fill:"rgb(135, 138, 140)"},datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(t.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})})},"child"+t.id)})),Ui=({id:e,item:t,user:s})=>{switch(t.type){case"Post":return Object(y.jsxs)("div",{className:"content",children:[Object(y.jsx)(f.a,{type:"inner",className:"card",title:Object(y.jsx)(Di,{item:t,user:s}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+t.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("p",{style:{whiteSpace:"pre-line"},children:t.text})},t.id),Object(y.jsx)(Ti,{id:e,item:t.comment})]});case"Link":return Object(y.jsxs)("div",{className:"content",children:[Object(y.jsx)(f.a,{className:"card",type:"inner",title:Object(y.jsx)(Di,{item:t,user:s}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+t.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("a",{style:{wordWrap:"break-word"},href:`http://${t.text}`,children:t.text})},t.id),Object(y.jsx)(Ti,{id:e,item:t.comment})]});case"Image":return Object(y.jsxs)("div",{className:"content",children:[Object(y.jsx)(f.a,{className:"card",type:"inner",title:Object(y.jsx)(Di,{item:t,user:s}),actions:[Object(y.jsx)(o.b,{to:{pathname:"/viewpost/"+t.id},children:Object(y.jsx)(S.a,{},"message")})],children:Object(y.jsx)("img",{alt:"",src:t.image,style:{maxWidth:"100%"}})},t.id),Object(y.jsx)(Ti,{id:e,item:t.comment})]})}},Ai=({item:e,user:t})=>Object(y.jsxs)("div",{children:[Object(y.jsxs)("span",{children:[t.username," commented on ",e.post.title]}),Object(y.jsx)("br",{}),Object(y.jsxs)("span",{children:[Object(y.jsx)(o.b,{to:"/community/"+e.post.community_id,className:"community_link",children:e.post.community.title+" "}),Object(y.jsxs)($i,{type:"secondary",children:["Posted by ",e.post.user.username]})]})]}),Li=({item:e,user:t})=>Object(y.jsxs)(f.a,{className:"comment_tree_card",children:[Object(y.jsx)(Ai,{item:e,user:t}),Object(y.jsx)(Rs.a,{actions:[Object(y.jsx)("span",{children:"Reply to"},"comment-nested-reply-to")],author:Object(y.jsx)("a",{children:t.username}),content:Object(y.jsx)("p",{children:e.comment})})]}),qi=({id:e,isPost:t,item:s,user:i})=>t?Object(y.jsx)(Ui,{id:e,item:s,user:i}):Object(y.jsx)(Li,{item:s,user:i});var Ri=({id:e,posts:t,comments:s,user:i})=>{let a=s.filter((e=>!t.map((e=>e.id)).includes(e.post_id)));const n=t.concat(a).sort((function(e,t){var s=e.created_at,i=t.created_at;return s>i?-1:s<i?1:0}));return Object(y.jsx)(I.a,{className:"overview-list",dataSource:n,renderItem:t=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(qi,{id:e,isPost:!!t.title,item:t,user:i})})})},Ei=s(177),Qi=s.n(Ei),Fi=s(205),zi=s.n(Fi),Bi=s(121),Hi=s.n(Bi),Vi=s(288),Wi=s.n(Vi);const Ki=({item:e})=>{switch(e.type){case"Post":return Object(y.jsx)(l.a,{shape:"square",size:64,icon:Object(y.jsx)(ys.a,{})});case"Link":return Object(y.jsx)(l.a,{shape:"square",size:64,icon:Object(y.jsx)(Xe.a,{})});case"Image":return Object(y.jsx)(l.a,{shape:"square",size:64,icon:Object(y.jsx)("img",{alt:"",src:e.image,style:{maxWidth:"100%"}})})}},Ji=({item:e,expand:t,setExpand:s})=>{switch(e.type){case"Post":return Object(y.jsxs)("div",{className:"description-expand",children:[Object(y.jsxs)("span",{children:[Object(y.jsx)(zi.a,{className:"expand-icon",onClick:()=>s(!t)}),Object(y.jsx)(o.b,{to:"/viewpost/"+e.id,children:Object(y.jsxs)(Qi.a,{count:e.comment.length,size:"small",overflowCount:99,children:[Object(y.jsx)(Hi.a,{className:"comment-icon"})," "]})})]}),Object(y.jsx)("p",{className:"post",style:{display:t?"block":"none"},children:e.text})]});case"Image":return Object(y.jsxs)("div",{className:"description-expand",children:[Object(y.jsxs)("span",{children:[Object(y.jsx)(zi.a,{className:"expand-icon",onClick:()=>s(!t)}),Object(y.jsx)(o.b,{to:"/viewpost/"+e.id,children:Object(y.jsxs)(Qi.a,{count:e.comment.length,size:"small",overflowCount:99,children:[Object(y.jsx)(Hi.a,{className:"comment-icon"})," "]})})]}),Object(y.jsx)("img",{className:"image",alt:"",src:e.image,style:{display:t?"block":"none"}})]});case"Link":return Object(y.jsx)("div",{className:"description-expand",children:Object(y.jsxs)("span",{children:[Object(y.jsx)("a",{className:"external-link",href:`http://${e.text}`,target:"_blank",children:Object(y.jsx)(Wi.a,{})}),Object(y.jsx)(o.b,{to:"/viewpost/"+e.id,children:Object(y.jsxs)(Qi.a,{count:e.comment.length,size:"small",overflowCount:99,children:[Object(y.jsx)(Hi.a,{className:"comment-icon"})," "]})})]})});default:return Object(y.jsx)("p",{children:"Error"})}},Gi=({item:e,user:t})=>{const[s,a]=Object(i.useState)(!1);return Object(y.jsxs)("div",{className:"description_list",children:[Object(y.jsxs)("span",{children:[Object(y.jsx)(o.b,{to:"/community/"+e.community.id,children:"c/"+e.community.title})," "," Posted by "+t.username]}),Object(y.jsx)("br",{}),Object(y.jsx)(Ji,{item:e,expand:s,setExpand:a})]})};var Xi=({item:e,user:t})=>Object(y.jsx)(I.a,{itemLayout:"horizontal",dataSource:e,pagination:{pageSize:10,position:"bottom",hideOnSinglePage:!0},renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(I.a.Item.Meta,{avatar:Object(y.jsx)(Ki,{item:e}),title:Object(y.jsx)(o.b,{to:"/viewpost/"+e.id,children:Object(y.jsx)("b",{children:e.title})}),description:Object(y.jsx)(Gi,{item:e,user:t})})})});const{Text:Zi}=Y.a,ea=({item:e,user:t,id:s})=>Object(y.jsxs)("div",{children:[Object(y.jsxs)("span",{children:[Object(y.jsx)(Hi.a,{style:{paddingRight:"4px"}}),t.username," commented on ",Object(y.jsx)(o.b,{to:"/viewpost/"+e.post.id,children:e.post.title})]}),Object(y.jsx)("br",{}),Object(y.jsxs)("span",{children:[Object(y.jsx)(o.b,{to:"/community/"+e.post.community_id,className:"community_link",children:"c/"+e.post.community.title+" "}),Object(y.jsxs)(Zi,{type:"secondary",children:["Posted by ",e.post.user.id!==s?Object(y.jsxs)(o.b,{to:"/user/"+e.post.user.id,children:[e.post.user.username+" "," "]}):e.post.user.username+" "]}),Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})]})]}),ta=({item:e,user:t,id:s})=>null!==e.parent_comment_id?Object(y.jsx)(f.a,{className:"list-content",title:Object(y.jsx)(ea,{item:e,user:t,id:s}),children:Object(y.jsx)(Rs.a,{author:e.parent.user.username,content:e.parent.comment,datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.parent.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.parent.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()}),children:Object(y.jsx)(Rs.a,{author:e.user.username,content:e.comment,style:{backgroundColor:"rgba(0, 121, 211, 0.05)",fill:"rgb(135, 138, 140)"},datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})})},e.parent.id)}):Object(y.jsx)(f.a,{className:"list-content",title:Object(y.jsx)(ea,{item:e,user:t,id:s}),children:Object(y.jsx)(Rs.a,{author:e.user.username,content:e.comment,style:{backgroundColor:"rgba(0, 121, 211, 0.05)",fill:"rgb(135, 138, 140)"},datetime:Object(y.jsx)(k.a,{placement:"top",title:Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm:ss a"),children:Qe()(Qe()(parseInt(e.created_at)).format("MMMM Do YYYY, h:mm a"),"MMMM Do YYYY, h:mm:ss a").fromNow()})})});var sa=({item:e,user:t,id:s})=>Object(y.jsx)(I.a,{itemLayout:"horizontal",dataSource:e,pagination:{pageSize:10,position:"bottom",hideOnSinglePage:!0},renderItem:e=>Object(y.jsx)(I.a.Item,{children:Object(y.jsx)(ta,{item:e,user:t,id:s})})});const{TabPane:ia}=Mt.a,aa=({user:e})=>Object(y.jsxs)(f.a,{className:"personal_card",children:[Object(y.jsx)("div",{className:"css-header"}),Object(y.jsxs)("div",{children:[Object(y.jsx)(l.a,{shape:"square",size:80,style:{borderStyle:"solid 1px",backgroundColor:"pink"},src:"https://joeschmoe.io/api/v1/jon"}),Object(y.jsx)("p",{children:Object(y.jsxs)("strong",{children:["u/",e.username]})})]})]});function na(){let{id:e}=Object(m.i)(),t=st(e,Z);return tt(t)?Object(y.jsxs)("main",{className:"viewAccount",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"View Account"})}),Object(y.jsxs)(Mt.a,{defaultActiveKey:"1",children:[Object(y.jsx)(ia,{className:"overview_tabpane",tab:"Overview",children:Object(y.jsxs)("div",{className:"post_comment_personal",children:[Object(y.jsx)("div",{className:"post_comment",children:Object(y.jsx)(Ri,{id:parseInt(e),posts:t.post,comments:t.comment,user:t.user})}),Object(y.jsxs)("div",{className:"personal",children:[Object(y.jsx)(aa,{user:t.user}),Object(y.jsx)(et,{})]})]})},"1"),Object(y.jsx)(ia,{className:"posts_tabpane",tab:"Posts",children:Object(y.jsxs)("div",{className:"posts_personal",children:[Object(y.jsx)("div",{className:"posts",children:Object(y.jsx)(Xi,{item:t.post,user:t.user})}),Object(y.jsxs)("div",{className:"personal",children:[Object(y.jsx)(aa,{user:t.user}),Object(y.jsx)(et,{})]})]})},"2"),Object(y.jsx)(ia,{className:"comments_tabpane",tab:"Comments",children:Object(y.jsxs)("div",{className:"comments_personal",children:[Object(y.jsx)("div",{className:"comments",children:Object(y.jsx)(sa,{item:t.comment,user:t.user,id:parseInt(e)})}),Object(y.jsxs)("div",{className:"personal",children:[Object(y.jsx)(aa,{user:t.user}),Object(y.jsx)(et,{})]})]})},"3")]})]}):Object(y.jsxs)("main",{className:"viewAccount",children:[Object(y.jsx)("h3",{children:Object(y.jsx)("b",{children:"View Account"})}),Object(y.jsx)("p",{style:{textAlign:"center",paddingTop:"80px"},children:"Loading..."})]})}function ca(){let e=Object(m.g)();return Object(y.jsxs)("main",{className:"error",children:[Object(y.jsx)("h3",{className:"header",children:Object(y.jsx)("b",{children:"Error Page"})}),Object(y.jsx)("br",{}),Object(y.jsx)("p",{className:"text",children:Object(y.jsx)("b",{children:"Something Went Wrong"})}),Object(y.jsx)("br",{}),Object(y.jsx)("div",{className:"anchor",children:Object(y.jsx)("a",{onClick:()=>{e.goBack()},children:"Go back a page"})})]})}function oa(){let e=Object(m.g)();return Object(y.jsxs)("main",{className:"unauthorized",children:[Object(y.jsx)("h3",{className:"header",children:Object(y.jsx)("b",{children:"Unauthorized Access"})}),Object(y.jsx)("br",{}),Object(y.jsx)("p",{className:"text",children:Object(y.jsx)("b",{children:"The page you tried to access is inaccessible due to account privileges"})}),Object(y.jsx)("br",{}),Object(y.jsx)("div",{className:"anchor",children:Object(y.jsx)("a",{onClick:()=>{e.goBack()},children:"Go back a page"})})]})}function ra(){return Object(y.jsxs)(m.d,{children:[Object(y.jsx)(m.b,{path:"/createcommunity",component:es}),Object(y.jsx)(m.b,{path:"/createpost",component:ws}),Object(y.jsx)(m.b,{path:"/community/:id",component:vt}),Object(y.jsx)(m.b,{path:"/communities",component:Nt}),Object(y.jsx)(m.b,{path:"/editcommunity/:id",component:Xt}),Object(y.jsx)(m.b,{path:"/viewpost/:id",component:Vs}),Object(y.jsx)(m.b,{path:"/login",component:Zs}),Object(y.jsx)(m.b,{path:"/register",component:si}),Object(y.jsx)(m.b,{path:"/forgot",component:ii}),Object(y.jsx)(m.b,{path:"/account",component:ri}),Object(y.jsx)(m.b,{path:"/accountsettings",component:ui}),Object(y.jsx)(m.b,{path:"/inbox",component:Si}),Object(y.jsx)(m.b,{path:"/user/:id",component:na}),Object(y.jsx)(m.b,{path:"/unauthorized",component:oa}),Object(y.jsx)(m.b,{exact:!0,path:"/",component:nt}),Object(y.jsx)(m.b,{component:ca})]})}var la=function(){return Object(y.jsx)(o.a,{children:Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)(v.a,{children:[Object(y.jsx)(_,{}),Object(y.jsx)(ra,{})]})})})};s(568),s(569);var ma=e=>{e&&e instanceof Function&&s.e(3).then(s.bind(null,585)).then((({getCLS:t,getFID:s,getFCP:i,getLCP:a,getTTFB:n})=>{t(e),s(e),i(e),a(e),n(e)}))},da=s(289),ja=s(292),ua=s(293);s(570);const ba=new ja.a,ha=new ua.a({uri:"http://localhost:4000/graphql"}),pa=new da.a({cache:ba,link:ha});c.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)($.ApolloProvider,{client:pa,children:Object(y.jsx)(la,{})})}),document.getElementById("root")),ma()}},[[571,1,2]]]);
//# sourceMappingURL=main.6ef277f7.chunk.js.map