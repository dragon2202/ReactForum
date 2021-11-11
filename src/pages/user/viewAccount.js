import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Tabs from 'antd/lib/tabs'
import List from 'antd/lib/list'
import Card from 'antd/lib/card'

import PostCommentCard from '../../components/commons/component/Post_Comment_Card'
import { GetGraphqlQueryID } from '../../components/commons/functions/getgraphqlquery'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GET_VIEW_ACCOUNT } from '../../queries/posts'

const { TabPane } = Tabs

const Overview = ({ id, posts, comments, user }) => {
    let filteredComments = comments.filter(
        comment => !posts.map(post => { return post.id }).includes(comment.post_id)
    )
    const post_comment = posts.concat(filteredComments).sort(function(a, b){
        var keyA = a.created_at,
            keyB = b.created_at
        // Compare the 2 dates
        if(keyA > keyB) {
            return -1
        }
        if(keyA < keyB) {
            return 1
        }
        return 0
    })
    return(
        <List
            className='overview-list'
            dataSource={post_comment}
            renderItem={item => (
                <List.Item>
                    <PostCommentCard id={id} isPost={(item.title) ? true : false} item={item} user={user}/>
                </List.Item>
            )}
        />
    )
}


export default function ViewAccount() {
    let { id } = useParams()
    let query = GetGraphqlQueryID(id, GET_VIEW_ACCOUNT)

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="viewAccount">
                <h3><b>View Account</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return(
        <main className="viewAccount">
            <h3><b>View Account</b></h3>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Overview" key="1">
                    <div className='post_comment_personal'>
                        <div className='post_comment'>
                            <Overview id={parseInt(id)} posts={query.post} comments={query.comment} user={query.user}/>
                        </div>
                        <div className='personal'>
                            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Posts" key="2">

                </TabPane>
                <TabPane tab="Comments" key="3">

                </TabPane>
            </Tabs>
        </main>
    )
}

/*
    <Button onClick={() => PostCommentList(query)} type="primary">
        Click Me
    </Button>

    

    function PostCommentList (query) {
        let postFilter = query.post.map(item => {
            return item.id 
        })
        let filteredComments = query.comment.filter(
            item => !postFilter.includes(item.post_id)
        )
    }
*/