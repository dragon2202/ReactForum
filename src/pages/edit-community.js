import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams, Redirect, Link } from 'react-router-dom'

import Tabs from 'antd/lib/tabs'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Search from 'antd/lib/input/Search'
import Dropdown from 'antd/lib/dropdown'
import List from 'antd/lib/list'
import Descriptions from 'antd/lib/descriptions'

import DownOutlined from '@ant-design/icons/DownOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import StopOutlined from '@ant-design/icons/StopOutlined'

import EditCommunityDropDown from '../components/commons/edit-community/EditCommunityDropDown'
import { confirmRemoveUser, confirmBanUser, updateDetails, confirmUnbanUser } from '../components/commons/edit-community/functions/mutation'
import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID_Refetch } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITY_USER, UPDATE_COMMUNITY_USER_ROLE, UPDATE_COMMUNITY_DETAILS, REMOVE_USER_COMMUNITY_USER_ROLE, BAN_USER, UNBAN_USER } from '../queries/posts'
import { useCookies } from 'react-cookie'

const { TabPane } = Tabs

export default function EditCommunity() {
    let { id } = useParams()
    let [query, refetch] = GetGraphqlQueryID_Refetch(id, GET_COMMUNITY_USER)
    
    const [currentTab, setTab] = useState("1")
    const [searchParam, setSearch] = useState('')
    const [updateRole] = useMutation(UPDATE_COMMUNITY_USER_ROLE)
    const [removeUserCommunityUserRole] = useMutation(REMOVE_USER_COMMUNITY_USER_ROLE)
    const [updateCommunityDetails] = useMutation(UPDATE_COMMUNITY_DETAILS)
    const [banUser] = useMutation(BAN_USER) 
    const [unbanUser] = useMutation(UNBAN_USER) 
    
    const [cookies] = useCookies(['userCookie'])
    let currentUser = (query.community === undefined) ? null : query.community.communityuserrole.find(element => element.user_id === cookies.userCookie.id)
    let communityuserrole

    //If user is not logged in return a page with error
    if (cookies.userCookie === undefined) {
        return (
            <Redirect to="/error" />
        )
    }

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="editcommunity">
                <h3>Edit Community</h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    const onFinish = (values) => {
        updateDetails(values, id, updateCommunityDetails, refetch, setTab)
    }

    function handleChange(event) {
        setSearch(event.target.value)
    }

    return (
        <main className="editcommunity">
            <Link to={'/community/' + id}>Back to Community</Link>
            <h3 className="header">Edit Community</h3>
            <Card className="card-tab">
                <Tabs type="card" className="tab" defaultActiveKey={currentTab}>
                    <TabPane tab="Edit Users in Community" key="1">
                        <Search className="search-bar" placeholder="Search Users" onChange={handleChange}/>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={query.community.communityuserrole}
                            renderItem={item => (
                                (item.user.username.toLowerCase()).includes(searchParam.toLowerCase()) ?
                                    <List.Item key={item.user_id}>
                                        <Descriptions
                                            title={item.user.username} 
                                            className='user-info'
                                            extra={
                                                (currentUser.user_id === item.user_id || currentUser.role_id >= item.role_id) ? 
                                                    // returns null if current user is the same person or same/higher permissions, so you can't delete yourself or anybody higher than you
                                                    null
                                                    :
                                                    <span>
                                                        <StopOutlined onClick={() => confirmBanUser(item.community_id, item.user_id, banUser, refetch)} style={{marginRight: '10px'}}/>
                                                        <DeleteOutlined onClick={() => confirmRemoveUser(item.community_id, item.user_id, item.role_id, removeUserCommunityUserRole, refetch)}/>
                                                    </span>
                                            }
                                        >
                                            <Descriptions.Item label="Email">{item.user.email}</Descriptions.Item>
                                            <Descriptions.Item label="Current Role">{item.role.title}</Descriptions.Item>
                                            {
                                                (cookies.userCookie.id === item.user_id) ? 
                                                    //Description describing current user
                                                    null
                                                : (currentUser.role.title !== 'Owner' && (item.role.title === "Admin" || item.role.title === "Owner")) ?
                                                    //Current User is not the owner and account is either admin or owner to prevent admins changing admin/owner role
                                                    null
                                                :
                                                <Descriptions.Item label="Edit Role">
                                                    <Dropdown overlay={
                                                        <EditCommunityDropDown
                                                            role_title={currentUser.role.title}
                                                            key={item.user_id + item.role_id}
                                                            communityuserrole={
                                                                communityuserrole = {
                                                                    owner_id: currentUser.user_id,
                                                                    owner_role_id: currentUser.role_id,
                                                                    community_id: parseInt(id),
                                                                    user_id: item.user.id
                                                                }
                                                            }
                                                            username={item.user.username}
                                                            mutation={updateRole}
                                                            refetch={refetch}
                                                        />
                                                    }>
                                                        <a> {item.role.title} <DownOutlined /></a>
                                                    </Dropdown>
                                                </Descriptions.Item>
                                            }
                                        </Descriptions>
                                    </List.Item>
                                :
                                    null
                            )}
                        />
                    </TabPane>

                    <TabPane tab="Edit Community Details" key="2">
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

                    <TabPane tab="Community Bans" key="3">
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={query.community.communityban}
                            renderItem={item => (
                                <List.Item>
                                    <span>
                                        {item.user.username}
                                        <DeleteOutlined style={{ float: 'right'}} onClick={() => confirmUnbanUser(item.community_id, item.user_id, unbanUser, refetch)}/>
                                    </span>
                                </List.Item>
                            )}
                        />
                    </TabPane>

                </Tabs>
            </Card>
        </main>
    )
}
