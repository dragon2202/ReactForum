import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'

import Button from 'antd/lib/button'

import UploadOutlined from '@ant-design/icons/UploadOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone'

const ImageUploadingComponent = ({ imageState, setImageState }) => {
    return (
        <ImageUploading
            multiple
            value={imageState}
            onChange={(imageList) => setImageState(imageList)}
            maxNumber={1}
            dataURLKey="data_url"
            className="ImageUploading"
        >
            {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
            }) => (
                // write your building UI
                <div className="upload_image-wrapper">
                    <Button className="uploadButton" icon={<UploadOutlined />} onClick={onImageUpload} >
                        Upload Image
                    </Button>
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <div className="image-item__btn-wrapper">
                                <Button className="update" icon={<EditTwoTone />} onClick={() => onImageUpdate(index)}>Update</Button>
                                <Button className="remove" icon={<DeleteTwoTone />} onClick={() => onImageRemove(index)}>Remove</Button>
                            </div>
                            <img className="preview-image" src={image['data_url']} alt="" />
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    )

}


export default ImageUploadingComponent