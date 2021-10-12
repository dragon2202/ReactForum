import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import List from 'antd/lib/list'
import Card from 'antd/lib/card'
import Input from 'antd/lib/input/Input'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'

import { useCookies } from 'react-cookie'

//https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
//https://stackoverflow.com/questions/16607557/perform-join-on-value-in-array-of-objects

//Side Navigation for Community Page
//Shows and hides Community
export default function CommunityHome(props) {
    const [searchParam, setSearch] = useState('')
    const [cookies] = useCookies(['userCookie'])

    return (
        <div className="card-grid">
            <div className="communities">
                <span className="search-reset">
                    <Input className="search" placeholder="Search Community by Name" onChange={(e) => { setSearch(e.target.value) }} />
                </span>
                <Card title="Community" extra={(cookies.userCookie == undefined) ? null : <Link to={"/createcommunity"}> Create a community</Link>}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        className="community-list"
                        pagination={{
                            position: 'bottom',
                            pageSize: 10
                        }}
                        dataSource={props.data}
                        renderItem={item => (
                            ((item.title.toLowerCase()).includes(searchParam.toLowerCase())) ?
                            <List.Item key={item.id}>
                                <div><Link to={"/community/" + item.id}>{item.title}</Link></div>
                            </List.Item>
                            :
                            null
                        )}
                    >
                    </List>
                </Card>
            </div>
        </div>

    )
}