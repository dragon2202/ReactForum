import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'

import { useCookies } from 'react-cookie'

import { CREATE_COMMUNITY_QUERY, CHECK_COMMUNITY_NAME_QUERY } from '../queries/posts'
import { useHistory } from 'react-router-dom'

const { TextArea } = Input

export default function CreateCommunity() {
    let history = useHistory()
    const [mutation] = useMutation(CREATE_COMMUNITY_QUERY)
    const [ communityTitle, setComTitle ] = useState('')
    const [ communityObj, setComObj ] = useState(null)
    const [ cookies ] = useCookies(['userCookie'])
    const myStorage = window.localStorage;
    const [ getTitle ] = useLazyQuery(CHECK_COMMUNITY_NAME_QUERY, {
        onCompleted: data => {setComTitle(data)}
    })

    useEffect(() => {
        if (myStorage.getItem('reload') != null) {
            Message.success({
                content: 'You have successfully create a commmunity.',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            myStorage.clear()
            history.push('/communityhome')
        }
    }, [])

    useEffect(async () => {
        if(communityTitle) {
            if(communityTitle.community.title){
                Message.warning('This community title is already taken. Input a different one.', 20) 
            } else {
                await mutation({
                    variables: {
                        communityUser: communityObj
                    }
                })
                window.location.reload()
            }
        }

    }, [communityTitle])

    
    async function onFinish (values){
        var emptyValues = 0
        //If form item title is blank on initial submit
        if(values.title === undefined || values.title === "") {
            Message.warning({
                content: 'Please fill out title',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            emptyValues++
        }
        
        //If form item summary is blank on initial submit
        if(values.summary === undefined || values.summary === "") {
            Message.warning({
                content: 'Please fill out summary',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            emptyValues++
        }

        myStorage.setItem('reload', 1)

        var communityUser = {
            title: values.title,
            summary: values.summary,
            user_id: cookies.userCookie.id
        }
        setComObj(communityUser)
        //If there are ZERO empty values
        //Mutation inserts a new community in mysql table
        if(emptyValues === 0) {
            getTitle({
                variables: {
                    name: values.title
                }
            })
        }
    }

    return (
        <div className="createcommunity">
            <h3>Create Community</h3>

            <Form className="create-community-form" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish} >
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>

                <Form.Item label="Summary" name="summary">
                    <TextArea rows={5} spellCheck="false"/>
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}