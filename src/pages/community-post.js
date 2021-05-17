import React from 'react'
import { useParams } from 'react-router-dom';
import About from '../components/commons/community-post/community-post_about'
import CreatePostNav from '../components/commons/navigation/create-post-nav'
import PostCommunityPost from '../components/commons/community-post/community-post_post'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITY_POSTS_USER_CATEGORY_QUERY } from '../queries/posts'

function pageTitle (query){
    if(query == "loading") {
        return(
            <h3 className="page-title"><b>Loading</b></h3>
        )
    } else {
        return(
            <h3 className="page-title"><b>{query.community.title}</b></h3>
        )
    }
}

//Forum Posts and Community Components for Community Page
export default function CommunityPost() {
    let { id } = useParams()
    let query = GetGraphqlQueryID(id, GET_COMMUNITY_POSTS_USER_CATEGORY_QUERY)
    return (
        <main className="communitypost">
            <section className="container">
                <div className="row">
                    {pageTitle(query)}
                    <div className="masonry-card-grid">
                        <div className="nested-section">
                            <section className="create-post-nav">
                                <CreatePostNav />
                            </section>
                            <section className="post-card">
                                <PostCommunityPost data={query.community}/>
                            </section>
                        </div>
                        <div className="about-card">
                            <About data={query.community}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
//https://www.youtube.com/watch?v=1SpgeTyADzY&list=RDCLAK5uy_k5n4srrEB1wgvIjPNTXS9G1ufE9WQxhnA&index=1
//https://stackoverflow.com/questions/40752287/use-moment-js-to-convert-unix-epoch-time-to-human-readable-time/40752362
// <Post data={GetGraphqlQueryID(id, GET_COMMUNITY_POSTS_QUERY).community.post} />