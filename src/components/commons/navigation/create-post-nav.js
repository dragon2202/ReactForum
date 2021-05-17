import React from 'react'
import { useHistory } from 'react-router-dom'

import Input from 'antd/lib/input'
import Menu from 'antd/lib/menu'
import PictureTwoTone from '@ant-design/icons/PictureTwoTone'
import LinkOutlined from '@ant-design/icons/LinkOutlined'


export default function CreatePostNav() {
    let history = useHistory()
    const createpost = (item) => history.push({
        pathname: '/createpost',
        state: {
            item
        }
    })
    return (
        <div className="create-post-nav">
            <Menu mode="horizontal">
                <Menu.Item key="Post" onClick={() => {createpost("Post")}} className="MenuItemPost" icon={<Input placeholder="Create Post"/>}  />
                <Menu.Item key="Image" onClick={() => {createpost("Image")}} className="MenuItemImage" icon={<PictureTwoTone style={{ fontSize: '1.5em'}} />}/>
                <Menu.Item key="Link" onClick={() => {createpost("Link")}} className="MenuItemLink" icon={<LinkOutlined style={{ fontSize: '1.5em'}}/>} />
            </Menu>
        </div>
    )
}