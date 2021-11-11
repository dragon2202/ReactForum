import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Tabs from 'antd/lib/tabs'

import LoginOrRegister from '../../components/commons/LoginOrRegister/login-or-register'
import { SentFromMessage, SentToMessage, SendMessage } from '../../components/commons/inbox'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID_Refetch, GetGraphqlQuery } from '../../components/commons/functions/getgraphqlquery'
import { GET_MESSAGES_AND_SENT_MESSAGES, SEND_MESSAGE, DELETE_MESSAGE, DELETE_MESSAGE_SENDER_RECIPIENT, GET_ALL_USER } from '../../queries/posts'
import { useCookies } from 'react-cookie'

const { TabPane } = Tabs

export default function Inbox() {
    const [cookies] = useCookies(['userCookie'])
    let [messageQuery, messageRefetch] = (cookies.userCookie !== undefined) ? GetGraphqlQueryID_Refetch(cookies.userCookie.id, GET_MESSAGES_AND_SENT_MESSAGES) : [null, null]
    let getAllUserQuery = GetGraphqlQuery(GET_ALL_USER)
    const [selectedUser, setSelectedUser] = useState([])
    const [search, setSearch] = useState('')
    const [recipientFilter, setRecipientFilter] = useState('')
    const [senderFilter, setSenderFilter] = useState('')
    const [sendMessage] = useMutation(SEND_MESSAGE)
    const [deleteMessage] = useMutation(DELETE_MESSAGE)
    const [deleteMessageSender_Recipient] = useMutation(DELETE_MESSAGE_SENDER_RECIPIENT)
    const [form] = Form.useForm()

    //If user is not logged in return a page with login and register
    if (cookies.userCookie === undefined) {
        return (
            <main className="inbox">
                <h3>Inbox</h3>
                <LoginOrRegister />
            </main>
        )
    }

    //If messageQuery from graphql is not available return a page with loading...
    if (!isLiteralObject(messageQuery) || !isLiteralObject(getAllUserQuery)) {
        return (
            <main className="inbox">
                <h3><b>Inbox</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="inbox">
            <h3><b>Inbox</b></h3>
            <div className="flex-container">
                <div className="flex-child">
                    <Card bordered={false}>
                        <Tabs type='card'>
                            <TabPane tab='Messages' key='1'>
                                <div className="sentToandFrom">
                                    <SentFromMessage
                                        recipientFilter={recipientFilter}
                                        setRecipientFilter={setRecipientFilter}
                                        messageQuery={messageQuery}
                                        deleteMessage={deleteMessage} 
                                        deleteMessageSender_Recipient={deleteMessageSender_Recipient}
                                        sendMessage={sendMessage}
                                        messageRefetch={messageRefetch}
                                    />
                                    <SentToMessage
                                        senderFilter={senderFilter}
                                        setSenderFilter={setSenderFilter}
                                        messageQuery={messageQuery}
                                        deleteMessage={deleteMessage} 
                                        deleteMessageSender_Recipient={deleteMessageSender_Recipient}
                                        messageRefetch={messageRefetch}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab='Send Message' key='2'>
                                <SendMessage
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                    search={search}
                                    setSearch={setSearch}
                                    getAllUserQuery={getAllUserQuery}
                                    sendMessage={sendMessage}
                                    messageRefetch={messageRefetch}
                                    cookies={cookies}
                                    form={form}
                                />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>

            </div>
        </main>
    )
}