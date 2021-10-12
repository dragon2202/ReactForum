import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import CreatePostNav from '../../components/commons/navigation/create-post-nav'

import Card from 'antd/lib/card'
import List from 'antd/lib/list'
import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
import Empty from 'antd/lib/empty'
import Message from 'antd/lib/message'
import EditOutlined from '@ant-design/icons/EditOutlined'

import { useCookies } from 'react-cookie'

import EditAccount from '../../components/commons/account/editaccount'
import LoginOrRegister from '../../components/commons/LoginOrRegister/login-or-register'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { contentSwitch } from '../../components/commons/functions/contentswitch'
import { OnFinish_Username_Email } from '../../components/commons/account/functions/lazyQuery'
import { GetGraphqlQueryID } from '../../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITY_USER_ROLE_AND_USER_QUERY, CHANGE_USER_INFO,  } from '../../queries/posts'

const { TabPane } = Tabs

export default function Account() {
    const [cookies, set] = useCookies(['userCookie'])
    let query = (cookies.userCookie !== undefined) ? GetGraphqlQueryID(cookies.userCookie.id, GET_COMMUNITY_USER_ROLE_AND_USER_QUERY) : null
    const [editToggle, setEditToggle] = useState(false)
    const [postSearch, setPostSearch] = useState('')
    const [communitySearch, setCommunitySearch] = useState('')
    const [user, setUserObj] = useState(null)
    const [ChangeUserInfo] = useMutation(CHANGE_USER_INFO)
    const localStorage = window.localStorage

    useEffect(() => {
        if (localStorage.getItem('reload') != null) {
            Message.success({
                content: 'Your account information has been successfully changed.',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            localStorage.clear()
        }
    }, [])

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
            <main className="account">
                <h3><b>Account</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="account">
            <section className="container">
                <div className="row">
                    <h3 className="header-3"><b>Account</b></h3>
                    <div className="posts-list">
                        <div className="posts">
                            <section className="create-post-nav">
                                <CreatePostNav />
                            </section>
                            <section className="post-list">
                                <Card className="card">
                                    {
                                        (query.communityuserrole.length === 0) ?
                                            <Empty />
                                            :
                                            <Tabs type='line'>
                                                {
                                                    query.communityuserrole.map((item, index) => (
                                                        <TabPane tab={item.community.title} key={item.community_id}>
                                                            <List
                                                                itemLayout="vertical"
                                                                size="large"
                                                                className="account-community-post"
                                                                pagination={{
                                                                    position: 'bottom',
                                                                    pageSize: 5
                                                                }}
                                                                dataSource={query.communityuserrole[index].community.post}
                                                                renderItem={item => (
                                                                    <List.Item key={item.id}>
                                                                        {contentSwitch(item, cookies.userCookie)}
                                                                    </List.Item>
                                                                )}
                                                            >
                                                            </List>
                                                        </TabPane>
                                                    ))
                                                }
                                            </Tabs>
                                    }
                                </Card>
                            </section>
                        </div>
                        <div className="personal">
                            <Card className="user-info" title="User Info" extra={<EditOutlined onClick={() => setEditToggle(!editToggle)} />}>
                                <EditAccount
                                    editToggle={editToggle}
                                    item={query.user}
                                    OnFinish_Username_Email={OnFinish_Username_Email}
                                    user={user}
                                    setUserObj={setUserObj}
                                    ChangeUserInfo={ChangeUserInfo}
                                    set={set}
                                    localStorage={localStorage}

                                />
                            </Card>
                            <Card className="personal-post-card" title={<Input placeholder="Search Posts" onChange={(e) => { setPostSearch(e.target.value) }} />}>
                                <List
                                    header="List of your Posts"
                                    itemLayout="vertical"
                                    size="small"
                                    className="user-post"
                                    pagination={{
                                        position: 'bottom',
                                        pageSize: 10
                                    }}
                                    dataSource={query.post}
                                    renderItem={item => (
                                        ((item.title.toLowerCase()).includes(postSearch.toLowerCase())) ?
                                            <List.Item key={item.id}>
                                                <Link to={"/viewpost/" + item.id}>{item.title}</Link>
                                            </List.Item>
                                            :
                                            null
                                    )}
                                >
                                </List>
                            </Card>
                            <Card className="personal-community-card" title={<Input placeholder="Search Community" onChange={(e) => { setCommunitySearch(e.target.value) }} />}>
                                <List
                                    header="List of your Communities"
                                    itemLayout="vertical"
                                    size="small"
                                    className="about-community"
                                    dataSource={query.communityuserrole}
                                    pagination={{
                                        position: 'bottom',
                                        pageSize: 10
                                    }}
                                    renderItem={item => (
                                        ((item.community.title.toLowerCase()).includes(communitySearch.toLowerCase())) ?
                                            <List.Item key={item.community.id}>
                                                <Link to={{ pathname: "/community/" + item.community.id }}>{item.community.title}</Link>
                                            </List.Item>
                                            :
                                            null
                                    )}
                                >
                                </List>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

//dataSource={query.communityuserrole[0].post}