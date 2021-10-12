import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import Descriptions from 'antd/lib/descriptions'

import { useCookies } from 'react-cookie'

import { GET_USER_QUERY } from '../../queries/posts'
import { isLiteralObject } from '../../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID } from '../../components/commons/functions/getgraphqlquery'

export default function EditAccount() {
    let { id } = useParams()
    let query = GetGraphqlQueryID(id, GET_USER_QUERY)
    const [cookies] = useCookies(['userCookie'])

    //If user is not logged in or  return a page with error
    if (cookies.userCookie === undefined || cookies.userCookie.id !== parseInt(id)) {
        return (
            <Redirect to="/unauthorized" />
        )
    }

    //If query from graphql is not available return a page with loading...
    if (!isLiteralObject(query)) {
        return (
            <main className="account">
                <h3><b>Account</b></h3>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="editaccount">
            <h3 className="header"><b>Edit Account</b></h3>
            <Descriptions title="User Info" layout="vertical" bordered>
                <Descriptions.Item label="Email">{query.user.email}</Descriptions.Item>
                <Descriptions.Item label="Username">{query.user.username}</Descriptions.Item>
                <Descriptions.Item label="Password">{query.user.password}</Descriptions.Item>
            </Descriptions>
        </main>
    )
}