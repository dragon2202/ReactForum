import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Menu from 'antd/lib/menu'
import Card from 'antd/lib/card'
import Dropdown from 'antd/lib/dropdown'

import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone'
import FileImageTwoTone from '@ant-design/icons/FileImageTwoTone'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'
import CreatePostContent from '../components/commons/create-post/create-post-content'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITYUSERROLE_BY_USER } from '../queries/posts'

import { useCookies } from 'react-cookie'


export default function CreatePost() {
    const [ cookies ] = useCookies(['userCookie'])
    let query = (cookies.userCookie === undefined) ? null : GetGraphqlQueryID(cookies.userCookie.id, GET_COMMUNITYUSERROLE_BY_USER)
    const location = useLocation()
    const [ communityID, setCommunityID ] = useState('')
    const [ currentMenu, setMenu ] = useState('Post')
    const [ community, setCommunity ] = useState('')

    useEffect(() => {
        if (location.state) {//if location is undefined
            setMenu(location.state.item)
        }
    }, [location])

    const handleClick = (value) => {
        setMenu(value.key)
    }

    const CommunityMap = (data) => {
        if (data == undefined || data.length == 0) {
            return (
                <Menu.Item key="0" disabled="true">
                    Join a community to post content.
                </Menu.Item>
            )
        }
        return data.map((item, index) => {
            return (
                <Menu.Item key={index} onClick={() => {
                    setCommunityID(item.community.id)
                    setCommunity(item.community.title)
                }} value={item.community.title}>
                    {item.community.title}
                </Menu.Item>
            )
        })
    }

    if (cookies.userCookie === undefined) {
        return (
            <main className="createpost">
                <h3>Create Post</h3>
                <LoginOrRegister />
            </main>
        )
    }

    return (
        <main className="createpost">
            <Card title="Create Post">
                <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal" theme='dark'>
                    <Menu.Item key="Post" icon={<FileTextTwoTone />}>
                        Post
                </Menu.Item>
                    <Menu.Item key="Image" icon={<FileImageTwoTone />}>
                        Image
                </Menu.Item>
                    <Menu.Item key="Link" icon={<LinkOutlined />}>
                        Link
                </Menu.Item>
                </Menu>
                <Dropdown.Button overlay={
                    <Menu>
                        { CommunityMap(query.communityuserrole) }
                    </Menu>
                }>
                    <strong>{"Community for the post: " + community}</strong>
                </Dropdown.Button>
                <CreatePostContent content={currentMenu} cookies={cookies} currentMenu={currentMenu} communityID={communityID} community={community}/>
            </Card>
        </main>
    )
}