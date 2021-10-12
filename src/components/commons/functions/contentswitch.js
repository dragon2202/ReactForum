import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Message from 'antd/lib/message'
import Tooltip from 'antd/lib/tooltip'
import EditOutlined from '@ant-design/icons/EditOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'

import moment from 'moment'

//Formats the post depending on which type it is
export function contentSwitch(item, user) {
    switch (item.type) {
        case 'Post':
            return (
                <Card
                    key={item.id}
                    className="content"
                    type="inner"
                    title={item.title}
                    extra={
                        <Tooltip
                            title={
                                <div>
                                    <span>Author: {item.user.username}</span>
                                    <br />
                                    <span>Community: <Link to={'/viewpost/' + item.community.id}>{item.community.title}</Link></span>
                                    <br />
                                    <span>Updated At: {moment(parseInt(item.updated_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                    <br />
                                    <span>Created At: {moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ?
                            <Link to={"/editpost/" + item.id}><EditOutlined key="edit" /> </Link>
                            :
                            <span onClick={() =>
                                Message.warning({
                                    content: 'You cannot edit this post as you are not the author',
                                    style: { marginTop: '5vh' }
                                }, 10)}><EditOutlined key="edit"
                                />
                            </span>]}
                >
                    <p style={{whiteSpace: 'pre-line'}}>{item.text}</p>
                </Card>
            )
        case 'Link':
            return (
                <Card
                    key={item.id}
                    className="content"
                    type="inner"
                    title={item.title}
                    extra={
                        <Tooltip
                            title={
                                <div>
                                    <span>Author: {item.user.username}</span>
                                    <br />
                                    <span>Community: <Link to={'/viewpost/' + item.community.id}>{item.community.title}</Link></span>
                                    <br />
                                    <span>Updated At: {moment(parseInt(item.updated_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                    <br />
                                    <span>Created At: {moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ?
                            <Link to={"/editpost/" + item.id}><EditOutlined key="edit" /> </Link>
                            :
                            <span onClick={() =>
                                Message.warning({
                                    content: 'You cannot edit this post as you are not the author',
                                    style: { marginTop: '5vh' }
                                }, 10)}><EditOutlined key="edit"
                                />
                            </span>
                    ]}
                >
                    <a style={{wordWrap: 'break-word'}} href={"http://" + `${item.text}`}>{item.text}</a>
                </Card>
            )
        case 'Image':
            return (
                <Card
                    key={item.id}
                    className="content"
                    type="inner"
                    title={item.title}
                    extra={
                        <Tooltip
                            title={
                                <div>
                                    <span>Author: {item.user.username}</span>
                                    <br />
                                    <span>Community: <Link to={'/viewpost/' + item.community.id}>{item.community.title}</Link></span>
                                    <br />
                                    <span>Updated At: {moment(parseInt(item.updated_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                    <br />
                                    <span>Created At: {moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>,
                        //Disables access to Edit Post if not logged in
                        (user.id == item.author_id) ?
                            <Link to={"/editpost/" + item.id}><EditOutlined key="edit" /> </Link>
                            :
                            <span onClick={() =>
                                Message.warning({
                                    content: 'You cannot edit this post as you are not the author',
                                    style: { marginTop: '5vh' }
                                }, 10)}><EditOutlined key="edit"
                                />
                            </span>]}
                >
                    <img alt="" src={item.image} style={{ maxWidth: "100%" }} />
                </Card>
            )
    }
}