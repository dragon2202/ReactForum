import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Tooltip from 'antd/lib/tooltip'
import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import UnlockOutlined from '@ant-design/icons/UnlockOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

import { showConfirmDelete, showConfirmLock, contentSwitch } from './components/functions'

const ShowPost = ({ post, id, cookies, isEditable, triggerEditable, deletePostMutation, lockPostMutation, localStorage, history }) => {
    return (
        <Card
            title={post.title}
            className="viewpost-card"
            extra={
                <Tooltip title="Inactive posts are locked and cannot be edited. It will also be hidden in Community and Home." placement="bottomLeft"> 
                    <InfoCircleOutlined /> {(post.active == 1) ? "Status: Active" : "Status: Inactive"} 
                </Tooltip>
            }
            actions={
                (cookies.userCookie !== undefined && cookies.userCookie.id === post.author_id) ?
                [
                    <EditOutlined key="edit" onClick={() => triggerEditable(!isEditable)}/>,
                    <DeleteOutlined onClick={() => showConfirmDelete(post, cookies, id, deletePostMutation, localStorage, history)} />,
                    <UnlockOutlined onClick={() => showConfirmLock(post, cookies, id, lockPostMutation, localStorage)} />
                ]
                : 
                null
            }
        >
            <span className="author_span">
                <UserOutlined />
                <Tooltip title={post.user.email} placement="bottomRight">
                    {"Author: " + post.user.username}
                </Tooltip>
            </span>
            <span className="community_span">
                <UsergroupAddOutlined />Community:
                <Link to={{ pathname: `/community/${post.community.id}` }}>
                    {" " + post.community.title}
                </Link>
            </span>
            <div className="clear"> </div>
            {contentSwitch(post)}
        </Card>
    )
}

export default ShowPost
//`/editpost/${post.id}`
//post.author_id != cookies.userCookie.id