import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Tooltip from 'antd/lib/tooltip'
import Typography from 'antd/lib/typography'
import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import UnlockOutlined from '@ant-design/icons/UnlockOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import Message from 'antd/lib/message'
import moment from 'moment'

import { showConfirmDelete, showConfirmLock, contentSwitch } from './components/functions'
const { Text } = Typography

const Header = ({ item }) => {
    return (
        <div>
            <Text type='secondary'>{' Posted by ' + item.user.username + ' '}</Text>
            <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
            </Tooltip>
            <br />
            <span>
                <b>{item.title}</b>
            </span>
        </div>
    )
}

const ShowPost = ({ post, id, cookies, isEditable, triggerEditable, deletePostMutation, lockPostMutation, refetch, history }) => {
    return (
        <Card
            title={<Header item={post}/>}
            className="viewpost-card"
            extra={
                <Tooltip title="Inactive posts are locked and cannot be edited. It will also be hidden in Community and Home." placement="bottomLeft"> 
                    <InfoCircleOutlined /> {(post.active == 1) ? "Status: Active" : "Status: Inactive"} 
                </Tooltip>
            }
            actions={
                (cookies.userCookie !== undefined && cookies.userCookie.id === post.author_id) ?
                    (post.active === -1) ?
                    [
                        <EditOutlined key="edit" onClick={() => 
                            Message.warning({
                                content: 'Post is locked. You cannot edit at this time.',
                                style: {
                                    marginTop: '5vh',
                                },
                            }, 10)} 
                        />,
                        <DeleteOutlined onClick={() => 
                            Message.warning({
                                content: 'Post is locked. You cannot edit at this time.',
                                style: {
                                    marginTop: '5vh',
                                },
                            }, 10)}  />,
                        <UnlockOutlined onClick={() => showConfirmLock(post, cookies, id, lockPostMutation, refetch)} />
                    ]
                    :
                    [
                        <EditOutlined key="edit" onClick={() => triggerEditable(!isEditable)} />,
                        <DeleteOutlined onClick={() => showConfirmDelete(post, cookies, id, deletePostMutation, refetch, history)} />,
                        <UnlockOutlined onClick={() => showConfirmLock(post, cookies, id, lockPostMutation, refetch)} />
                    ]
                    :
                    null
            }
        >
            <div className="clear"> </div>
            {contentSwitch(post)}
        </Card>
    )
}

export default ShowPost
//`/editpost/${post.id}`
//post.author_id != cookies.userCookie.id