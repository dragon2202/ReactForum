import React from 'react'
import List from 'antd/lib/list'

import { contentSwitch } from '../functions/contentswitch'

//Exports a list of cards with posts in the cards
const Post = ({ post, user }) => {
    return (
        <div>
            <h3 style={{ marginTop: "10px", marginLeft: "10px" }}>Recent Posts</h3>
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
                    <List.Item key={item.id}>
                        {contentSwitch(item, user)}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Post
//https://stackoverflow.com/questions/53843548/pagination-and-card-components-with-ant-design-antd
