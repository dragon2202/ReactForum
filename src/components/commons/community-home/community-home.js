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

const CommunityHome = ({ item, setHovered }) => {
    const [searchParam, setSearch] = useState('')
    const [cookies] = useCookies(['userCookie'])

    return (
        <div className="card-grid">
            <div className="communities-list">
                <Card title="Community" extra={(cookies.userCookie == undefined) ? null : <Link to={"/createcommunity"}> Create a community</Link>}>
                    <List
                        header={<Input className="search" placeholder="Search Community by Name" onChange={(e) => { setSearch(e.target.value) }} />}
                        itemLayout="vertical"
                        size="large"
                        className="community-list"
                        pagination={{
                            position: 'bottom',
                            pageSize: 10
                        }}
                        dataSource={item}
                        renderItem={item => (
                            ((item.title.toLowerCase()).includes(searchParam.toLowerCase())) ?
                            <List.Item key={item.id}>
                                <Link to={"/community/" + item.id} onMouseEnter={() => setHovered({ title: item.title, summary: item.summary})}>{item.title}</Link>
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

export default CommunityHome