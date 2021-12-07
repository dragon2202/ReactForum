import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Card from 'antd/lib/card'

//Components
import LoginOrRegister from '../components/commons/LoginOrRegister/login-or-register'
import CreatePostForm from '../components/commons/create-post/createpost-form'
import Community_Rules_Card from '../components/commons/create-post/createpost_community_rules'
import Dropdown_Community from '../components/commons/create-post/dropdown_community'
import CreatePost_Menu from '../components/commons/create-post/createpost_menu'

import { useCookies } from 'react-cookie'
import { isLiteralObject } from '../components/commons/functions/isLiteralObject'
import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_COMMUNITYUSERROLE_BY_USER } from '../queries/posts'

export default function CreatePost() {
    const location = useLocation()
    const [ cookies ] = useCookies(['userCookie'])
    const [ currentMenu, setMenu ] = useState('Post')
    const [ community, setCommunity ] = useState('')
    let query = (isLiteralObject(cookies.userCookie)) ? GetGraphqlQueryID(cookies.userCookie.id, GET_COMMUNITYUSERROLE_BY_USER) : null

    useEffect(() => {
        if (location.state) {//if location is undefined
            setMenu(location.state.item)
        }
    }, [location])

    if (!isLiteralObject(cookies.userCookie)) {
        return (
            <main className="createpost">
                <h3>Create Post</h3>
                <LoginOrRegister />
            </main>
        )
    }

    if (!isLiteralObject(query)) {
        return (
            <main className="createpost">
                <h3>Create Post</h3>
                <p style={{ textAlign: 'center' }}>Loading...</p>
            </main>
        )
    }

    return (
        <main className="createpost">
            <div className='createpost_community_rules'>
                <div className='createpost-wrapper'>
                    <div className='header'>Create a Post</div>
                    <hr className='horizontal-rule'/>
                    <Dropdown_Community communityQuery={query.communityuserrole} community={community} setCommunity={setCommunity}/>
                    <Card className='createpost_card'>
                        <CreatePost_Menu setMenu={setMenu} currentMenu={currentMenu}/>
                        <CreatePostForm type={currentMenu} community={community} author_id={cookies.userCookie.id}/>
                    </Card>
                </div>
                <Community_Rules_Card item={query.communityuserrole.find(item => item.community.id === community.id)}/>
            </div>
        </main>
    )
}