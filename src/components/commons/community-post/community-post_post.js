import React from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Modal from 'antd/lib/modal'
import List from 'antd/lib/list'
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
                <p><b>Author: </b>{ item.user.username + ` (${item.user.email})`}</p>
                <p><b>Updated At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                <p><b>Created At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        ),
        onOk() {},
    });
}

//Formats the post depending on which type it is
function contentSwitch(item) {
    switch (item.type) {
        case 'Image':
            return (
                <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                    actions={[
                        <MessageOutlined key="message" />,
                        <Link to={{ pathname:"/editpost"}}><EditOutlined key="edit" /> </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <img alt="" src={item.image} />
                </Card>
            )
        case 'Post':
            return (
                <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                    actions={[
                        <MessageOutlined key="message" />,
                        <Link to={{ pathname:"/editpost"}}><EditOutlined key="edit" /> </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <p>{item.text}</p>
                </Card>
            )
        case 'Link':
            return (
                <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                    actions={[
                        <MessageOutlined key="message" />,
                        <Link to={{ pathname:"/editpost"}}><EditOutlined key="edit" /> </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <a href={"" + `${item.text}`}>{item.text}</a>
                </Card>
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
    return (
        <List itemLayout="vertical" size="large" className="post-list" 
            pagination={{
                position: 'bottom',
                pageSize: 5
            }}
            dataSource={data}
            renderItem={item =>
            (
                <List.Item key={item.id}>
                    {contentSwitch(item)}
                </List.Item>
            )}
        />
    )
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
            Posts(props.data.post)
        )
    } else {
        return(
            <Card className="content" type="inner" title="No Posts">
                <Empty />
            </Card>
        )
    }
}
