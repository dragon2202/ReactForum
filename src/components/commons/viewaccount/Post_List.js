import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import List from 'antd/lib/list'
import Avatar from 'antd/lib/avatar'
import Badge from 'antd/lib/badge'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'
import ExpandAltOutlined from '@ant-design/icons/ExpandAltOutlined'
import CommentOutlined from '@ant-design/icons/CommentOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'

const Avatar_For_List = ({ item }) => {
    switch (item.type) {
        case 'Post':
            return (
                <Avatar shape="square" size={64} icon={<FileTextOutlined />} />
            )
        case 'Link':
            return (
                <Avatar shape="square" size={64} icon={<LinkOutlined />} />
            )
        case 'Image':
            return (
                <Avatar shape="square" size={64} icon={<img alt="" src={item.image} style={{ maxWidth: "100%" }} />} />
            )
    }
}

const Description_Actions = ({ item, expand, setExpand }) => {
    switch(item.type) {
        case 'Post':
            return (
                <div className='description-expand'>
                    <span>
                        <ExpandAltOutlined className='expand-icon' onClick={() => setExpand(!expand)}/> 
                        <Link to={'/viewpost/' + item.id}>
                            <Badge count={item.comment.length} size="small" overflowCount={99}><CommentOutlined className='comment-icon'/> </Badge>
                        </Link>
                    </span>
                    <p className='post' style={{ display: (expand) ? 'block': 'none' }}> 
                        {item.text}
                    </p>
                </div>
            )
        case 'Image':
            return (
                <div className='description-expand'>
                    <span>
                        <ExpandAltOutlined className='expand-icon' onClick={() => setExpand(!expand)}/> 
                        <Link to={'/viewpost/' + item.id}>
                            <Badge count={item.comment.length} size="small" overflowCount={99}><CommentOutlined className='comment-icon'/> </Badge>
                        </Link>
                    </span>
                    <img className='image' alt="" src={item.image} style={{ display: (expand) ? 'block': 'none' }} />
                </div>
            )
        case 'Link':
            return (
                <div className='description-expand'>
                    <span>
                        <a className='external-link' href={"http://" + `${item.text}`} target="_blank" >
                            <ExportOutlined />
                        </a> 
                        <Link to={'/viewpost/' + item.id}>
                            <Badge count={item.comment.length} size="small" overflowCount={99}><CommentOutlined className='comment-icon'/> </Badge>
                        </Link>
                    </span>
                </div>
            )
        default: 
            return (
                <p>Error</p>
            )
    }
}

const Description_For_List = ({ item, user }) => {
    const [expand, setExpand] = useState(false)
    return (
        <div className='description_list'>
            <span><Link to={'/community/' + item.community.id}>{"c/" + item.community.title}</Link> {' Posted by ' + user.username}</span>
            <br />
            <Description_Actions item={item} expand={expand} setExpand={setExpand} />
        </div>
    )
}

const Post_List = ({ item, user }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={item}
            pagination={{ pageSize: 10, position: 'bottom', hideOnSinglePage: true}}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar_For_List item={item} />}
                        title={<Link to={'/viewpost/' + item.id}><b>{item.title}</b></Link>}
                        description={<Description_For_List item={item} user={user}/>}
                    />
                </List.Item>
            )}
        />
    )
}

export default Post_List