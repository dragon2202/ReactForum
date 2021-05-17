import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ImageUploading from 'react-images-uploading'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import Input from 'antd/lib/input'
import Menu from 'antd/lib/menu'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Dropdown from 'antd/lib/dropdown'
import Message from 'antd/lib/message'

import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone'
import FileImageTwoTone from '@ant-design/icons/FileImageTwoTone'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { CREATE_POST_QUERY, GET_COMMUNITYUSERROLE_QUERY } from '../queries/posts'

import { useCookies } from 'react-cookie'

const { TextArea } = Input;

export default function CreatePost() {
    const [cookies] = useCookies(['userCookie'])
    //https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
    const location = useLocation()
    const [ currentMenu, setMenu ] = useState('Post')
    const [ community, setCommunity ] = useState('None')
    const [ communityID, setCommunityID ] = useState('')

    useEffect(() => {
        if (location.state) {//if not undefined
            setMenu(location.state.item)
        }
    }, [location])

    const handleClick = (value) => {
        setMenu(value.key)
    }

    const [images, setImages] = useState([])
    const maxNumber = 1
    const onChange = (imageList) => {
        //data for submit
        setImages(imageList)
    }

    function imageSubmit() {
        console.log(images[0]['data_url'])
    }

    const [formValue, setFormValues] = useState("")
    function formChange(event) {
        setFormValues(event.target.value)
    }

    const [mutation] = useMutation(CREATE_POST_QUERY)

    function onFinish(values) {
        console.log(images)
        switch (currentMenu) {
            case 'Post':
                const post = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
            case 'Link':
                const link = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: null,
                    text: values.text,
                    active: 1,
                    community_id: communityID
                }
            case 'Image':
                const image = {
                    author_id: cookies.userCookie.user.id,
                    title: values.title,
                    type: currentMenu,
                    image: images,
                    text: null,
                    active: 1,
                    community_id: communityID
                }
        }
        /*
            console.log(values)
            console.log(currentMenu)
            console.log(community)
            console.log(communityID)
            console.log(cookies.userCookie.user.id)
            disable submit in someway if community is not selected
        */
    }
    /* 
    async function onFinish() {
        const post = {
            author_id: 1,
            title: 'Post Title',
            type: 'Post',
            image: null,
            text: "Random Text,
            active: 1,
            community_id: 1
        }
        try {
            const mutate = await mutation(
                {
                    variables: {
                        post
                    }
                }
            )
            console.log(mutate)
        } catch (error) {
            console.log(error)
        }
    }
    */

    const CommunityMap = (data) => {
        if (data.communityuserrole == undefined || data.communityuserrole.length == 0) {
            return (
                <Menu.Item key="0" disabled="true">
                    Join a Community to Post
                </Menu.Item>
            )
        }
        return data.communityuserrole.map((item, index) => {
            return (
                <Menu.Item key={index} onClick={() => {
                    setCommunityID(item.community.id)
                    setCommunity(item.community.title)
                }} value={item.community.title}>
                    {item.community.title}
                </Menu.Item>
            )
        })
    }

    function renderSwitch(value) {
        switch (value) {
            case 'Post':
                return (
                    <div className="create-content-post">
                        <Form name="create_post" className="create-post_post" onFinish={onFinish}>
                            <Form.Item name="title" >
                                <Input placeholder="Title of Post" />
                            </Form.Item>
                            <Form.Item name="text">
                                <TextArea allowClear />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            case 'Link':
                return (
                    <div className="create-content-link">
                        <Form name="create_post" className="create-post_link" onFinish={onFinish} >
                            <Form.Item name="title">
                                <Input placeholder="Title of Post" />
                            </Form.Item>
                            <Form.Item name="text">
                                <Input placeholder="Link to Website" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={() => onFinish()}>Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            case 'Image':
                return (
                    <div className="create-content-image">
                        <Form name="create_post" className="create-post_image" onFinish={onFinish} >
                            <Form.Item name="title">
                                <Input placeholder="Title of Post" />
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
                                                        <Button type="primary" htmlType="submit">Submit</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </Form.Item>
                        </Form>
                    </div>
                )
        }
    }

    if (cookies.userCookie == undefined) {
        return (
            <main className="createpost">
                <Card title="Create Post" >
                    <div style={{ textAlign: 'center' }}>
                        <p>You need an account that belongs to a community to post</p>
                        <Link to={"/login"}>Login Page</Link>
                        <br />
                        <Link to={"/register"}>Register Page</Link>
                    </div>
                </Card>
            </main>
        )
    } else {
        return (
            <main className="createpost">
                <Card title="Create Post">
                    <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal" theme='dark'>
                        <Menu.Item key="Post" icon={<FileTextTwoTone />}>
                            Post
                    </Menu.Item>
                        <Menu.Item key="Image" icon={<FileImageTwoTone />}>
                            Image
                    </Menu.Item>
                        <Menu.Item key="Link" icon={<LinkOutlined />}>
                            Link
                    </Menu.Item>
                    </Menu>
                    <Dropdown.Button overlay={
                        <Menu>
                            {
                                cookies.userCookie == undefined || null ? (
                                    <Menu.Item key="0" disabled="true">
                                        Log in to post to a community
                                    </Menu.Item>
                                ) : (
                                    CommunityMap(GetGraphqlQueryID(cookies.userCookie.user.id, GET_COMMUNITYUSERROLE_QUERY))
                                )
                            }
                        </Menu>
                    }>
                        {"Post to Community: " + community}
                    </Dropdown.Button>
                    {renderSwitch(currentMenu)}
                </Card>
            </main>
        )
    }
}