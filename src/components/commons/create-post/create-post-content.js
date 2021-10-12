import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import Message from 'antd/lib/message'

import ImageUploadingComponent from '../functions/imageuploading'

import { CREATE_POST_QUERY } from '../../../queries/posts'

const { TextArea } = Input;
//Serves Form for Create Post Content
const CreatePostContent = ({ content, cookies, currentMenu, communityID, community }) => {
    let history = useHistory()
    const [ form ] = Form.useForm() 
    const [images, setImages] = useState([])

    const [mutation] = useMutation(CREATE_POST_QUERY)

    async function onFinish(values) {
        let post
        switch (currentMenu) {
            case 'Post':
                if(!values.title || !values.text){
                    Message.warning({
                        content: 'Please fill out both title and description',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                    break
                }
                post = {
                    author_id: cookies.userCookie.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
                try {
                    await mutation({
                        variables: {
                                post
                        }
                    })

                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },15)

                    history.push("/community/" + communityID)
                } catch (error) {
                    console.log(error)
                }
                break
            case 'Link':
                if(!values.title || !values.text){
                    Message.warning({
                        content: 'Please fill out both title and description',
                        style: {
                            marginTop: '5vh',
                        },
                    },15)
                    break
                }
                post = {
                    author_id: cookies.userCookie.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
                try {
                    await mutation({
                        variables: {
                                post
                        }
                    })

                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },15)

                    history.push("/community/" + communityID)
                } catch (error) {
                    console.log(error)
                }
                break
            case 'Image':
                if(!values.title || images.length === 0){
                    Message.warning({
                        content: "Please input both a title and an image",
                        style: {
                            marginTop: '5vh',
                        },
                    },10)
                    break
                }
                post = {
                    author_id: cookies.userCookie.id,
                    title: values.title,
                    type: currentMenu,
                    image: images[0]['data_url'],
                    text: null,
                    active: 1,
                    community_id: communityID
                }
                try {
                    await mutation({
                        variables: {
                                post
                        }
                    })
                    
                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },10)

                    history.push("/community/" + communityID)
                } catch (error) {
                    console.log(error)
                }
                break
        }
    }

    switch (content) {
        case 'Post':
            return (
                <div className="create-content-post">
                    <Form form={form} name="create_post" className="create-post_post" onFinish={onFinish}>
                        <Form.Item name="title" >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="text">
                            <TextArea allowClear placeholder="Description"/>
                        </Form.Item>
                        <Form.Item>
                            {
                                community != '' ? (
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                ) : (
                                    <Button type="primary" disabled>Submit</Button>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            )
        case 'Link':
            return (
                <div className="create-content-link">
                    <Form form={form} name="create_post" className="create-post_link" onFinish={onFinish} >
                        <Form.Item name="title">
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="text" extra="Correct Format: www.google.com or google.com | Incorrect Format: https://google.com or http://google.com">
                            <Input placeholder="Link" />
                        </Form.Item>
                        <Form.Item>
                            {
                                community != '' ? (
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                ) : (
                                    <Button type="primary" disabled>Submit</Button>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            )
        case 'Image':
            return (
                <div className="create-content-image">
                    <Form name="create_post" className="create-post_image" className="form" onFinish={onFinish} >
                        <Form.Item name="title">
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="image">
                            <ImageUploadingComponent imageState={images} setImageState={setImages}/>
                        </Form.Item>
                        <Form.Item>
                            {
                                community != '' ? (
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                ) : (
                                    <Button type="primary" disabled>Submit</Button>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            )
    }
}

export default CreatePostContent