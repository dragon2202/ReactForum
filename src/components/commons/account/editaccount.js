import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import List from 'antd/lib/list'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Tabs from 'antd/lib/tabs'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'

import { validateForm } from '../functions/validateForm'
import { useCookies } from 'react-cookie'
import { isLiteralObject } from '../../../components/commons/functions/isLiteralObject'
import { CHANGE_USER_INFO, CHECK_CREDENTIALS, CHECK_USER_EMAIL, CHANGE_USER_PASSWORD } from '../../../queries/posts'

const { TabPane } = Tabs

const EditAccount = ({ editToggle, item }) => {
    const [cookies, set] = useCookies(['userCookie'])
    const [user, setUserObj] = useState(null)
    const [ChangeUserInfo] = useMutation(CHANGE_USER_INFO)
    const [changePassword] = useMutation(CHANGE_USER_PASSWORD)

    const [getUser] = useLazyQuery(CHECK_USER_EMAIL, {
        onCompleted: async (data) => {
            if(isLiteralObject(data)){
                if(data.user.id === null || data.user.id === cookies.userCookie.id) {
                    localStorage.setItem('reload', 1)
                    await ChangeUserInfo({
                        variables: {
                            user
                        }
                    })
                    delete user.password//delete password key:value to fit mutation
                    set('userCookie', user, { path: '/', sameSite: 'lax', secure: true, expires: 0 })//Set cookie for users
                    window.location.reload()
                } else {
                    Message.warning({
                        content: 'Email Taken. Try another email address.',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                }
            }
        }
    })

    const [checkCredentials] = useLazyQuery(CHECK_CREDENTIALS, {
        onCompleted: async (data) => {
            if (isLiteralObject(data)) {
                getUser({
                    variables: {
                        email: user.email
                    }
                })
            } else {
                Message.warning({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    })

    const [checkCredentialsPassword] = useLazyQuery(CHECK_CREDENTIALS, {
        onCompleted: async (data) => {
            if (isLiteralObject(data.user)) {
                localStorage.setItem('reload', 2)
                await changePassword({
                    variables: {
                        user
                    }
                })
                window.location.reload()
            } else {
                Message.warning({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    })

    async function OnFinish_Password(values, item) {
        if (validateForm(values)) {
            if(values.NewPassword === values.ConfirmPassword) {
                setUserObj({
                    id: item.id,
                    password: values.NewPassword
                })

                checkCredentialsPassword({
                    variables: {
                        id: item.id,
                        password: values.Password
                    }
                })
            } else {
                Message.warning({
                    content: "New passwords don't match",
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    }

    function OnFinish_Username_Email(values, item) {
        if (validateForm(values)) {
            setUserObj({
                id: item.id,
                email: values.email,
                username: values.username,
                password: values.password
            })
    
            checkCredentials({
                variables: {
                    id: item.id,
                    password: values.password
                }
            })
        }
    }
    if (editToggle) {
        return (
            <Tabs type="card">
                <TabPane tab="Username/Email" key="1">
                    <Form
                        name="edit-info"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{
                            ["username"]: item.username,
                            ["email"]: item.email
                        }}
                        onFinish={(values) => OnFinish_Username_Email(values, item)}
                    >
                        <Form.Item label="Username" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input type="email"/>
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Password" key="2">
                    <Form
                        name="edit-password"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={(values) => OnFinish_Password(values, item)}
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        )
    } else {
        return (
            <List
                itemLayout='horizontal'
                split={false}
            >
                <List.Item>
                    <div><b>Username: </b>{item.username}</div>
                </List.Item>
                <List.Item>
                    <div><b>Email: </b>{item.email}</div>
                </List.Item>
            </List>
        )
    }

}

export default EditAccount