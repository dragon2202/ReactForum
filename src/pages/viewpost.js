import React, { useState } from 'react'
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
import Directory from '../components/commons/navigation/directory'
import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'

import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { comment_onFinish } from '../components/commons/viewpost/components/functions'
import { GetGraphqlQueryID_Refetch } from '../components/commons/functions/getgraphqlquery'
import { GET_POST_COMMENTS, CREATE_COMMENT, DELETE_POST, LOCK_POST, UPDATE_POST } from '../queries/posts'
import { useCookies } from 'react-cookie'

const { TextArea } = Input

export default function ViewPost() {
    let history = useHistory()
    let { id } = useParams()
    const [commentForm] = Form.useForm()
    let [query, refetch] = GetGraphqlQueryID_Refetch(id, GET_POST_COMMENTS)
    const [value, setValue] = useState('')
    const [editPostToggle, setEditPostToggle] = useState(false)
    const [createCommentMutation] = useMutation(CREATE_COMMENT)
    const [deletePostMutation] = useMutation(DELETE_POST)
    const [lockPostMutation] = useMutation(LOCK_POST)
    const [update_post_mutation] = useMutation(UPDATE_POST)
    const [cookies] = useCookies(['userCookie'])

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="viewpost">
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>No Post Found.</p>
            </main>
        )
    }

    const PostEditable = ({ toggle }) => {
        if (toggle) {// Not Editable
            return (
                <EditPost
                    post={query.post}
                    id={id}
                    post_type={query.post.type}
                    cookies={cookies}
                    isEditable={editPostToggle}
                    triggerEditable={setEditPostToggle}
                    deletePostMutation={deletePostMutation}
                    lockPostMutation={lockPostMutation}
                    update_post_mutation={update_post_mutation}
                    refetch={refetch}
                    history={history}
                />
            )
        } else {
            return (
                <ShowPost
                    post={query.post}
                    id={id}
                    cookies={cookies}
                    isEditable={editPostToggle}
                    triggerEditable={setEditPostToggle}
                    deletePostMutation={deletePostMutation}
                    lockPostMutation={lockPostMutation}
                    refetch={refetch}
                />
            )
        }
    }

    return (
        <main className="viewpost">
            <h3><b>{(!editPostToggle) ? 'View Post' : 'Edit Post'}</b></h3>
            <div className='Post_Comment_Community'>
                <div className='Post_Comment'>
                    <PostEditable toggle={editPostToggle} />
                    <div className="CommentDisplay">
                        <Card title={`${query.post.comment.length} ${query.post.comment.length > 1 ? 'comments' : 'comment'}`}>
                            {(cookies.userCookie !== undefined) ?
                                (query.post.active === 1) ?
                                    <Card className={"CommentForm"}>
                                        <Form key={0} form={commentForm}>
                                            <Form.Item >
                                                <TextArea className="editor" rows={4} onChange={(e) => setValue(e.target.value)} value={value}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" type="primary" onClick={() => comment_onFinish(refetch, id, cookies, value, setValue, createCommentMutation, commentForm)}>
                                                    Add Comment
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                :
                                <Card className={"CommentForm"}>
                                    Post has been locked. Comments cannot be created, and edited at this time.
                                </Card>
                                :
                                <LoginOrRegister />
                            }
                            <Comments commentsObj={query.post.comment} refetch={refetch} active={query.post.active}/>
                        </Card>
                    </div>
                </div>
                <div className='community_directory'>
                    <Card>
                        <div className='title'><a onClick={() => {window.location.href="/community/" + query.post.community.id}}>{query.post.community.title}</a></div>
                        {query.post.community.summary}
                    </Card>
                    <Directory />
                </div>
            </div>

        </main>
    )
}


//add community card
// Revamp viewpost communityhome
