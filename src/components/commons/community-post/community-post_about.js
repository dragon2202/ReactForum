import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'
import Card from 'antd/lib/card'
import EditOutlined from '@ant-design/icons/EditOutlined'
import UserDeleteOutlined from '@ant-design/icons/UserDeleteOutlined'
import UserAddOutlined from '@ant-design/icons/UserAddOutlined'

const { confirm } = Modal

//Exports a List of cards containing communities to the community post page
const AboutCommunity = ({ query, pageID, userID, JoinCommunity, joinMutation, LeaveCommunity, leaveMutation, refetch }) => {
    const communityuserrole = query.communityuserrole.find(item => item.user_id === userID)
    const communityBan = query.communityban.find(item => item.user_id === userID)
    const JoinCommunityConfirm = () => {
        confirm({
            title: 'Join Community - ' + query.title,
            content: 'Are you sure you want to join this community?',
            okText: 'Confirm',
            onOk() {
                JoinCommunity(pageID, userID, joinMutation, refetch)
                Message.success({ content: 'You have successfully joined this community', style: { marginTop: '5vh' } }, 10)
            },
            width: '125vh'
        })
    }
    const LeaveCommunityConfirm = (communityuserrole, refetch) => {
        confirm({
            title: 'Leave Community - ' + query.title,
            content: 'Are you sure you want to leave this community?',
            okText: 'Confirm',
            onOk() {
                LeaveCommunity(communityuserrole, leaveMutation, refetch)
                Message.success({ content: 'You have successfully left this community', style: { marginTop: '5vh' } }, 10)
            },
            width: '125vh'
        })
    }
    return (
        <Card
            title="Description"
            className="description"
            extra={
                ((communityuserrole === undefined) ? false : communityuserrole.user_id === userID && communityuserrole.role_id === 1) ?
                    <span className="edit-delete">
                        <Link to={`/editcommunity/${pageID}`} className="edit">
                            <EditOutlined key="edit" />
                        </Link>
                    </span>
                    :
                    ((communityuserrole === undefined) ? false : communityuserrole.user_id === userID && communityuserrole.role_id === 2) ?
                        <span className="edit-delete">
                            <Link to={`/editcommunity/${pageID}`} className="edit" style={{paddingRight: '5px'}}>
                                <EditOutlined key="edit" />
                            </Link>
                            <UserDeleteOutlined type="primary" onClick={() => { LeaveCommunityConfirm(communityuserrole, refetch) }}/>
                        </span>
                    :
                        ((communityuserrole === undefined) ? false : communityuserrole.user_id === userID && communityuserrole.role_id === 3) ?
                            <UserDeleteOutlined type="primary" onClick={() => { LeaveCommunityConfirm(communityuserrole, refetch) }}/>
                            :
                            (communityBan !== undefined) ?
                                <UserAddOutlined type="primary" onClick={() => {
                                    Message.error({
                                        content: 'You were banned from this community. Message an admin to lift ban.',
                                        style: { marginTop: '5vh' }
                                    }, 10)
                                }}/>
                                :
                                (userID !== null) ?
                                    <UserAddOutlined type="primary" onClick={() => { JoinCommunityConfirm(query.public, refetch) }}/>
                                    :
                                    null
            }
        >
            <p>{query.summary}</p>
        </Card>
    )
}

export default AboutCommunity