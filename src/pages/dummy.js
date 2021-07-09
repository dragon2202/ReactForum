import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Comment from 'antd/lib/comment'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import List from 'antd/lib/list'
import Input from 'antd/lib/input'
import Message from 'antd/lib/message'

import { useCookies } from 'react-cookie'

import moment from 'moment'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_POST_COMMENTS_QUERY, CREATE_COMMENT_QUERY } from '../queries/posts'

const { TextArea } = Input

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment actions={[<span key="comment-nested-reply-to">{JSON.stringify(comments[1])}</span>]} {...props}> <Editor /></Comment>}
    />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <Form>
        <Form.Item>
            <TextArea className="editor" rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </Form>
)

const PostComment = (data) => {
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
                <a href={"" + `${item.text}`}>{item.text}</a>
            )

    }
}

export default function ViewPost() {
    let { id } = useParams()
    let queryComments = []
    const [comments, setComments] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    let query = GetGraphqlQueryID(id, GET_POST_COMMENTS_QUERY)
    const [cookies] = useCookies(['userCookie'])

    const [mutation] = useMutation(CREATE_COMMENT_QUERY)

    useEffect(() => {
        if (query != 'loading') {
            if (query.postcomment.comment) {
                query.postcomment.comment.forEach(element => {
                    queryComments.push({
                        author: element.user.username,
                        content: element.comment,
                        datetime: moment(parseInt(element.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')
                    })
                });
                setComments([...comments, ...queryComments])
            }
        }
    }, [query])

    async function handleSubmit(text) {
        setSubmitting(true)
        const comment = {
            post_id: parseInt(id),
            author_id: cookies.userCookie.user.id,
            comment: text
        }

        const mutate = await mutation(
            {
                variables: {
                    comment
                }
            }
        )

        setTimeout(() => {
            setSubmitting(false)
            setComments([...comments,
            {
                author: cookies.userCookie.user.username,
                content: text,
                datetime: moment(parseInt(Date.now())).format('dddd, MMMM Do YYYY, h:mm:ss a')
            }])
            setValue('')
            Message.success({
                content: 'You have successfully commented',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
        }, 1000)
    }

    const handleChange = (text) => {
        setValue(text.target.value)
    }

    const handleSubmit2 = (text) => {
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setComments([...comments,
            {
                author: cookies.userCookie.user.username,
                content: text,
                datetime: moment(parseInt(Date.now())).format('dddd, MMMM Do YYYY, h:mm:ss a')
            }])
            setValue('')
            Message.success({
                content: 'You have successfully commented',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
        }, 1000)
    }

    if (cookies.userCookie == undefined) {
        return (
            <main className="viewpost">
                {PostComment(query.postcomment)}
                <Comment content={
                    <Editor onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit2(value)} submitting={submitting} value={value} />
                } />
                {console.log(query)}
                {comments.length > 0 && <CommentList comments={comments} />}
            </main>
        )

    } else {
        return (
            <main className="viewpost">
                {PostComment(query.postcomment)}
                <Comment content={
                    <Editor key={"original"} onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit2(value)} submitting={submitting} value={value} />
                } />
                {comments.length > 0 && <CommentList comments={comments} />}
            </main>
        )
    }
}