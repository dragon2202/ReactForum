import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Message from'antd/lib/message'

import ImageUploadingComponent from '../functions/imageuploading'

import { CREATE_POST, GET_POST_RECENT_BY_AUTHOR_ID } from '../../../queries/posts'

const { TextArea } = Input;

const FormSubmit = ({ community }) => {
    if(community === '') {
        return (
            <Button disabled>
                Submit
            </Button>
        )
    }
    return (
        <Button type="primary" htmlType="submit">Submit</Button>
    )
}

async function onFinish(values, type, community, author_id, images, createPost, getPostRecentByAuthorID) {
    let post
    if((type === 'Post' || type === 'Link') && (!values.title || !values.text)){
        Message.warning({
            content: 'Please fill out both title and description ',
            style: {
                marginTop: '5vh',
            },
        }, 10)
        return
    } else if((type === 'Image') && (!values.title || images.length === 0)){
        Message.warning({
            content: "Please input both a title and an image ",
            style: {
                marginTop: '5vh',
            },
        },10)
        return
    }
    switch (type) {
        case 'Post':
            post = {
                author_id: author_id,
                title: values.title,
                type: type,
                image: null,
                text: values.text,
                active: 1,
                community_id: community.id
            }
            await createPost({ variables: { post } })
            getPostRecentByAuthorID({ variables: { id: author_id } })
            break
        case 'Link':
            post = {
                author_id: author_id,
                title: values.title,
                type: type,
                image: null,
                text: values.text,
                active: 1,
                community_id: community.id
            }
            await createPost({ variables: { post } })
            getPostRecentByAuthorID({ variables: { id: author_id } })
            break
        case 'Image':
            post = {
                author_id: author_id,
                title: values.title,
                type: type,
                image: images[0]['data_url'],
                text: null,
                active: 1,
                community_id: community.id
            }
            await createPost({ variables: { post } })
            getPostRecentByAuthorID({ variables: { id: author_id } })
            break
    }
}

const CreatePostForm = ({ type, community, author_id }) => {
    let history = useHistory()
    const [images, setImages] = useState([])
    const [createPost] = useMutation(CREATE_POST)
    const [getPostRecentByAuthorID] = useLazyQuery(GET_POST_RECENT_BY_AUTHOR_ID, {
        onCompleted: data => {
            Message.success({
                content: 'You have successfully posted',
                style: {
                    marginTop: '5vh',
                },
            },15)
            history.push("/viewpost/" + data.post.id)
        },
        fetchPolicy: 'network-only'
    })

    switch (type) {
        case 'Post':
            return (
                <Form className='createpost_post' onFinish={(values) => onFinish(values, type, community, author_id, images, createPost, getPostRecentByAuthorID)}>
                    <Form.Item name='title'>
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item name="text">
                        <TextArea className='post_textarea' allowClear placeholder="Text" />
                    </Form.Item>
                    <Form.Item>
                        <FormSubmit community={community}/>
                    </Form.Item>
                </Form>
            )
        case 'Image':
            return (
                <Form className="create-post_image" onFinish={(values) => onFinish(values, type, community, author_id, images, createPost, getPostRecentByAuthorID)}>
                    <Form.Item name="title">
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="image" className="image">
                        <ImageUploadingComponent imageState={images} setImageState={setImages} />
                    </Form.Item>
                    <Form.Item>
                        <FormSubmit community={community}/>
                    </Form.Item>
                </Form>
            )
        case 'Link':
            return (
                <Form className="create-post_link" onFinish={(values) => onFinish(values, type, community, author_id, images, createPost, getPostRecentByAuthorID)}>
                    <Form.Item name="title">
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="text" extra="Correct Format: www.google.com or google.com | Incorrect Format: https://google.com or http://google.com">
                        <Input placeholder="Link"/>
                    </Form.Item>
                    <Form.Item>
                        <FormSubmit community={community}/>
                    </Form.Item>
                </Form>
            )
    }
}

export default CreatePostForm