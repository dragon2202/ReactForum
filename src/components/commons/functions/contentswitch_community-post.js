import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Message from 'antd/lib/message'
import Tooltip from 'antd/lib/tooltip'
import EditOutlined from '@ant-design/icons/EditOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'

import moment from 'moment'

//Formats the post depending on which type it is
export function contentSwitch(post, user) {
    switch (post.type) {
        case 'Image':
            return (
                <Card 
                    key={post.id}
                    className="content"
                    type="inner"
                    title={post.title}
                    extra={ 
                        <Tooltip 
                            title={
                                <div>
                                    <span>Author: {post.user.username}</span>
                                    <br/>
                                    <span>Updated At: { moment(parseInt(post.updated_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                    <br/>
                                    <span>Created At: { moment(parseInt(post.created_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined/>
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == post.author_id) ? <Link to={"/editpost/" + post.id}><EditOutlined key="edit" /> </Link> : <span onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh' } }, 10)}><EditOutlined key="edit" /> </span>
                    ]}
                >
                    <img alt="" src={post.image} style={{ maxWidth: "100%" }} />
                </Card>
            )
        case 'Post':
            return (
                <Card 
                    key={post.id} 
                    className="content" 
                    type="inner" 
                    title={post.title}
                    extra={ 
                        <Tooltip 
                            title={
                                <div>
                                    <span>Author: {post.user.username}</span>
                                    <br/>
                                    <span>Updated At: { moment(parseInt(post.updated_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                    <br/>
                                    <span>Created At: { moment(parseInt(post.created_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined/>
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == post.author_id) ? <Link to={"/editpost/" + post.id}><EditOutlined key="edit" /> </Link> : <span onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh' } }, 10)}><EditOutlined key="edit" /> </span>
                    ]}
                >
                    <p>{post.text}</p>
                </Card>
            )
        case 'Link':
            return (
                <Card 
                    key={post.id} 
                    className="content" 
                    type="inner" 
                    title={post.title}
                    extra={ 
                        <Tooltip 
                            title={
                                <div>
                                    <span>Author: {post.user.username}</span>
                                    <br/>
                                    <span>Updated At: { moment(parseInt(post.updated_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                    <br/>
                                    <span>Created At: { moment(parseInt(post.created_at)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined/>
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == post.author_id) ? <Link to={"/editpost/" + post.id}><EditOutlined key="edit" /> </Link> : <span onClick={() => Message.warning({ content: 'You cannot edit this post as you are not the author', style: { marginTop: '5vh' } }, 10)}><EditOutlined key="edit" /> </span>
                    ]}
                >
                    <a style={{wordWrap: 'break-word'}} href={"http://" + `${post.text}`}>{post.text}</a>
                </Card>
            )
    }
}