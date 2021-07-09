import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Modal from 'antd/lib/modal'
import List from 'antd/lib/list'
import Message from 'antd/lib/message'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

import { useCookies } from 'react-cookie'

//Addition Information Modal
function DisplayModal(item) {
    Modal.info({
        title: `More Information on ${item.title}`,
        content: (
            <div style={{ marginTop: "20px" }}>
                <p><b>Author: </b>{item.user.username + ` (${item.user.email})`}</p>
                <p><b>Community: </b> <a href={"/community/" + item.community.id}>{item.community.title}</a></p>
                <p><b>Updated At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                <p><b>Created At: </b>{moment(parseInt(item.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        ),
        onOk() { },
    });
}

//Formats the post depending on which type it is
function contentSwitch(item, user) {
    switch (item.type) {
        case 'Image':
            return (
                <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                    actions={[
                        <Link to={{ pathname:"/viewpost/" + item.id}}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ? <Link to={{ pathname:"/editpost/" + item.id}}><EditOutlined key="edit" /> </Link> : <Link to={{ pathname:"/"}} onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh'}},10)}><EditOutlined key="edit" /> </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <img alt="" src={item.image} style={{maxWidth:"100%"}}/>
                </Card>
            )
        case 'Post':
            return (
                <Card key={item.id} className="content" type="inner" title={item.title} extra={<a onClick={() => DisplayModal(item)}>More Info</a>}
                    actions={[
                        <Link to={{ pathname:"/viewpost/" + item.id}}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ? <Link to={{ pathname:"/editpost/" + item.id}}><EditOutlined key="edit" /> </Link> : <Link to={{ pathname:"/"}} onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh'}},10)}><EditOutlined key="edit" /> </Link>,
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
                        <Link to={{ pathname:"/viewpost/" + item.id}}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ? <Link to={{ pathname:"/editpost/" + item.id}}><EditOutlined key="edit" /> </Link> : <Link to={{ pathname:"/"}} onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh'}},10)}><EditOutlined key="edit" /> </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <a href={"http://" + `${item.text}`}>{item.text}</a>
                </Card>
            )
    }
}

//Maps data to cards
const Posts = (data, user) => {
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
                    {contentSwitch(item, user)}
                </List.Item>
            )}
        />
    )
}

//Exports a list of cards with posts in the cards
export default function Post(props) {
    const [ cookies ] = useCookies(['userCookie'])
    if (!Array.isArray(props.data) || !props.data.length) {
        return (
            <Card className="content" type="inner" title="No Posts">
                <Empty />
            </Card>
        )
    } else {
        return (
            <div>
                <h3 style= {{marginTop: "10px", marginLeft: "10px"}}>Recent Posts</h3>
                {Posts(props.data, (cookies.userCookie != undefined) ? cookies.userCookie.user : 0)}
            </div>
        )
    }
}
//https://stackoverflow.com/questions/53843548/pagination-and-card-components-with-ant-design-antd
