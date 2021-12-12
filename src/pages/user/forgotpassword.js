import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import MailOutlined from '@ant-design/icons/MailOutlined'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Message from 'antd/lib/message'

import { GET_USER_BY_EMAIL, GET_SECURITY_QUESTIONS_BY_AUTHOR_ID, CHECK_QUESTION, CHANGE_USER_PASSWORD } from '../../queries/posts'

//gets random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//gets user by email for provided email for forgot password
function OnFinish_Email(getUserByEmail, email) {
    getUserByEmail({
        variables: {
            email: email
        }
    })
}
//checks security question and answer
function OnFinish_ResetPassword(checkQuestion, query, answer) {
    checkQuestion({
        variables: {
            user_id: query.user_id,
            question: query.question,
            answer: answer
        }
    })
}

export default function Forgot() {
    const [query, setQuery] = useState(null)
    const [randomNum, setRandom] = useState(null)
    const history = useHistory()
    const [changePassword] = useMutation(CHANGE_USER_PASSWORD)//mutation to change password
    const [getQuestions] = useLazyQuery(GET_SECURITY_QUESTIONS_BY_AUTHOR_ID, {//gets questions from provided user id
        onCompleted: async (result) => {
            setQuery(result)
        },
        fetchPolicy: "network-only"
    })

    const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL, {//gets user by email
        onCompleted: async (result) => {
            if(result.user.id !== null) {
                getQuestions({//calls get questions to grab questions with user id provided by email query call
                    variables: {
                        id: result.user.id
                    }
                })
            } else {
                Message.error({
                    content: 'No Account has been found with provided input',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: "network-only"
    })

    const [checkQuestion] = useLazyQuery(CHECK_QUESTION, {//checks questions
        onCompleted: async (results) => {
            if(results.security_question.user_id !== null) {
                changePassword({//resets to generic password to reset later on by user
                    variables: {
                        user: {
                            id: results.security_question.user_id,
                            password: "password"
                        }
                    }
                })
                Message.success({
                    content: 'Your password has been reset. Use "password" to login. Go to account settings to change it to a new one.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 20)
                history.push('/login')
            } else { 
                Message.error({
                    content: 'Wrong Answer. Try again',
                    style: {
                        marginTop: '5vh',
                    },
                }, 6)
            }
        },
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        if(query !== null && query.user !== null) {
            setRandom(getRandomInt(query.security_questions.length))//set universal random number based of length of all user's questions
        }
    },[query])

    //if no queried data and no random number assigned. 
    if(query !== null && randomNum !== null) {
        return (
            <main className="forgot">
                <Form 
                    name="forgot"
                    className="forgot-form" 
                    initialValues={{ ["email"]: query.email}}
                    onFinish={(values) => OnFinish_ResetPassword(checkQuestion, query.security_questions[randomNum], values.answer)}
                >
                    <h3 style={{ textAlign: "center" }}><b>Forgot Password</b></h3>
                    <Form.Item>
                        <div>Security Question: {query.security_questions[randomNum].question}</div>
                    </Form.Item>
                    <Form.Item name='answer'>
                        <Input placeholder="Please input your answer" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="forgot-form-button">
                            Reset Password
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <span><Link to={"/login"}>Login!</Link></span>
                        <Link to={"/register"} style={{ float: "right" }}>
                            Register!
                        </Link>
                    </Form.Item>
                </Form>
            </main>
        )
    }
    //default view. so user can input their email and get their security question
    return (
        <main className="forgot">
            <Form name="forgot" className="forgot-form" onFinish={(values) => OnFinish_Email(getUserByEmail, values.email)}>
                <h3 style={{ textAlign: "center" }}><b>Forgot Password</b></h3>
                <Form.Item name="email">
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Please input your email!" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="forgot-form-button">
                        Forgot Password
                    </Button>
                </Form.Item>
                <Form.Item>
                    <span><Link to={"/login"}>Login!</Link></span>
                    <Link to={"/register"} style={{ float: "right" }}>
                        Register!
                    </Link>
                </Form.Item>
            </Form>
        </main>
    )
}