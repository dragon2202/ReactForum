import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MailOutlined from '@ant-design/icons/MailOutlined'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

export default function Forgot() {
    const [username, setUsername] = useState(null)
    return (
        <main className="forgot">
            <Form name="forgot" className="forgot-form" onFinish={(values) => console.log(values)}>
                <h3 style={{ textAlign: "center" }}><b>Forgot Password</b></h3>
                <Form.Item name="email">
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Please input your email!" />
                </Form.Item>
                <Form.Item>
                    <span><Link to={"/login"}>Login!</Link></span>
                    <Link to={"/register"} style={{ float: "right" }}>
                        Register!
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="forgot-form-button">
                        Sign Up!
                    </Button>
                </Form.Item>
            </Form>
        </main>
    )
}