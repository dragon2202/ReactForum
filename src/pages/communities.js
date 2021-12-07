import React, { useState } from 'react'
import CommunityHome from '../components/commons/community-home/community-home'
import CommunityDetail from '../components/commons/community-home/hover-communitydetail'
import Directory from '../components/commons/navigation/directory'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQuery } from '../components/commons/functions/getgraphqlquery'
import { GET_ALL_COMMUNITIES } from '../queries/posts'

export default function Community() {
    const [hoveredCommunity, setHovered] = useState(null)
    let query = GetGraphqlQuery(GET_ALL_COMMUNITIES)

    if (!isLiteralObject(query)) {
        return (
            <main className="communities">
                <h3><b>Community Home Page</b></h3>
                <p style={{ textAlign: 'center' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="communities">
            <h3><b>Community Home Page</b></h3>
            <span className='nested-section' onMouseLeave={() => setHovered(null)}>
                <CommunityHome item={query.community} setHovered={setHovered}/>
                <div className='description-directory'>
                    <CommunityDetail community={hoveredCommunity}/>
                    <Directory />
                </div>
            </span>
        </main>
    )
}