import React from 'react'
import CommunityHome from '../components/commons/community-home/community-home'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQuery } from '../components/commons/functions/getgraphqlquery'
import { GET_ALL_COMMUNITIES_QUERY } from '../queries/posts'

export default function Community() {
    let query = GetGraphqlQuery(GET_ALL_COMMUNITIES_QUERY)

    if (!isLiteralObject(query)) {
        return (
            <main className="community">
                <h3><b>Community Home Page</b></h3>
                <p style={{ textAlign: 'center' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="community">
            <h3><b>Community Home Page</b></h3>
            <CommunityHome data={query.community}/>
        </main>
    )
}