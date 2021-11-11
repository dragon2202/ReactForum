import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'
import Popconfirm from 'antd/lib/popconfirm'
import Dropdown from 'antd/lib/dropdown'
import Tooltip from 'antd/lib/tooltip'
import Menu from 'antd/lib/menu'
import Collapse from 'antd/lib/collapse'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Tag from 'antd/lib/tag'
import Typography from 'antd/lib/typography'
import Form from 'antd/lib/form'
import Card from 'antd/lib/card'
import DropdownButton from 'antd/lib/dropdown/dropdown-button'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'

import moment from 'moment'
const { confirm } = Modal
const { Text, Title } = Typography
const { Panel } = Collapse

const onFinish = (values, cookies, selectedUser, setSelectedUser, sendMessage, messageRefetch, form) => {
    selectedUser.forEach(async item =>
        await sendMessage({
            variables: {
                message: {
                    sender_id: cookies.userCookie.id,
                    recipient_id: item.id,
                    subject_line: values.subject_line,
                    message: values.message
                }
            }
        })
    )
    //reset form
    form.resetFields()
    setSelectedUser([])
    messageRefetch()
    Message.success({
        content: 'Message has been sent.',
        style: {
            marginTop: '5vh',
        },
    }, 10)
}

const responseOnFinish = async (values, item, sendMessage, messageRefetch) => {
    await sendMessage({
        variables: {
            message: {
                sender_id: item.recipient_id,
                recipient_id: item.sender_id,
                subject_line: "RE: " + item.subject_line,
                message: values.response
            }
        }
    })
    messageRefetch()
    Modal.destroyAll()
    Message.success({
        content: 'Reply has been has been sent.',
        style: {
            marginTop: '5vh',
        },
    }, 10)
}

function responseConfirm(item, sendMessage, messageRefetch) {
    confirm({
        title: 'Response to ' + item.subject_line,
        icon: null,
        content:
            <Form onFinish={(values) => responseOnFinish(values, item, sendMessage, messageRefetch)}>
                <Form.Item name='response'>
                    <Input placeholder="Input your response here..." />
                </Form.Item>
                <Form.Item style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>,
        okButtonProps: { style: { display: 'none' } },
        cancelButtonProps: { style: { display: 'none' } },
        closable: true,
        maskClosable: true
    });
}

async function deleteMessageOnFinish(item, isSender, deleteMessage, deleteMessageSender_Recipient, messageRefetch) {
    //console.log('Sender: ' + item.sender_delete + ' Recipient: ' + item.recipient_delete )
    if (isSender) {//Sender
        if (item.recipient_delete === 1) {
            //If recipient of message deleted and you are deleting, delete from database
            await deleteMessage({
                variables: {
                    message: {
                        id: item.id
                    }
                }
            })
        } else {
            await deleteMessageSender_Recipient({
                //If recipient of message is not deleted and you are deleting, updating by setting a flag
                variables: {
                    message: {
                        id: item.id,
                        sender_delete: 1,
                        recipient_delete: 0
                    }
                }
            })
        }
    } else {//Recipient
        if (item.sender_delete === 1) {
            //If sender of message deleted and you are deleting, delete from database
            await deleteMessage({
                variables: {
                    message: {
                        id: item.id
                    }
                }
            })
        } else {
            await deleteMessageSender_Recipient({
                //If sender of message is not deleted and you are deleting, updating by setting a flag
                variables: {
                    message: {
                        id: item.id,
                        sender_delete: 0,
                        recipient_delete: 1
                    }
                }
            })
        }
    }
    messageRefetch()
    Message.success({
        content: 'Message has been deleted.',
        style: {
            marginTop: '5vh',
        },
    }, 10)
}

