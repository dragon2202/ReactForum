import React from 'react'
import List from 'antd/lib/list'

import { contentSwitch } from '../functions/contentswitch_community-post'

const CommunityPost_Post = ({ query, user }) => {
    return (
        <List 
            itemLayout="vertical" 
            size="large" 
            className="post-list" 
            pagination={{
                position: 'bottom',
                pageSize: 10
            }}
            dataSource={ query.community.post }
            renderItem={ post =>(
                <List.Item key={post.id}>
                    {contentSwitch(post, user)}
                </List.Item>
            )}
        />
    )
}

//Exports a list of cards with posts in the cards for the page Community Post
export default CommunityPost_Post
