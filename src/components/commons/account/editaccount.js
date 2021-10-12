import React from 'react'

import List from 'antd/lib/list'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Tabs from 'antd/lib/tabs'
import Button from 'antd/lib/button'

const { TabPane } = Tabs

const EditAccount = ({ editToggle, item, OnFinish_Username_Email, user, setUserObj, ChangeUserInfo, set, localStorage }) => {
    if (editToggle) {
        return (
            <Tabs type="card">
                <TabPane tab="Username/Email" key="1">
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{
                            ["username"]: item.username,
                            ["email"]: item.email
                        }}
                        onFinish={(values) => OnFinish_Username_Email(values, item, user, setUserObj, ChangeUserInfo, set, localStorage)}
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
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Form.Item label="Password" name="password">
                            <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" placeholder="Enter New Password" autoComplete="new-password" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
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