import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import About from '../components/commons/community-post/community-post_about'
import CreatePostNav from '../components/commons/navigation/create-post-nav'
import CommunityPost_Post from '../components/commons/community-post/community-post_post'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID_Refetch } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITY_POSTS_USER, CREATE_USER_COMMUNITY_USER_ROLE, REMOVE_USER_COMMUNITY_USER_ROLE } from '../queries/posts'
import { JoinCommunity, LeaveCommunity } from '../components/commons/community-post/functions/community-post_join_leave_community'

import { useCookies } from 'react-cookie'

//Forum Posts and Community Components for Community Page
export default function CommunityPost() {
    let { id } = useParams()
    let [query, queryRefetch] = GetGraphqlQueryID_Refetch(id, GET_COMMUNITY_POSTS_USER)
    const [createUser_CommunityUserRole] = useMutation(CREATE_USER_COMMUNITY_USER_ROLE)
    const [removeUser_CommunityUserRole] = useMutation(REMOVE_USER_COMMUNITY_USER_ROLE)
    const [cookies] = useCookies(['userCookie'])

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="communitypost">
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="communitypost">
            <section className="container">
                <div className="row">
                    <h3 className="page-title"><b>{query.community.title}</b></h3>
                    <div className="masonry-card-grid">
                        <div className="nested-section">
                            <section className="create-post-nav">
                                <CreatePostNav />
                            </section>
                            <section className="post-card">
                                <CommunityPost_Post query={query} refetch={queryRefetch}/>
                            </section>
                        </div>
                        <div className="about-card">
                            <About
                                query={query.community}
                                pageID={id}
                                userID={(cookies.userCookie !== undefined) ? cookies.userCookie.id : null}
                                JoinCommunity={JoinCommunity}
                                joinMutation={createUser_CommunityUserRole}
                                LeaveCommunity={LeaveCommunity}
                                leaveMutation={removeUser_CommunityUserRole}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
//Resources
//https://stackoverflow.com/questions/40752287/use-moment-js-to-convert-unix-epoch-time-to-human-readable-time/40752362