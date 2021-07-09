import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import ImageUploading from 'react-images-uploading'

import Input from 'antd/lib/input'
import Menu from 'antd/lib/menu'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Message from 'antd/lib/message'
import Dropdown from 'antd/lib/dropdown'

import UploadOutlined from '@ant-design/icons/UploadOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone'

import { useCookies } from 'react-cookie'

import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'
import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { UPDATE_POST_QUERY , GET_POSTS_BY_AUTHOR_ID_QUERY } from '../queries/posts'

const { TextArea } = Input;

export default function EditPost() {
    const [ cookies ] = useCookies(['userCookie'])
    const [ currentPost, setPost ] = useState({})
    const [ images, setImages ] = useState([])
    const [mutation] = useMutation(UPDATE_POST_QUERY)
    let { id }  = useParams()

    //If user is logged in in return query, else return null
    let PostsByAuthor = (cookies.userCookie != undefined) ? GetGraphqlQueryID(cookies.userCookie.user.id, GET_POSTS_BY_AUTHOR_ID_QUERY) : null

    //Sets Post passed by params
    useEffect(() => {
        if(PostsByAuthor != 'loading' && PostsByAuthor != null) {
            let passedPost = PostsByAuthor.post.find(post => post.id === id)
            if(passedPost != undefined) {
                setPost(passedPost)
            }  
            if(passedPost == undefined && id != undefined){//If page is passed an id with an unauthorized account
                Message.warning({
                    content: 'This post is unavailable',
                    style: {
                        marginTop: '5vh',
                    }
                },10)
            }  
        }
    }, [PostsByAuthor])

    const maxNumber = 1
    const onChange = (imageList) => {
        //data for submit
        setImages(imageList)
    }

    async function onFinish(values) {
        let post
        if(values.title === '') {
            Message.warning({
                content: 'Please enter a title',
                style: {
                    marginTop: '5vh',
                }
            },10)
            return null
        }
        if (currentPost.type ==="Image" && (values.image === undefined || values.image.length === 0))
        {
            Message.warning({
                content: 'Please input an image',
                style: {
                    marginTop: '5vh',
                }
            },10)
            return null
        }
        switch (currentPost.type) {
            case 'Post':
                post = {
                    id: parseInt(currentPost.id),
                    title: values.title,
                    image: null,
                    text: values.text
                }
                try {
                    const mutate = await mutation({
                        variables: {
                            post
                        }
                    })

                    Message.success({
                        content: 'You have successfully updated ' + currentPost.title,
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                } catch (error) {
                    console.log(error)

                    Message.error({
                        content: 'An error has occurred. ',
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                }
                break
            case 'Image':
                post = {
                    id: parseInt(currentPost.id),
                    title: values.title,
                    image: images[0]['data_url'],
                    text: null
                }
                try {
                    const mutate = await mutation({
                        variables: {
                            post
                        }
                    })
                    
                    const updatedValue = {}
                    updatedValue.image = images[0]['data_url']
                    setPost({
                        ...currentPost,
                        ...updatedValue
                    })

                    Message.success({
                        content: 'You have successfully updated ' + currentPost.title,
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                } catch (error) {
                    console.log(error)

                    Message.error({
                        content: 'An error has occurred. ',
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                }
                break
            case 'Link':
                post = {
                    id: parseInt(currentPost.id),
                    title: values.title,
                    image: null,
                    text: values.text
                }
                try {
                    const mutate = await mutation({
                        variables: {
                            post
                        }
                    })

                    Message.success({
                        content: 'You have successfully updated ' + currentPost.title,
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                } catch (error) {
                    console.log(error)

                    Message.error({
                        content: 'An error has occurred. ',
                        style: {
                            marginTop: '5vh',
                        }
                    },10)
                }
                break
        }
    }

    //Produces a list of Menu Items from passed query
    const PostMap = (data) => {
        if (data.post == undefined) {
            return (
                <Menu.Item key="0" disabled="true">
                    You must create a post in order to edit.
                </Menu.Item>
            )
        }
        return data.post.map((item, index) => {
            return (
                <Menu.Item key={index} onClick={() => {
                    setPost(item)
                }} value={item.title}>
                    {item.title}
                </Menu.Item>
            )
        })
    }

    //Component Render for post, post link, or post image
    function renderSwitch(postType) {
        switch (postType) {
            case 'Post':
                return (
                    <div className="edit-content-post">
                        <Form name="edit_post" className="edit-post_post" key={currentPost.id} initialValues={{ ["title"]:currentPost.title, ["text"]: currentPost.text }} onFinish={onFinish}>
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="text">
                                <TextArea spellCheck="false" allowClear />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            case 'Link':
                return (
                    <div className="edit-content-link">
                        <Form name="edit_post" className="edit-post_post" key={currentPost.id} initialValues={{ ["title"]:currentPost.title, ["text"]: currentPost.text }} onFinish={onFinish}>
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="text">
                                <Input placeholder="Website Link"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            case 'Image':
                return (
                    <div className="edit-content-picture">
                        <div className="current-image" style={{ border: "2px solid grey" }}>
                            <h2 style={{ textAlign: "center" }}>Current Image</h2>
                            <img className="image" src={currentPost.image} alt="" style={{ display: "block", margin: "0 auto", maxWidth:"90%" }} />
                        </div>
                        &nbsp;
                        <hr style={{ display:'block', height: '1px', border:'0', borderTop: '1px solid #ccc', margin: '1em 0', padding: '0' }} />
                        <h2 style={{ textAlign: "center" }}>New Image</h2>
                        <Form name="edit_post" className="edit-post_image" key={currentPost.id} initialValues={{ ["title"]:currentPost.title}} onFinish={onFinish}>
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="image">
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
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
                                                <div key={index} className="image-item" style={{marginTop: '10px'}}>
                                                    <img className="image" src={image['data_url']} alt="" style={{ display: "block", margin: "0 auto", border: "2px solid grey", maxWidth:"90%"}} />
                                                    <div className="image-item__btn-wrapper" style={{marginTop: '10px'}}>
                                                        <Button icon={<EditTwoTone />} onClick={() => onImageUpdate(index)}>Update</Button>
                                                        <Button icon={<DeleteTwoTone />} onClick={() => onImageRemove(index)}>Remove</Button>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                        </div>
                                    )}
                                </ImageUploading>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
                default: 
                    return (
                        <div style={{textAlign:'center'}}>
                            Please select a post to edit above.
                        </div>
                    )
        }
    }
    //Serves different content depending on if user cookie is available
    if (cookies.userCookie == undefined) {
        return(
            <main className="editpost">
                <h3>Edit Post</h3>
                <LoginOrRegister />
            </main>
        ) 
    } else {
        return (
            <main className="editpost">
                <Card title={"Edit Post: " + id}>
                    <Dropdown.Button overlay={
                        <Menu>
                            { PostMap(PostsByAuthor) }
                        </Menu>
                    }>
                        <strong> {"Posts that you created: " + (currentPost.title == undefined ? "None Selected" : currentPost.title)} </strong>
                    </Dropdown.Button>
                    {renderSwitch(currentPost.type)}
                </Card>
            </main>
        )
    }
}
