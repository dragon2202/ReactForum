import React from 'react'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

import { Link } from 'react-router-dom'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Message from 'antd/lib/message'
import MailOutlined from '@ant-design/icons/MailOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'

import { validateForm } from '../../components/commons/functions/validateForm'
import { LOGIN_USER } from '../../queries/posts'
import { useCookies } from 'react-cookie'

export default function Login() {
    let history = useHistory()
    const [ cookies, set ] = useCookies(['userCookie'])
    const [ loginUser ] = useLazyQuery(LOGIN_USER, {
        onCompleted: result => {
            if(result.user.id === null) {
                Message.error({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                },10)
            } else {
                set('userCookie', result.user, {path: '/', sameSite:'lax', secure: true, expires: 0})//Set cookie for users
                Message.success({
                    content: 'You successfully logged in.',
                    style: {
                        marginTop: '5vh',
                    },
                },10)
                history.push("/account")
            }
        }, 
        onError: err => {
            Message.error({
                content: 'No account found for this email. Please try again.',
                style: {
                    marginTop: '5vh',
                },
            },10)
        }
    })

    const onFinish = (values) => {
        if(validateForm(values)) {//validates form before logging in
            loginUser({
                variables: {
                    email: values.email,
                    password: values.password
                }
            })
        }
    }

    if(cookies.userCookie === undefined) {
        return (
            <main className="login">
                <Form name="normal_login" className="login-form" onFinish={onFinish}>
                    <h3 style={{textAlign:"center"}}><b>User Login</b></h3>
                    <Form.Item name="email">
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email"/>
                    </Form.Item>
                    <Form.Item name="password" >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <span><Link to={"/register"}>Register now!</Link></span>
                        <Link to={"/forgot"} className="login-form-forgot" style={{ float: "right" }}>
                            Forgot password!
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
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

//createPost

//https://www.npmjs.com/package/react-cookie
//https://github.com/reactivestack/cookies/tree/07c0e7eae0aae674262f78d84aad31df24bb7a96/packages/react-cookie
