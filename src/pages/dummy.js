import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import Tabs from 'antd/lib/tabs'
import Card from 'antd/lib/card'
import List from 'antd/lib/list'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Descriptions from 'antd/lib/descriptions'
import DropDown from 'antd/lib/dropdown'
import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'
import Search from 'antd/lib/input/Search'
import DownOutlined from '@ant-design/icons/DownOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import StopOutlined from '@ant-design/icons/StopOutlined'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'
import EditCommunityMenu from '../components/commons/edit-community/EditCommunityMenu'
import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITY_USER, UPDATE_COMMUNITY_USER_ROLE, UPDATE_COMMUNITY_DETAILS, REMOVE_USER_COMMUNITY_USER_ROLE, BAN_USER } from '../queries/posts'
import { useCookies } from 'react-cookie'

const { confirm } = Modal
const { TabPane } = Tabs

export default function EditCommunity() {
    let { id } = useParams()
    const [currentDropDown, setDropDown] = useState([])

    let query = GetGraphqlQueryID(id, GET_COMMUNITY_USER)
    const [updateUserRole] = useMutation(UPDATE_COMMUNITY_USER_ROLE)
    const [updateCommunityDetails] = useMutation(UPDATE_COMMUNITY_DETAILS)
    const [removeUserCommunityUserRole] = useMutation(REMOVE_USER_COMMUNITY_USER_ROLE)
    const [banUser] = useMutation(BAN_USER) 
    const [listData, setListData] = useState([])
    const [currentTab, setTab] = useState("1")
    const [ownerID, setOwnerID] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [ searchParam, setSearch ] = useState('')
    const [cookies] = useCookies(['userCookie'])
    const localStorage = window.localStorage

    useEffect(() => {
        if (localStorage.getItem('reload') != null) {
            switch (parseInt(localStorage.getItem('reload'))) {
                case 1:
                    Message.success({
                        content: 'You have successfully updated details of the community.',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    setTab("1")
                    break;
                case 2:
                    Message.success({
                        content: "You have successfully updated a user's role.",
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    setTab("2")
                    break;
                case 3:
                    Message.success({
                        content: "You have successfully removed a user from the community.",
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    setTab("2")
                    break;
                case 4:
                    Message.success({
                        content: "You have successfully banned a user from the community.",
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    setTab("2")
                    break;
            }
            localStorage.clear()
        }
    }, [])

    useEffect(() => {
        if (isLiteralObject(query)) {
            for (var i = 0; i < query.community.communityuserrole.length; i++) {
                if (query.community.communityuserrole[i].role.title === "Owner") {//Set the community owner ID
                    setOwnerID(query.community.communityuserrole[i].user_id)
                }
                if (cookies.userCookie) {//If user is logged in
                    if(cookies.userCookie.user.id === query.community.communityuserrole[i].user_id) {//Logged in user is current user set state
                        setCurrentUser({
                            id: query.community.communityuserrole[i].user_id,
                            role_id: query.community.communityuserrole[i].role_id
                        })
                    }
                }
                const users = {//object of the list of community users
                    id: query.community.communityuserrole[i].user_id,
                    username: query.community.communityuserrole[i].user.username,
                    email: query.community.communityuserrole[i].user.email,
                    roleID: query.community.communityuserrole[i].role.id,
                    roleTitle: query.community.communityuserrole[i].role.title
                }
                const dropdown = {//object to keep track of changes of roles in front end
                    id: query.community.communityuserrole[i].user_id,
                    roleTitle: query.community.communityuserrole[i].role.title
                }
                setDropDown(prevValue => [...prevValue, dropdown])
                setListData(prevValue => [...prevValue, users])
            }
        }
    }, [])
    
    function handleChange(event) {
        setSearch(event.target.value)
    }

    //Modal to confirm removing a user from community
    function confirmRemoveUser(user_id, role_id) {
        confirm({
            title: 'Remove User',
            content: "Are you sure you want to remove this person from the community?",
            onOk() {
                removeUser(user_id, role_id)
            },
            width: '125vh'
        })
    }
    //Modal to confirm removing a user from community
    function confirmBanUser(user_id) {
        confirm({
            title: 'Ban User',
            content: "Are you sure you want to ban this person from the community?",
            onOk() {
                ban_user(user_id)
            },
            width: '125vh'
        })
    }

    //Function to handle the apollo graphql mutation of remove a user from the community
    async function removeUser(user_id, role_id) {
        localStorage.setItem('reload', 3)
        const communityuserrole = {
            community_id: parseInt(id),
            user_id: user_id,
            role_id: role_id
        }
        await removeUserCommunityUserRole({
            variables: { communityuserrole }
        })
        window.location.reload()
    }
    //Function to handle the apollo graphql mutation of ban a user from the community
    async function ban_user(user_id) {
        localStorage.setItem('reload', 4)
        const communityban = {
            community_id: parseInt(id),
            user_id: user_id
        }
        await banUser({
            variables: { communityban }
        })
        window.location.reload()
    }

    //Function to handle apollo graphql to update community details
    async function onFinish(values) {
        localStorage.setItem('reload', 1)
        const community = {
            id: parseInt(id),
            title: values.title,
            summary: values.description
        }
        await updateCommunityDetails({
            variables: { community }
        })
        window.location.reload()
    }
    //If user is not logged in return a page with login and register
    if (cookies.userCookie == undefined) {
        return (
            <main className="editcommunity">
                <h3>Edit Community</h3>
                <LoginOrRegister />
            </main>
        )
    }

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="editcommunity">
                <h3>Edit Community</h3>
                <p style={{ textAlign: 'center', paddingTop:'80px' }}>Loading...</p>
            </main>
        )
    }
    /*
    if (currentUser !== null) {
        if (currentUser.role_id === 3) {
            return (
                <main className="editcommunity">
                    <div style={{ textAlign: 'center' }}>
                        <p >You are not authorized to be on this page.</p>
                        <a onClick={() => window.history.back()}>Go back a page</a>
                    </div>
                </main>
            )
        }
    } else {
        return (
            <main className="editcommunity">
                <div style={{ textAlign: 'center' }}>
                    <p >Loading..</p>
                    <a onClick={() => window.history.back()}>Go back a page</a>
                </div>
            </main>
        )
    }
     */
    return (
        <main className="editcommunity">
            <h3>Edit Community</h3>
            <Card className="card-tab">
                <Tabs type="card" className="tab" defaultActiveKey={currentTab}>
                    <TabPane tab="Edit Community Details" key="1">
                        <Form
                            className="community-form"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            name="basic"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Title"
                                name="title"
                                initialValue={query.community.title}
                            >
                                <Input className="title" />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                initialValue={query.community.summary}
                            >
                                <Input.TextArea className="description" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane tab="Edit Users in Community" key="2">
                        <Search className="search" placeholder="Search Users" onChange={handleChange} className='search-bar'/>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{ pageSize: 5 }}
                            dataSource={listData}
                            renderItem={item => (
                                (item.username.toLowerCase()).includes(searchParam.toLowerCase()) ?
                                    <List.Item key={item.id}>
                                        <Descriptions 
                                            title={item.username} 
                                            className="user-info"
                                            // returns null if current user is the same person or same/higher permissions, so you can't delete yourself or anybody higher than you
                                            extra={
                                                (cookies.userCookie.user.id === item.id || currentUser.role_id >= item.roleID) ? 
                                                    null 
                                                    : 
                                                    <span>
                                                        <StopOutlined onClick={() => confirmBanUser(item.id)} style={{marginRight: '10px'}}/>
                                                        <DeleteOutlined onClick={() => confirmRemoveUser(item.id, item.roleID)}/>
                                                    </span>
                                            }
                                        >
                                            <Descriptions.Item label="Email"> {item.email}</Descriptions.Item>
                                            <Descriptions.Item label="Current Role">
                                                {item.roleTitle}
                                            </Descriptions.Item>
                                            { 
                                                (cookies.userCookie.user.id === item.id) ? 
                                                    //Description describing current user
                                                    null
                                                : (cookies.userCookie.user.id !== ownerID && (item.roleTitle === "Admin" || item.roleTitle === "Owner")) ?
                                                    //Current User is not the owner and account is either admin or owner to prevent admins changing admin/owner role
                                                    null
                                                :
                                                <Descriptions.Item label="Edit Role">
                                                    <DropDown overlay={
                                                        <EditCommunityMenu
                                                            role={currentUser.role_id}
                                                            itemKey={item.id}
                                                            username={item.username}
                                                            community_id={id}
                                                            localStorage={localStorage}
                                                            currentUser={currentUser}
                                                            currentDropDown={currentDropDown}
                                                            setDropDown={setDropDown}
                                                            updateUserRole={updateUserRole}
                                                        />
                                                    }>
                                                        <a> {currentDropDown.find(data => data.id == item.id).roleTitle} <DownOutlined /></a>
                                                    </DropDown>
                                                </Descriptions.Item>
                                            }
                                        </Descriptions>
                                    </List.Item>
                                :
                                    null
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </main>
    )

}
