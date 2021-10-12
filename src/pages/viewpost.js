import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { useHistory, Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

import ShowPost from '../components/commons/viewpost/showPost'
import EditPost from '../components/commons/viewpost/editPost'

import Comments from '../components/commons/viewpost/viewpost-comments/comments'
import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { reloadMessage } from '../components/commons/viewpost/components/reloadMessage'
import { comment_onFinish } from '../components/commons/viewpost/components/functions'
import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_POST_COMMENTS_QUERY, CREATE_COMMENT_QUERY, DELETE_POST_QUERY, LOCK_POST_QUERY, UPDATE_POST_QUERY } from '../queries/posts'
import { useCookies } from 'react-cookie'

const { TextArea } = Input

export default function ViewPost() {
    let history = useHistory()
    let { id } = useParams()
    let query = GetGraphqlQueryID(id, GET_POST_COMMENTS_QUERY)
    const [value, setValue] = useState('')
    const [editPostToggle, setEditPostToggle] = useState(false)
    const [createCommentMutation] = useMutation(CREATE_COMMENT_QUERY)
    const [deletePostMutation] = useMutation(DELETE_POST_QUERY)
    const [lockPostMutation] = useMutation(LOCK_POST_QUERY)
    const [update_post_mutation] = useMutation(UPDATE_POST_QUERY)
    const [cookies] = useCookies(['userCookie'])
    const localStorage = window.localStorage;

    //use effect to display messages after window reload
    useEffect(() => {
        if (localStorage.getItem('reload') != null) {
            reloadMessage(localStorage)
            localStorage.clear()
        }
    }, [])

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="viewpost">
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    const PostEditable = ({ toggle }) => {
        if (toggle) {// Not Editable
            return (
                <EditPost
                    post={query.postcomment}
                    id={id}
                    post_type={query.postcomment.type}
                    cookies={cookies}
                    isEditable={editPostToggle}
                    triggerEditable={setEditPostToggle}
                    deletePostMutation={deletePostMutation}
                    lockPostMutation={lockPostMutation}
                    update_post_mutation={update_post_mutation}
                    localStorage={localStorage}
                    history={history}
                />
            )
        } else {
            return (
                <ShowPost
                    post={query.postcomment}
                    id={id}
                    cookies={cookies}
                    isEditable={editPostToggle}
                    triggerEditable={setEditPostToggle}
                    deletePostMutation={deletePostMutation}
                    lockPostMutation={lockPostMutation}
                    localStorage={localStorage}
                    history={history}
                />
            )
        }
    }

    return (
        <main className="viewpost">
            <PostEditable toggle={editPostToggle} />
            <div className={"CommentDisplay"} style={{ marginTop: "10px" }}>
                <Card style={{ marginTop: "10px" }} title={`${query.postcomment.comment.length} ${query.postcomment.comment.length > 1 ? 'comments' : 'comment'}`}>
                    {(cookies.userCookie !== undefined ?
                        <Card className={"CommentForm"}>
                            <Form key={0}>
                                <Form.Item >
                                    <TextArea className="editor" rows={4} onChange={(e) => setValue(e.target.value)} />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary" onClick={() => comment_onFinish(localStorage, id, cookies, value, createCommentMutation)}>
                                        Add Comment
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                        :
                        <LoginOrRegister />
                    )}
                    <Comments commentsObj={query.postcomment.comment}/>
                </Card>
            </div>
        </main>
    )
}
