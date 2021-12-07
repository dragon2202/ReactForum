import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Tabs from 'antd/lib/tabs'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'

import LoginOrRegister from '../../components/commons/LoginOrRegister/login-or-register'
import { validateForm } from '../../components/commons/functions/validateForm'
import { useCookies } from 'react-cookie'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GET_USER, CHANGE_USER_INFO, CHECK_CREDENTIALS, CHECK_EMAIL_AND_PASSWORD, CHANGE_USER_PASSWORD } from '../../queries/posts'

const { TabPane } = Tabs

function OnFinish_Username_Email (checkCredentials, resetCookies, values, user_id) {
    checkCredentials({
        variables: {
            user: {
                id: user_id,
                email: values.email,
                username: values.username,
                password: values.password,
            }
        }
    })
    resetCookies({
        variables: {
            id: user_id
        }
    })
}

function OnFinish_CheckEmailAndPassword (checkEmailAndPassword, user_id, values) {
    if(validateForm(values)) {
        checkEmailAndPassword({
            variables: {
                id: user_id,
                email: values.email,
                password: values.password
            }
        })
    }
}

export default function AccountSettings () {
    const [cookies, set] = useCookies(['userCookie'])
    const [changeUserInfo] = useMutation(CHANGE_USER_INFO)
    const [changePassword] = useMutation(CHANGE_USER_PASSWORD)

    const [resetCookies] = useLazyQuery(GET_USER, {
        onCompleted: async (data) => {
            if (isLiteralObject(data)) {
                set('userCookie', data.user, { path: '/', sameSite: 'lax', secure: true, expires: 0 })//Set cookie for users
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
        onCompleted: results => {
            if(results) {
                
            }
        },
        fetchPolicy: "network-only"
    })

    const [checkCredentials] = useLazyQuery(CHECK_CREDENTIALS, {
        onCompleted: async (data) => {
            if (isLiteralObject(data.user)) {
                Message.success({
                    content: 'Email/Username has been successfully changed',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            } else {
                Message.warning({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
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
                        <TabPane tab="Username/Email" key="1">
                            <Form
                                name="edit-info"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                initialValues={{
                                    ["username"]: cookies.userCookie.username,
                                    ["email"]: cookies.userCookie.email
                                }}
                                onFinish={(values) => OnFinish_CheckEmailAndPassword(checkEmailAndPassword, cookies.userCookie.id, values)}
                            >
                                <Form.Item label="Username" name="username">
                                    <Input placeholder="Enter username you wish to change to."/>
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input type="email" placeholder="Enter email address you wish to change to."/>
                                </Form.Item>
                                <Form.Item label="Password" name="password">
                                    <Input type="password" placeholder="Enter password to verify identity" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Password" key="2">
                            <Form
                                name="edit-password"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                onFinish={(values) => OnFinish_Username_Email(checkCredentials, resetCookies, values, cookies.userCookie.id)}
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
                    </Tabs>
                </div>
            </section>
        </main>
    )
}