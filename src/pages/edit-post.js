import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import ImageUploading from 'react-images-uploading'

import Input from 'antd/lib/input'
import Menu from 'antd/lib/menu'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'

import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone'
import FileImageTwoTone from '@ant-design/icons/FileImageTwoTone'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

const { TextArea } = Input;

export default function EditPost() {
    //https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
    const location = useLocation();
    const [images, setImages] = useState([])
    const [currentMenu, setMenu] = useState('');
    useEffect(() => {
        setMenu(location.state.item.type)
    }, [location])

    const handleClick = (value) => {
        setMenu(value.key)
    }

    const disabledprop = (value) =>{
        if(value == currentMenu) {
            return false
        } else {
            return true
        }
    }

    const maxNumber = 1
    const onChange = (imageList, addUpdateIndex) => {
        //data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList)
    }

    //Component Render for post, post link, or post image
    function renderSwitch(value) {
        switch (value) {
            case 'Post':
                return (
                    <div className="edit-content-post">
                        <TextArea defaultValue={location.state.item.content} spellCheck="false" allowClear />
                        <Button type="primary">Submit</Button>
                    </div>
                )
            case 'Link':
                return (
                    <div className="edit-content-link">
                        <Input placeholder="Website Link" defaultValue={location.state.item.content}/>
                        <Button type="primary">Submit</Button>
                    </div>
                )
            case 'Image':
                return (
                    <div className="edit-content-picture">
                        <div className="current-image" style={{border: "2px solid grey"}}>
                            <h2 style={{textAlign:"center"}}>Current Image</h2>
                            <img className="image" src={location.state.item.content} alt="" style={{display:"block", margin:"0 auto"}}/>
                        </div>
                        &nbsp;
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
                                        <div key={index} className="image-item">
                                            <img className="image" src={image['data_url']} alt="" style={{display:"block", margin:"0 auto", border:"2px solid grey"}}/>
                                            <div className="image-item__btn-wrapper">
                                                <Button icon={<EditTwoTone />} onClick={() => onImageUpdate(index)}>Update</Button>
                                                <Button icon={<DeleteTwoTone />} onClick={() => onImageRemove(index)}>Remove</Button>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                )
        }
    }
    return (
        <main className="editpost">
            <Card title="Edit Post">
                <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal" theme='dark'>
                    <Menu.Item key="Post" disabled={disabledprop("Post")} icon={<FileTextTwoTone />}>
                        Post
                    </Menu.Item>
                    <Menu.Item key="Image" disabled={disabledprop("Image")} icon={<FileImageTwoTone />}>
                        Image
                    </Menu.Item>
                    <Menu.Item key="Link" disabled={disabledprop("Link")} icon={<LinkOutlined />}>
                        Link
                    </Menu.Item>
                </Menu>
                {renderSwitch(currentMenu)}
            </Card>
        </main>
    )
}