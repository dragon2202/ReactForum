import React from 'react'
import { useParams} from 'react-router-dom'

import Overview from '../../components/commons/viewaccount/Overview'
import PostList from '../../components/commons/viewaccount/Post_List'
import CommentList from '../../components/commons/viewaccount/Comment_List'
import Directory from '../../components/commons/navigation/directory'
import Avatar from 'antd/lib/avatar'
import Card from 'antd/lib/card'
import Tabs from 'antd/lib/tabs'
import { GetGraphqlQueryID } from '../../components/commons/functions/getgraphqlquery'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GET_VIEW_ACCOUNT } from '../../queries/posts'

const { TabPane } = Tabs

const PersonalCard = ({ user }) => {
    return (
        <Card className='personal_card'>
            <div className='css-header' />
            <div>
                <Avatar shape="square" size={80} style={{ borderStyle: 'solid 1px', backgroundColor: 'pink' }} src="https://joeschmoe.io/api/v1/jon" />
                <p><strong>u/{user.username}</strong></p>
            </div>
        </Card>
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

    return (
        <main className="viewAccount">
            <h3><b>View Account</b></h3>
            <Tabs defaultActiveKey='1'>
                <TabPane className='overview_tabpane' tab="Overview" key="1">
                    <div className='post_comment_personal'>
                        <div className='post_comment'>
                            <Overview id={parseInt(id)} posts={query.post} comments={query.comment} user={query.user} />
                        </div>
                        <div className='personal'>
                            <PersonalCard user={query.user} />
                            <Directory />
                        </div>
                    </div>
                </TabPane>
                <TabPane className='posts_tabpane' tab="Posts" key="2">
                    <div className='posts_personal'>
                        <div className='posts'>
                            <PostList item={query.post} user={query.user} />
                        </div>
                        <div className='personal'>
                            <PersonalCard user={query.user} />
                            <Directory />
                        </div>
                    </div>
                </TabPane>
                <TabPane className='comments_tabpane' tab="Comments" key="3">
                    <div className='comments_personal'>
                        <div className='comments'>
                            <CommentList item={query.comment} user={query.user} id={parseInt(id)} />
                        </div>
                        <div className='personal'>
                            <PersonalCard user={query.user} />
                            <Directory />
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </main>
    )
}