import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Modal from 'antd/lib/modal'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

//Addition Information Modal
function DisplayModal(item) {
    Modal.info({
        title: `More Information on ${item.title}`,
        content: (
        <div style={{marginTop:"20px"}}>
            <p><b>Author: </b>{ item.user.first_name + " " + item.user.last_name}</p>
            <p><b>Community: </b> <a href={"/community/"+ item.community.id}>{ item.community.title}</a></p>
            <p><b>Updated At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
            <p><b>Created At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        ),
        onOk() {},
    });
}

//Formats the post depending on which type it is
function contentSwitch(value) {
    switch (value.type) {
        case 'Image': 
            return(
                <div className="post-community-image-content">
                    <img alt="" src={value.image} />
                </div>
                
            )
        case 'Post': 
            return(
                <div className="post-community-post-content">
                    <p>{value.text}</p>
                </div>
            )
        case 'Link': 
            return(
                <div className="post-community-link-content">
                     <a href={"" + `${value.text}`}>{value.text}</a> 
                </div>
            )
    }
}

//Maps data to cards
const Posts = (data) => {
    let history = useHistory()
    const editpost = (item) => history.push({
        pathname: '/editpost',
        state: {
            item
        }
    })
    return data.map(item => {//Maps all recent posts from DB
        return (
            <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                actions={[
                    <MessageOutlined key="message" />,
                    <EditOutlined key="edit" onClick={() => {editpost(item)}}/>,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                {contentSwitch(item)}
            </Card>
            
        )
    })
}

//Exports a list of cards with posts in the cards
export default function post(props) {
    // array does not exist, is not an array, or is empty
    if (!Array.isArray(props.data) || !props.data.length) {
        return(
            <Card className="content" type="inner" title="No Posts">
                <Empty />
            </Card>
        )
    } else {
        return (
            <Card title="Posts">
                {Posts(props.data)}
            </Card>
        )
    }
}
