import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import ImageUploading from 'react-images-uploading'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import Message from 'antd/lib/message'

import UploadOutlined from '@ant-design/icons/UploadOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone'

import { CREATE_POST_QUERY } from '../../../queries/posts'

const { TextArea } = Input;
//Serves Form for Create Post Content
const CreatePostContent = ({ content, cookies, currentMenu, communityID, community }) => {
    const [ form ] = Form.useForm() 
    const [images, setImages] = useState([])
    const maxNumber = 1
    const onChange = (imageList) => {
        //data for submit
        setImages(imageList)
    }

    const [formValue, setFormValues] = useState("")
    function formChange(event) {
        setFormValues(event.target.value)
    }

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
                    },10)
                    break
                }
                post = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
                try {
                    const mutate = await mutation(
                        {
                            variables: {
                                post
                            }
                        }
                    )
                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },10)
                    form.resetFields()
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
                    },10)
                    break
                }
                post = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
                try {
                    const mutate = await mutation(
                        {
                            variables: {
                                post
                            }
                        }
                    )
                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },10)
                    form.resetFields()
                } catch (error) {
                    console.log(error)
                }
                break
            case 'Image':
                if(!values.title || !values.image || values.image.length == 0){
                    Message.warning({
                        content: 'Please fill out both title and insert image',
                        style: {
                            marginTop: '5vh',
                        },
                    },10)
                    break
                }
                post = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: images[0]['data_url'],
                    text: null,
                    active: 1,
                    community_id: communityID
                }
                try {
                    const mutate = await mutation(
                        {
                            variables: {
                                post
                            }
                        }
                    )
                    Message.success({
                        content: 'You have successfully posted',
                        style: {
                            marginTop: '5vh',
                        },
                    },10)
                    form.resetFields()
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
                            <Input placeholder="Post Title" />
                        </Form.Item>
                        <Form.Item name="text">
                            <TextArea allowClear placeholder="Post Description"/>
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
                            <Input placeholder="Post Title" />
                        </Form.Item>
                        <Form.Item name="text">
                            <Input placeholder="Post Link" />
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
                    <Form form={form} name="create_post" className="create-post_image" onFinish={onFinish} >
                        <Form.Item name="title">
                            <Input placeholder="Post Title" />
                        </Form.Item>
                        <Form.Item name="image">
                            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url" >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                }) => (
                                    // write your building UI
                                    <div className="upload_image-wrapper">
                                        <Button className="upload" icon={<UploadOutlined />} onClick={onImageUpload} >
                                            Upload Image
                                        </Button>
                                        &nbsp;
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img className="image" src={image['data_url']} alt="" style={{ display: "block", margin: "0 auto", border: "2px solid grey", maxWidth: "100%" }} />
                                                <div className="image-item__btn-wrapper">
                                                    <Button icon={<EditTwoTone />} onClick={() => onImageUpdate(index)}>Update</Button>
                                                    <Button icon={<DeleteTwoTone />} onClick={() => onImageRemove(index)}>Remove</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
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