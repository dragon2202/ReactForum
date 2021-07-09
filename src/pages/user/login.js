import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import MailOutlined from '@ant-design/icons/MailOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import { useHistory } from 'react-router-dom'

import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_USER_QUERY } from '../../queries/posts'

import { useCookies } from 'react-cookie'

export default function Login() {
    let history = useHistory()
    const [ cookies, set ] = useCookies(['userCookie'])
    const [ queryUser, setUser ] = useState(null)
    const [ loginUser ] = useLazyQuery(LOGIN_USER_QUERY, {
        onCompleted: data => 
        {
            if(data.user.id == null || data.user.email == null) {
                message.error({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                },10)
            } else {
                setUser(data)
            }
        }, 
        onError: err => {
            message.error({
                content: 'Wrong Username. Please try again.',
                style: {
                    marginTop: '5vh',
                },
            },10)
        }
    })

    //Checks if all form inputs are not blank
    function validateForm(object){
        var count = 0
        for (const property in object) {
            if(object[property] === undefined || object[property] === "") {
                message.warning('Please fill out ' + `${property}`, 10)
                count++
            }
        }
        if(count > 0) { 
            return false
        } else {
            return true
        }
    }

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

    useEffect(() => {
        if(queryUser) {//block until triggered with login button
            set('userCookie', queryUser, {path: '/', sameSite:'lax',secure: true, expires: 0})//Set cookie for users
            message.success({
                content: 'You successfully logged in.',
                style: {
                    marginTop: '5vh',
                },
            },10)
            history.push("/")
        }
    }, [queryUser])

    if(cookies.userCookie == undefined || cookies.userCookie == "undefined") {
        return (
            <main className="login">
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                    <h3 style={{textAlign:"center"}}><b>User Login</b></h3>
                    <Form.Item name="email">
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <span><Link to={"/register"}>Register now!</Link></span>
                        <a className="login-form-forgot" href="" style={{ float: "right" }}>
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        )
    } else {
        return(
            <main className="login">
                <div className="logged-in">
                    <h1>You're already logged in.</h1> 
                </div>
                <div className="redirect">
                    <Link to={"/home"}>Redirect to Home</Link>
                </div>
            </main>
        )
    }
}

//createPost

//https://www.npmjs.com/package/react-cookie
//https://github.com/reactivestack/cookies/tree/07c0e7eae0aae674262f78d84aad31df24bb7a96/packages/react-cookie
