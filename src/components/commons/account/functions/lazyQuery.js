import { useLazyQuery } from '@apollo/react-hooks'
import Message from 'antd/lib/message'

import { isLiteralObject } from '../../../commons/functions/isLiteralObject'
import { CHECK_CREDENTIALS_QUERY, CHECK_USER_EMAIL_QUERY } from '../../../../queries/posts'

//Checks if all form inputs are not blank
function validateForm(object) {
    var count = 0
    for (const property in object) {
        if (object[property] === undefined || object[property] === "") {
            Message.warning('Please fill out ' + `${property}`, 10)
            count++
        }
    }
    if (count > 0) {
        return false
    } else {
        return true
    }
}

export async function OnFinish_Username_Email(values, item, user, setUserObj, ChangeUserInfo, set, localStorage) {
    const [checkCredentials] = useLazyQuery(CHECK_CREDENTIALS_QUERY, {
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

    const [getUser] = useLazyQuery(CHECK_USER_EMAIL_QUERY, {
        onCompleted: async (data) => {
            if(isLiteralObject(data)){
                if(data.user.email) {
                    Message.warning({
                        content: 'Email Taken. Try another email address.',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                } else {
                    localStorage.setItem('reload', 1)
                    await ChangeUserInfo({
                        variables: {
                            user
                        }
                    })
                    delete user.password
                    set('userCookie', user, { path: '/', sameSite: 'lax', secure: true, expires: 0 })//Set cookie for users
                    window.location.reload()
                }
            }
        }
    })
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
                email: values.email,
                password: values.password
            }
        })
    }
}