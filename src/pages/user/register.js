import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import { Link } from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { REGISTER_USER_QUERY, CHECK_USER_EMAIL_QUERY } from '../../queries/posts/index'

export default function Register() {
    let history = useHistory();
    const [ cookies ] = useCookies(['userCookie'])
    const [ queryUser, setUser ] = useState(null)
    const [ userObject, setObject ] = useState(null)
    const [ mutation ] = useMutation(REGISTER_USER_QUERY);
    const [ getUser] = useLazyQuery(CHECK_USER_EMAIL_QUERY, {
        onCompleted: data => {setUser(data)}//triggers useEffect
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

    useEffect(async () => {
        if(queryUser) {//block until triggered with OnFinsh
            if(queryUser.user.email){
                message.warning('Email is already registered.', 20)
            } else {
                //GraphQL to add user
                await mutation( { variables: { user: userObject } } )
                message.success({ content: 'Account has been successfully registered.', style: { marginTop: '5vh'}},10)
                history.push("/login")
            }
        }
    }, [queryUser])

    async function OnFinish (values) {
        var user = {
            email: values.Email,
            password: values.Password,
            username: values.Username,
        }
        setObject(user)
        if(validateForm(values)) {
            if(values.Password === values.ConfirmPassword){
                getUser({//GraphQL to grab user with same email as the input
                    variables: {
                        email: values.Email
                    }
                })
            } else {
                message.warning('Passwords do not match.', 10)
            }
        }
    }

    if(cookies.userCookie === undefined) {
        return (
            <main className="register">
                <Form name="normal_register" className="register-form" onFinish={OnFinish} noValidate>
                    <h3 style={{textAlign:"center"}}><b>User Register</b></h3>
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
                        <a className="login-form-forgot" href="" style={{ float: "right" }}>
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
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
                    <Link to={"/"}>Redirect to Home</Link>
                </div>
            </main>
        )
    }
}