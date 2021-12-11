import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import List from 'antd/lib/list'

import Post from '../components/commons/home-post/index'
import CreatePostNav from '../components/commons/navigation/create-post-nav'
import Directory from '../components/commons/navigation/directory'
import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQuery, GetGraphqlQuery_Refetch } from '../components/commons/functions/getgraphqlquery'
import { GET_POSTS_RECENT, GET_ALL_COMMUNITIES } from '../queries/posts'

export default function Home() {
    let [postQuery, postQueryRefetch] = GetGraphqlQuery_Refetch(GET_POSTS_RECENT)
    let communityQuery = GetGraphqlQuery(GET_ALL_COMMUNITIES)

    if (!isLiteralObject(communityQuery)) {
        return (
            <main className="home">
                <h3><b>Home Page</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }
    if (!isLiteralObject(postQuery)) {
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
                            <section className="create-post">
                                <CreatePostNav />
                            </section>
                            <section className="post-card">
                                <Post post={postQuery.post} postQueryRefetch={postQueryRefetch}/>
                            </section>
                        </div>
                        <div className="community-card">
                            <Card title='Communities'>
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
                                        <List.Item key={item.id}>
                                            <div><Link to={"/community/" + item.id}>{item.title}</Link></div>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            <Directory />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}