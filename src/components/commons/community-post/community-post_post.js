import React from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import moment from 'moment'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Modal from 'antd/lib/modal'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

//Checks if type is object
function isLiteralObject (a) {
    return (!!a) && (a.constructor === Object);
}

function DisplayModal(item) {
    Modal.info({
        title: `More Information on ${item.title}`,
        content: (
            <div style={{marginTop:"20px"}}>
                <p><b>Author: </b>{ item.user.first_name + " " + item.user.last_name}</p>
                <p><b>Updated At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                <p><b>Created At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        ),
        onOk() {},
    });
}

function contentSwitch(value) {
    switch (value.type) {
        case 'Image': 
            return(
                <div className="post-community_post-image-content">
                    <img alt="" src={value.image} />
                </div>
            )
        case 'Post': 
            return(
                <div className="post-community_post-post-content">
                    <p>{value.text}</p>
                </div>
            )
        case 'Link': 
            return(
                <div className="post-community_post-link-content">
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
    return data.map(item => {
        return (
            <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More</a>}
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

//Exports a list of cards with posts in the cards for the page Community Post
export default function post(props) {
    if (isLiteralObject(props.data)) {//if props.data is an object
        if(props.data.post == null) {
            return <Redirect to='/error'/>
        }
        if(props.data.post.length == 0) {
            return(
                <Card className="content" type="inner" title="No Posts">
                    <Empty />
                </Card>
            )
        }
        return (
            <Card className="content" type="inner" title="Posts">
                {Posts(props.data.post)}
            </Card>
        )
    } else {
        return(
            <Card className="content" type="inner" title="No Posts">
                <Empty />
            </Card>
        )
    }
}
