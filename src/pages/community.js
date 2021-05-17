import React from 'react'
import CommunityHome from '../components/commons/community-home/community-home'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_CATEGORY_COMMUNITY_QUERY } from '../queries/posts'

export default function Community() {
    return (
        <main className="community">
            <h3><b>Community Home Page</b></h3>
            <CommunityHome data = {GetGraphqlQueryID(1, GET_CATEGORY_COMMUNITY_QUERY)}/>
        </main>
    )
}