import React, { useState } from 'react'
import Post from '../components/commons/home-post/index'
import CreatePostNav from '../components/commons/navigation/create-post-nav'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import List from 'antd/lib/list'
import Input from 'antd/lib/input'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQuery } from '../components/commons/functions/getgraphqlquery'
import { GET_POSTS_RECENT, GET_ALL_COMMUNITIES } from '../queries/posts'

import { useCookies } from 'react-cookie'

export default function Home() {
    const [cookies] = useCookies(['userCookie'])
    const [search, setSearch] = useState('')
    let postQuery = GetGraphqlQuery(GET_POSTS_RECENT)
    let communityQuery = GetGraphqlQuery(GET_ALL_COMMUNITIES)

    if (!isLiteralObject(communityQuery) || !isLiteralObject(postQuery)) {
        return (
            <main className="home">
                <h3><b>Home Page</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="home">
            <section className="container">
                <div className="row">
                    <h3><b>Home Page</b></h3>
                    <div className="masonry-card-grid">
                        <div className="nested-section">
                            <section className="create-post-nav">
                                <CreatePostNav />
                            </section>
                            <section className="post-card">
                                <Post post={postQuery.post} />
                            </section>
                        </div>
                        <div className="community-card">
                            <div className="search-reset">
                                <Input className="search" placeholder="Search Community" onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                            <Card title={"Community"}>
                                <List
                                    itemLayout="vertical"
                                    size="small"
                                    className="community-list"
                                    pagination={{
                                        position: 'bottom',
                                        pageSize: 10
                                    }}
                                    dataSource={communityQuery.community}
                                    renderItem={item => (
                                        ((item.title.toLowerCase()).includes(search.toLowerCase())) ?
                                            <List.Item key={item.id}>
                                                <div><Link to={"/community/" + item.id}>{item.title}</Link></div>
                                            </List.Item>
                                            :
                                            null
                                    )}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
