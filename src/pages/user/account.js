import React from 'react'
import { Link } from 'react-router-dom'
import CreatePostNav from '../../components/commons/navigation/create-post-nav'

import Card from 'antd/lib/card'
import List from 'antd/lib/list'
import Tabs from 'antd/lib/tabs'
import Empty from 'antd/lib/empty'
import Avatar from 'antd/lib/avatar'

import { useCookies } from 'react-cookie'

import ContentCard from '../../components/commons/component/ContentCard'
import LoginOrRegister from '../../components/commons/LoginOrRegister/login-or-register'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID_Refetch } from '../../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITYUSERROLE_AND_USER_AND_POST } from '../../queries/posts'

const { TabPane } = Tabs

const PersonalCard = ({ user }) => {
    return (
        <Card className='personal_card'>
            <div className='css-header' />
            <div>
                <Avatar shape="square" size={80} style={{ borderStyle: 'solid 1px', backgroundColor: 'pink' }} src="https://joeschmoe.io/api/v1/jon" />
                <p><strong>u/{user.username}</strong></p>
                <Link to='/accountsettings'>Settings</Link>
            </div>
        </Card>
    )
}

export default function Account() {
    const [cookies] = useCookies(['userCookie'])
    let [query, queryRefetch] = (cookies.userCookie !== undefined) ? GetGraphqlQueryID_Refetch(cookies.userCookie.id, GET_COMMUNITYUSERROLE_AND_USER_AND_POST) : null

    //If user is not logged in return a page with login and register
    if (cookies.userCookie === undefined) {
        return (
            <main className="account">
                <h3>Account</h3>
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
                                                                    <ContentCard item={item} refetch={queryRefetch}/>
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
                            <PersonalCard user={query.user}/>
                            <Card className="personal-post-card" title="List of your Posts">
                                <List
                                    itemLayout="vertical"
                                    size="small"
                                    className="user-post"
                                    pagination={{
                                        position: 'bottom',
                                        pageSize: 10
                                    }}
                                    dataSource={query.post}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <Link to={"/viewpost/" + item.id}>{item.title}</Link>
                                        </List.Item>
                                    )}
                                >
                                </List>
                            </Card>
                            <Card className="personal-community-card" title='List of your Communities'>
                                <List
                                    itemLayout="vertical"
                                    size="small"
                                    className="about-community"
                                    dataSource={query.communityuserrole}
                                    pagination={{
                                        position: 'bottom',
                                        pageSize: 10
                                    }}
                                    renderItem={item => (
                                        <List.Item key={item.community.id}>
                                            <Link to={{ pathname: "/community/" + item.community.id }}>{item.community.title}</Link>
                                        </List.Item>
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