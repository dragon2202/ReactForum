import React from 'react'
import { Link } from 'react-router-dom'

import List from 'antd/lib/list'
import Card from 'antd/lib/card'
import Comment from 'antd/lib/comment'
import Typography from 'antd/lib/typography'
import Tooltip from 'antd/lib/tooltip'
import Menu from 'antd/lib/menu'
import CommentOutlined from '@ant-design/icons/CommentOutlined'
import moment from 'moment'
import Dropdown from 'antd/lib/dropdown/dropdown'
const { Text } = Typography

const StandAloneCommentTitle = ({ item, user, id }) => {
    return (
        <div>
            <span><CommentOutlined style={{ paddingRight: '4px' }} />{user.username} commented on <Link to={'/viewpost/' + item.post.id}>{item.post.title}</Link></span>
            <br />
            <span>
                <Link to={'/community/' + item.post.community_id} className='community_link'>
                    {'c/' + item.post.community.title + ' '}
                </Link>
                <Text type='secondary'>
                    Posted by {(item.post.user.id !== id) ? <Link to={'/user/' + item.post.user.id}>{item.post.user.username + ' '} </Link> : item.post.user.username + ' '}
                </Text>

                <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                    {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                </Tooltip>
            </span>
        </div>
    )
}

const ListContent = ({ item, user, id }) => {
    if (item.parent_comment_id !== null) {
        return (
            <Card className='list-content' title={<StandAloneCommentTitle item={item} user={user} id={id} />}>
                <Comment
                    key={item.parent.id}
                    author={item.parent.user.username}
                    content={item.parent.comment}
                    datetime={
                        <Tooltip placement="top" title={moment(parseInt(item.parent.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                            {moment(moment(parseInt(item.parent.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                        </Tooltip>
                    }
                >
                    <Comment
                        author={item.user.username}
                        content={item.comment}
                        style={{ backgroundColor: "rgba(0, 121, 211, 0.05)", fill: 'rgb(135, 138, 140)' }}
                        datetime={
                            <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                                {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                            </Tooltip>
                        }
                    />
                </Comment>
            </Card>
        )
    } else {
        return (
            <Card className="list-content" title={<StandAloneCommentTitle item={item} user={user} id={id} />}>
                <Comment
                    author={item.user.username}
                    content={item.comment}
                    style={{ backgroundColor: "rgba(0, 121, 211, 0.05)", fill: 'rgb(135, 138, 140)' }}
                    datetime={
                        <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                            {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                        </Tooltip>
                    }
                />
            </Card>
        )

    }
}

const Comment_List = ({ item, user, id }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={item}
            pagination={{ pageSize: 10, position: 'bottom', hideOnSinglePage: true }}
            renderItem={item => (
                <List.Item>
                    <ListContent item={item} user={user} id={id} />
                </List.Item>
            )}
        />
    )
}

export default Comment_List