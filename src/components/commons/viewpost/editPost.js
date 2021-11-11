import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Typography from 'antd/lib/typography'
import Tooltip from 'antd/lib/tooltip'

import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import UnlockOutlined from '@ant-design/icons/UnlockOutlined'

import { EditPost_OnFinish } from './components/functions'
import ImageUploadingComponent from '../functions/imageuploading'

import { showConfirmDelete, showConfirmLock } from './components/functions'
import moment from 'moment'

const { TextArea } = Input
const { Text } = Typography

const Header = ({ item }) => {
    return (
        <div>
            <Link to={'/viewpost/' + item.community.id}>{item.community.title}</Link>
            {<Text type='secondary'>{' Posted by ' + item.user.username + ' '}</Text>}
            {
                <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                    {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                </Tooltip>
            }
            <br />
            <span>
                <b>{item.title}</b>
            </span>
        </div>
    )
}

const EditPost = ({ post, id, post_type, cookies, isEditable, triggerEditable, deletePostMutation, lockPostMutation, update_post_mutation, localStorage, history }) => {
    const [images, setImages] = useState([])
    const onFinish = (values) => {
        EditPost_OnFinish(post, values, images, update_post_mutation, localStorage)
    }
    const ContentDisplay = ({ post_type }) => {
        switch (post_type) {
            case 'Post':
                return (
                    <div className="viewpost_edit_post">
                        <Form
                            name="edit_post"
                            className="edit-post_post"
                            initialValues={{
                                ["title"]: post.title,
                                ["text"]: post.text
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="text">
                                <TextArea className="textArea" spellCheck="false" allowClear />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            case 'Link':
                return (
                    <div className="viewpost_edit-link">
                        <div className="edit-content-link">
                            <Form
                                name="edit_post"
                                className="edit-post_link"
                                initialValues={{
                                    ["title"]: post.title,
                                    ["link"]: post.text
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item name="title">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="link" extra="Correct Format: www.google.com or google.com | Incorrect Format: https://google.com or http://google.com">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                )
            case 'Image':
                return (
                    <div className="viewpost_edit_image">
                        <div className="current-image">
                            <h2 className='header2'>Current Image</h2>
                            <img className="image" src={post.image} alt="" />
                        </div>
                        <div className="edit-post_image">
                            <h2 className='header2'>Change Current Image</h2>
                            <Form 
                                name="edit_post" 
                                initialValues={{ 
                                    ["title"]: post.title 
                                }}
                                onFinish={onFinish}
                                layout="vertical"
                                className="form"
                            >
                                <Form.Item name="title" className="edit-post_image_title" label="Title">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="image"className="edit-post_image_image">
                                    <ImageUploadingComponent imageState={images} setImageState={setImages}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                )
        }
    }

    return (
        <Card
            title={<Header item={post}/>}
            className="viewpost-editcard"
            actions={
                (cookies.userCookie !== undefined && cookies.userCookie.id === post.author_id) ?
                    [
                        <EditOutlined key="edit" onClick={() => triggerEditable(!isEditable)} />,
                        <DeleteOutlined onClick={() => showConfirmDelete(post, cookies, id, deletePostMutation, localStorage, history)} />,
                        <UnlockOutlined onClick={() => showConfirmLock(post, cookies, id, lockPostMutation, localStorage)}/>
                    ]
                    :
                    null
            }
        >
            <ContentDisplay post_type={post_type} />
        </Card>
    )

}

export default EditPost