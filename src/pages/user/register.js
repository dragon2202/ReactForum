import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Message from 'antd/lib/message'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import { Link } from 'react-router-dom'

import { useCookies } from 'react-cookie'
import { validateForm } from '../../components/commons/functions/validateForm'

import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { REGISTER_USER, CHECK_USER_EMAIL } from '../../queries/posts/index'

export default function Register() {
    let history = useHistory();
    const [cookies] = useCookies(['userCookie'])
    const [user, setUser] = useState(null)
    const [registerUser] = useMutation(REGISTER_USER);
    const [getUser] = useLazyQuery(CHECK_USER_EMAIL, {
        onCompleted: async (data) => {
            if (data.user.email) {
                Message.warning('Email is already registered.', 20)
            } else {
                //GraphQL to add user
                await registerUser({ variables: { user: user } })
                Message.success({ content: 'Account has been successfully registered.', style: { marginTop: '5vh' } }, 10)
                history.push("/login")
            }
        }
    })

    async function OnFinish(values) {
        setUser({
            email: values.Email,
            password: values.Password,
            username: values.Username,
        })
        if (validateForm(values)) {
            if (values.Password === values.ConfirmPassword) {
                getUser({//GraphQL to grab user with same email as the input
                    variables: {
                        email: values.Email
                    }
                })
            } else {
                Message.warning('Passwords do not match.', 10)
            }
        }
    }

    if (cookies.userCookie === undefined) {
        return (
            <main className="register">
                <Form name="normal_register" className="register-form" onFinish={OnFinish}>
                    <h3 style={{ textAlign: "center" }}><b>User Register</b></h3>
                    <h3 style={{textAlign:"center"}}>Note: Password Recovery and Reset is not supported</h3>
                    <Form.Item name="Email">
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Please input your email!" />
                    </Form.Item>
                    <Form.Item name="Username">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Please input your Username" />
                    </Form.Item>
                    <Form.Item name="Password">
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Please input your Password!" />
                    </Form.Item>
                    <Form.Item name="ConfirmPassword">
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Please confirm your Password!" />
                    </Form.Item>
                    <Form.Item>
                        <span><Link to={"/login"}>Login!</Link></span>
                        <Link to={"/forgot"} className="login-form-forgot" style={{ float: "right" }}>
                            Forgot password!
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        )
    }
    return (
        <main className="login">
            <div className="logged-in">
                <h1>You're already logged in.</h1>
            </div>
            <div className="redirect">
                <Link to={"/"}>Redirect to Home</Link>
            </div>
        </main>
    )

}