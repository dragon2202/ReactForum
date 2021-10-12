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
const AboutCommunity = ({ query, pageID, userID, JoinCommunity, joinMutation, LeaveCommunity, leaveMutation }) => {
    const myStorage = window.localStorage
    useEffect(() => {
        if (myStorage.getItem('reload') != null) {
            switch (parseInt(myStorage.getItem('reload'))) {
                case 1:
                    Message.success({
                        content: 'You have successfully joined ' + query.title,
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    break;
                case 2:
                    Message.success({
                        content: 'You have successfully left ' + query.title,
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    break;
            }
            myStorage.clear()
        }
    },[])
    
    const communityuserrole = query.communityuserrole.find(item => item.user_id === userID)
    const communityBan = query.communityban.find(item => item.user_id === userID)
    const JoinCommunityConfirm = (commPrivacy) => {
        if(commPrivacy === 0) {
            Message.warning({
                content: 'This community is private. Message an admin to join this community.',
                style: { marginTop: '5vh' }
            }, 10)
            return
        }
        confirm({
            title: 'Join Community - ' + query.title,
            content: 'Are you sure you want to join this community?',
            okText: 'Confirm',
            onOk() {
                myStorage.setItem('reload', 1)
                JoinCommunity(pageID, userID, joinMutation)
            },
            width: '125vh'
        })
    }
    const LeaveCommunityConfirm = (communityuserrole) => {
        confirm({
            title: 'Leave Community - ' + query.title,
            content: 'Are you sure you want to leave this community?',
            okText: 'Confirm',
            onOk() {
                myStorage.setItem('reload', 2)
                LeaveCommunity(communityuserrole, leaveMutation)
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
                            <UserDeleteOutlined type="primary" onClick={() => { LeaveCommunityConfirm(communityuserrole) }}/>
                        </span>
                    :
                        ((communityuserrole === undefined) ? false : communityuserrole.user_id === userID && communityuserrole.role_id === 3) ?
                            <UserDeleteOutlined type="primary" onClick={() => { LeaveCommunityConfirm(communityuserrole) }}/>
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
                                    <UserAddOutlined type="primary" onClick={() => { JoinCommunityConfirm(query.public) }}/>
                                    :
                                    null
            }
        >
            <p>{query.summary}</p>
        </Card>
    )
}

export default AboutCommunity