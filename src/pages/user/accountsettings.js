import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Tabs from 'antd/lib/tabs'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'
import List from 'antd/lib/list'
import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'

import LoginOrRegister from '../../components/commons/LoginOrRegister/login-or-register'
import { OnFinish_CheckEmailAndPassword, OnFinish_CheckPassword, UpdateConfirm, RemoveConfirm, OnFinish_CreateQuestion} from '../../components/commons/accountsettings/functions'
import { GetGraphqlQueryID_Refetch } from '../../components/commons/functions/getgraphqlquery'
import { useCookies } from 'react-cookie'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import {
    GET_USER,
    CHANGE_USER_INFO,
    CHECK_USER_PASSWORD,
    CHECK_EMAIL_AND_PASSWORD,
    CHANGE_USER_PASSWORD,
    GET_SECURITY_QUESTIONS_BY_AUTHOR_ID,
    CREATE_SECURITY_QUESTION,
    UPDATE_SECURITY_QUESTION,
    REMOVE_SECURITY_QUESTION
} from '../../queries/posts'

const { TabPane } = Tabs

export default function AccountSettings() {
    const [cookies, set] = useCookies(['userCookie'])
    const [inputObject, setInputObject] = useState(null)
    const [accountForm] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const [questionForm] = Form.useForm()
    const [changeUserInfo] = useMutation(CHANGE_USER_INFO)
    const [changePassword] = useMutation(CHANGE_USER_PASSWORD)
    const [createQuestion] = useMutation(CREATE_SECURITY_QUESTION)
    const [updateQuestion] = useMutation(UPDATE_SECURITY_QUESTION)
    const [removeQuestion] = useMutation(REMOVE_SECURITY_QUESTION)

    const [securityQuestions, refetch] = (cookies.userCookie !== undefined) ? GetGraphqlQueryID_Refetch(cookies.userCookie.id, GET_SECURITY_QUESTIONS_BY_AUTHOR_ID) : null

    const [resetCookies] = useLazyQuery(GET_USER, {
        onCompleted: async (data) => {
            if (isLiteralObject(data)) {
                set('userCookie', data.user, { path: '/', sameSite: 'lax', secure: true, expires: 0 })//Set session cookie for users
            } else {
                Message.warning({
                    content: 'An error has occurred',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        },
        fetchPolicy: "network-only"
    })

    const [checkEmailAndPassword] = useLazyQuery(CHECK_EMAIL_AND_PASSWORD, {
        onCompleted: async (results) => {
            //Queried password returns if password is correct for current uer
            if (results.passwordCheck.id !== null) {
                //Queried email Check Query is null therefore not taken or queried email is the same as current user
                if (results.emailCheck.id === null || results.emailCheck.email === cookies.userCookie.email) {
                    await changeUserInfo({ variables: { user: inputObject } })//mutation to change account info
                    await resetCookies({ variables: { id: cookies.userCookie.id } })//reset session cookies based of changed account information
                    accountForm.setFieldsValue({ password: '' });
                    Message.success({
                        content: 'Account detail has been updated',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 6)
                } else {
                    Message.warning({
                        content: 'Email is already in use. Try another email address.',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 6)
                }
            } else {
                Message.warning({
                    content: 'Password is incorrect, try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: "network-only"
    })

    const [checkPassword] = useLazyQuery(CHECK_USER_PASSWORD, {
        onCompleted: async (results) => {
            //If password is correct return a non null query
            if (results.user.id !== null) {
                await changePassword({ variables: { user: inputObject } })//mutation to change current password
                passwordForm.resetFields()//form reset inputs to blank
                Message.success({
                    content: 'Your password has been updated',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            } else {
                Message.warning({
                    content: 'Password is incorrect, try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: 'network-only'
    })

    const [checkPassword_CreateQuestion] = useLazyQuery(CHECK_USER_PASSWORD, {
        onCompleted: async (results) => {
            //If password is correct return a non null query
            if (results.user.id !== null) {
                await createQuestion({ variables: { securityQuestion: inputObject } })//mutation to change current password
                refetch()//form reset inputs to blank
                questionForm.resetFields()//form reset inputs to blank
                Message.success({
                    content: 'You have successfully created a security question',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            } else {
                Message.warning({
                    content: 'Password is incorrect, try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: 'network-only'
    })
    const [checkPassword_UpdateQuestion] = useLazyQuery(CHECK_USER_PASSWORD, {
        onCompleted: async (results) => {
            //If password is correct return a non null query
            if (results.user.id !== null) {
                await updateQuestion({ variables: { securityQuestion: inputObject } })//mutation to change current password
                refetch()//form reset inputs to blank
                Message.success({
                    content: 'You have successfully updated a security question',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            } else {
                Message.warning({
                    content: 'Password is incorrect, try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: 'network-only'
    })

    const [checkPassword_RemoveQuestion] = useLazyQuery(CHECK_USER_PASSWORD, {
        onCompleted: async (results) => {
            //If password is correct return a non null query
            if (results.user.id !== null) {
                await removeQuestion({ variables: { securityQuestion: inputObject } })//mutation to change current password
                refetch()//form reset inputs to blank
                Message.success({
                    content: 'You have successfully removed a security question',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            } else {
                Message.warning({
                    content: 'Password is incorrect, try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: 'network-only'
    })

    //If user is not logged in return a page with login and register
    if (cookies.userCookie === undefined) {
        return (
            <main className="accountsettings">
                <h3 className="header-3"><b>Account Settings</b></h3>
                <LoginOrRegister />
            </main>
        )
    }

    return (
        <main className="accountsettings">
            <section className="container">
                <div className="row">
                    <h3 className="header-3"><b>Account Settings</b></h3>
                    <Tabs type="card">
                        <TabPane tab="Change Account Information" key="1">
                            <Form
                                name="edit-info"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                initialValues={{
                                    ["username"]: cookies.userCookie.username,
                                    ["email"]: cookies.userCookie.email
                                }}
                                form={accountForm}
                                onFinish={(values) => OnFinish_CheckEmailAndPassword(checkEmailAndPassword, cookies.userCookie.id, values, setInputObject)}
                            >
                                <Form.Item label="Username" name="username">
                                    <Input placeholder="Enter username you wish to change to." />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input type="email" placeholder="Enter email address you wish to change to." />
                                </Form.Item>
                                <Form.Item label="Password" name="password">
                                    <Input type="password" placeholder="Enter password to verify identity" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Change Password" key="2">
                            <Form
                                name="edit-password"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                form={passwordForm}
                                onFinish={(values) => OnFinish_CheckPassword(checkPassword, cookies.userCookie.id, values, setInputObject)}
                            >
                                <Form.Item label="Password" name="Password">
                                    <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item label="New Password" name="NewPassword">
                                    <Input type="password" placeholder="Enter New Password" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item label="New Password" name="ConfirmPassword">
                                    <Input type="password" placeholder="Re-enter New Password" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Security Questions" key="3">
                            <div className='question-display-form'>
                                <List
                                    className='question-display'
                                    header={<strong>Security questions for {cookies.userCookie.username}</strong>}
                                    bordered
                                    dataSource={securityQuestions.security_questions}
                                    renderItem={(item) => (
                                        <List.Item className='list-items'>
                                            <div className='question-actions'>
                                                <div className='question'>{item.question}</div>
                                                <div className='actions'>
                                                    <EditOutlined onClick={() => UpdateConfirm(checkPassword_UpdateQuestion, item.question, cookies.userCookie.id, setInputObject)} /> 
                                                    <DeleteOutlined onClick={() => RemoveConfirm(checkPassword_RemoveQuestion, item.question, cookies.userCookie.id, setInputObject)}/>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                >
                                </List>

                                <Form
                                    className="question-form"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 18 }}
                                    form={questionForm}
                                    onFinish={(values) => OnFinish_CreateQuestion(checkPassword_CreateQuestion, cookies.userCookie.id, values, setInputObject)}
                                >
                                    <Form.Item label="Security Question" name="question">
                                        <Input type="text" placeholder="Enter Security Question" autoComplete='new-password' />
                                    </Form.Item>
                                    <Form.Item label="Security Answer" name="answer">
                                        <Input type="text" placeholder="Enter Security Answer" autoComplete='new-password' />
                                    </Form.Item>

                                    <Form.Item label="Password" name="password">
                                        <Input type="password" placeholder="Enter Password to verify identity" autoComplete='new-password' />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </section>
        </main>
    )
}