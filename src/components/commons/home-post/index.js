import React from 'react'
import List from 'antd/lib/list'

import ContentCard from '../component/ContentCard'

//Exports a list of cards with posts in the cards
const Post = ({ post, postQueryRefetch }) => {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                className="post-list"
                pagination={{
                    position: 'bottom',
                    pageSize: 10
                }}
                dataSource={post}
                renderItem={item => (
                    <ContentCard item={item} refetch={postQueryRefetch}/>
                )}
            />
        </div>
    )
}

export default Post
//<h3 style={{ marginTop: "10px", marginLeft: "10px" }}>Recent Posts</h3>
//https://stackoverflow.com/questions/53843548/pagination-and-card-components-with-ant-design-antd