const SentFromMessage = ({ recipientFilter, setRecipientFilter, messageQuery, deleteMessage, deleteMessageSender_Recipient, sendMessage, messageRefetch }) => {
    return (
        <div className="sentFromMessage">
            <Title level={4} type='secondary'>Sent From</Title>
            <Dropdown.Button
                overlay={
                    <Menu>
                        <Menu.Item
                            key={0}
                            onClick={() => setRecipientFilter('')}
                        >
                            All Users
                        </Menu.Item>
                        {
                            [...new Set(messageQuery.message.map(item => item.sender))].map((item) => {
                                return (
                                    <Menu.Item key={item.id} onClick={() => setRecipientFilter(item.username)}>
                                        {item.username}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                }
            >
                {(recipientFilter.length === 0) ? 'User Filter - Non Selected' : 'All messages from ' + recipientFilter}
            </Dropdown.Button>
            <Collapse className="collapse">
                {
                    messageQuery.message.map(item => {
                        if (recipientFilter === '' || item.sender.username === recipientFilter) {
                            return (
                                <Panel
                                    className='panel'
                                    header={
                                        <span className="header_span">
                                            <span className="subject" style={{ float: 'left' }}>
                                                Subject: <strong>{item.subject_line}</strong>
                                            </span>
                                            <span className="date" style={{ float: 'right' }}>
                                                {' Sent by '} {<Text type='secondary'>{item.sender.username}</Text>} {' '}
                                                {
                                                    <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a')}>
                                                        {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                                                    </Tooltip>
                                                }
                                            </span>
                                        </span>
                                    }
                                    key={item.id}
                                    className="panel"
                                >
                                    <Card
                                        bordered={false}
                                        actions={[
                                            <Popconfirm
                                                title="Are you sure you want to delete this message?"
                                                onConfirm={() => deleteMessageOnFinish(item, 0, deleteMessage, deleteMessageSender_Recipient, messageRefetch)}
                                                icon={null}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined />
                                            </Popconfirm>,
                                            <MessageOutlined onClick={() => responseConfirm(item, sendMessage, messageRefetch)} />
                                        ]}
                                    >
                                        {item.message}
                                    </Card>
                                </Panel>
                            )
                        }
                    })
                }
            </Collapse>
        </div>
    )
}

const SentToMessage = ({ senderFilter, setSenderFilter, messageQuery, deleteMessage, deleteMessageSender_Recipient, messageRefetch }) => {
    return (
        <div className="sentToMessage">
            <Title level={4} type='secondary'>Sent To</Title>
            <Dropdown.Button
                overlay={
                    <Menu>
                        <Menu.Item key={0} onClick={() => setSenderFilter('')}>
                            All Users
                        </Menu.Item>
                        {
                            [...new Set(messageQuery.sentMessage.map(item => item.recipient))].map((item) => {
                                return (
                                    <Menu.Item key={item.id} onClick={() => setSenderFilter(item.username)}>
                                        {item.username}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                }
            >
                {(senderFilter.length === 0) ? 'User Filter - Non Selected' : 'All messages sent to ' + senderFilter}
            </Dropdown.Button>
            <Collapse className="collapse">
                {
                    messageQuery.sentMessage.map(item => {
                        if (senderFilter === '' || item.recipient.username === senderFilter) {
                            return (
                                <Panel
                                    className='panel'
                                    header={
                                        <span className="header_span">
                                            <span className="subject" style={{ float: 'left' }}>
                                                Subject: <strong>{item.subject_line}</strong>
                                            </span>
                                            <span className="date" style={{ float: 'right' }}>
                                                {` Sent to ${item.recipient.username} `}
                                                {
                                                    <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a')}>
                                                        {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                                                    </Tooltip>
                                                }
                                            </span>
                                        </span>
                                    }
                                    key={item.id}
                                    className="panel"
                                >
                                    <Card
                                        bordered={false}
                                        actions={[
                                            <Popconfirm
                                                title="Are you sure you want to delete this message?"
                                                onConfirm={() => deleteMessageOnFinish(item, 1, deleteMessage, deleteMessageSender_Recipient, messageRefetch)}
                                                icon={null}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined />
                                            </Popconfirm>
                                        ]}
                                    >
                                        {item.message}
                                    </Card>
                                </Panel>
                            )
                        }

                    })
                }
            </Collapse>
        </div>
    )
}

const SendMessage = ({ selectedUser, setSelectedUser, search, setSearch, getAllUserQuery, sendMessage, messageRefetch, cookies, form }) => {
    return (
        <Form
            className="sendMessage"
            name='basic'
            onFinish={(values) => onFinish(values, cookies, selectedUser, setSelectedUser, sendMessage, messageRefetch, form)}
            layout='vertical'
            form={form}
        >
            <Form.Item label='Recipient' className='recipient'>
                <span className='tag-span'>
                    {
                        selectedUser.map((item) => {
                            return (
                                <Tag
                                    key={item.id}
                                    closable
                                    onClose={() => setSelectedUser(selectedUser.filter((user) => user.id !== item.id))}
                                >
                                    {item.username}
                                </Tag>
                            )
                        })
                    }
                </span>
                <DropdownButton
                    overlay={
                        <Menu>
                            <Menu.Item >
                                <Input placeholder="Search User(s)" onClick={(event) => event.stopPropagation()} onChange={(e) => { setSearch(e.target.value) }} />
                            </Menu.Item>
                            {
                                getAllUserQuery.user.map(item => {
                                    if (item.username.toLowerCase().includes(search.toLowerCase()) && !selectedUser.find((obj) => obj.id === item.id) && item.id !== cookies.userCookie.id) {
                                        return (
                                            <Menu.Item
                                                key={item.id}
                                                onClick={() => setSelectedUser([...selectedUser, { "id": item.id, "username": item.username }])}
                                            >
                                                {item.username}
                                            </Menu.Item>
                                        )
                                    }
                                })
                            }
                        </Menu>
                    }
                >
                    Select user(s) to send a message
                </DropdownButton>
            </Form.Item>
            <Form.Item label='Subject Line' name='subject_line'>
                <Input placeholder="Subject Line" />
            </Form.Item>
            <Form.Item label='Message' name='message' className='message'>
                <Input.TextArea placeholder="Message" className='textArea'/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

export { SentFromMessage, SentToMessage, SendMessage }