import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'

import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Empty from 'antd/lib/empty'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

import Comments from '../components/commons/viewpost-comments/comments'
import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_POST_COMMENTS_QUERY, CREATE_COMMENT_QUERY } from '../queries/posts'
import { useCookies } from 'react-cookie'

const { TextArea } = Input

const PostContent = (data) => {
    if (data == undefined) {
        return (
            <Card key='0' >
                <Empty />
            </Card>
        )
    }
    return (
        <Card title={data.title} className="viewpost-card">
            {contentSwitch(data)}
        </Card>
    )
}

function contentSwitch(item) {
    switch (item.type) {
        case "Image":
            return (
                <img alt="" src={item.image} style={{ maxHeight: "60vh", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            )
        case "Post":
            return (
                <p>{item.text}</p>
            )
        case "Link":
            return (
                <a href={"http://" + `${item.text}`}>{item.text}</a>
            )

    }
}


export default function ViewPost() {
    let { id } = useParams()
    let query = GetGraphqlQueryID(id, GET_POST_COMMENTS_QUERY)
    const [value, setValue] = useState('')
    const [mutation] = useMutation(CREATE_COMMENT_QUERY)
    const [cookies] = useCookies(['userCookie'])

    const handleChange = (text) => {
        setValue(text.target.value)
    }
    async function handleSubmit() {
        const comment = {
            post_id: parseInt(id),
            author_id: cookies.userCookie.user.id,
            parent_comment_id: null,
            comment: value
        }
        const mutate = await mutation(
            {
                variables: {
                    comment
                }
            }
        )
        window.location.reload()
    }
    return (
        <main className="viewpost">
            {PostContent(query.postcomment)}
            {query.postcomment == undefined ?
                <Card>
                    <Empty />
                </Card>
                :
                <div className={"CommentDisplay"} style={{ marginTop: "10px" }}>
                    <Card style={{ marginTop: "10px" }} title={`${query.postcomment.comment.length} ${query.postcomment.comment.length > 1 ? 'comments' : 'comment'}`}>
                        {(cookies.userCookie != undefined ?
                            <Card className={"CommentForm"}>
                                <Form key={0}>
                                    <Form.Item >
                                        <TextArea className="editor" rows={4} onChange={(e) => handleChange(e)} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary" onClick={handleSubmit}>
                                            Add Comment
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                            :
                            <LoginOrRegister />
                        )}
                        <Comments commentsObj={query.postcomment.comment}>
                        </Comments>
                    </Card>
                </div>
            }
        </main>
    )
}
