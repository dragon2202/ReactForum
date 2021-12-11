import { validateForm } from "../functions/validateForm"

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'

const { confirm } = Modal

export function OnFinish_CheckEmailAndPassword(checkEmailAndPassword, user_id, values, setInputObject) {
    //If all input in form is filled out
    if (validateForm(values)) {
        setInputObject({
            id: user_id,
            email: values.email,
            username: values.username
        })
        //mutation checks and changes user information concerning account
        checkEmailAndPassword({
            variables: {
                id: user_id,
                email: values.email,
                password: values.password
            }
        })
    }
}

export function OnFinish_CheckPassword(checkPassword, user_id, values, setInputObject) {
    //If all input in form is filled out
    if (validateForm(values)) {
        if (values.NewPassword === values.ConfirmPassword) {//Provided New Password and duplicate new password are the same
            setInputObject({
                id: user_id,
                password: values.NewPassword
            })
            //mutation checks and changes password
            checkPassword({
                variables: {
                    id: user_id,
                    password: values.Password
                }
            })
        } else {
            Message.warning({//Provided New Password and duplicate new password are the not same
                content: "New passwords don't match",
                style: {
                    marginTop: '5vh',
                },
            }, 10)
        }
    }
}

export function OnFinish_CreateQuestion(checkPassword_CreateQuestion, user_id, values, setInputObject) {
    //If all input in form is filled out
    if (validateForm(values)) {
        setInputObject({
            user_id: user_id,
            question: values.question,
            answer: values.answer
        })
        //mutation checks and changes password
        checkPassword_CreateQuestion({
            variables: {
                id: user_id,
                password: values.password
            }
        })
    }
}

export function OnFinish_UpdateQuestion(checkPassword_UpdateQuestion, user_id, values, setInputObject) {
    //If all input in form is filled out
    if (validateForm(values)) {
        setInputObject({
            user_id: user_id,
            question: values.question,
            answer: values.answer
        })
        //mutation checks and changes password
        checkPassword_UpdateQuestion({
            variables: {
                id: user_id,
                password: values.password
            }
        })
    }
}

export function OnFinish_RemoveQuestion(checkPassword_RemoveQuestion, user_id, question, values, setInputObject) {
    //If all input in form is filled out
    if (validateForm(values)) {
        setInputObject({
            user_id: user_id,
            question: question
        })
        //mutation checks and changes password
        checkPassword_RemoveQuestion({
            variables: {
                id: user_id,
                password: values.password
            }
        })
    }
}

export function UpdateConfirm(checkPassword_UpdateQuestion, question, user_id, setInputObject) {
    confirm({
        title: 'Update Security Question',
        icon: null,
        width: '700px',
        closable: true,
        okButtonProps: { style: { display: 'none' } },
        cancelButtonProps: { style: { display: 'none' } },
        content:
            <Form
                name="update-question"
                style={{ marginTop: '20px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onFinish={(values) => OnFinish_UpdateQuestion(checkPassword_UpdateQuestion, user_id, values, setInputObject)}
                initialValues={{
                    ["question"]: question
                }}
            >
                <Form.Item label="Question" name="question">
                    <Input type="text" placeholder="Enter security question" autoComplete="new-password" />
                </Form.Item>
                <Form.Item label="Answer" name="answer">
                    <Input type="text" placeholder="Enter answer to security question" autoComplete="new-password" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>

    })
}

export function RemoveConfirm(checkPassword_RemoveQuestion, question, user_id, setInputObject) {
    confirm({
        title: 'Remove Security Question: ' + question,
        icon: null,
        width: '700px',
        closable: true,
        okButtonProps: { style: { display: 'none' } },
        cancelButtonProps: { style: { display: 'none' } },
        content:
            <Form
                name="remove-question"
                style={{ marginTop: '20px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onFinish={(values) => OnFinish_RemoveQuestion(checkPassword_RemoveQuestion, user_id, question, values, setInputObject)}
            >
                <Form.Item label="Password" name="password">
                    <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>

    })
}
