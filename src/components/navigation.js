import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'antd/lib/avatar'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import message from 'antd/lib/message'

import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'
import { DownOutlined } from '@ant-design/icons'

//Navigation Bar options
const navLink = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Community',
        path: '/communityhome'
    }
]

//Navigation Bar Component
export default function Navigation() {
    //Set menuActive to false when loading page
    const wrapperRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false)

    const [cookies, removeCookie, set] = useCookies(['userCookie'])

    let history = useHistory()
    const login = () => history.push({
        pathname: '/login'
    })
    const register = () => history.push({
        pathname: '/register'
    })
    const home = () => history.push({
        pathname: '/home'
    })

    //below is the same as componentDidMount and componentDidUnmount
    useEffect(() => {
        document.addEventListener("click", handleOutsideClicks, true)
        return () => {
            document.removeEventListener("click", handleOutsideClicks, true)
        }
    }, [])

    const handleOutsideClicks = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setMenuActive(false)
        }
    }


    return (
        <nav className={`site-navigation ${menuActive && 'active'}`}>
            <span className="menu-title"> My Awesome Gaming React Forum </span>
            <div className="menu-content-container" ref={wrapperRef}>
                <ul>                    {
                    navLink.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    ))
                }
                </ul>
                <div className="menu-avatar-container">
                    <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                    <Dropdown placement="bottomRight" overlay={
                        cookies.userCookie == undefined || cookies.userCookie == "undefined" ? (
                            <Menu>
                                <Menu.Item key="0" onClick={() => {login()}}>
                                    Login 
                                </Menu.Item>
                                
                                <Menu.Item key="1" onClick={() => {register()}}>
                                    Register
                                </Menu.Item>
                            </Menu>
                        ) : (
                            <Menu>
                                <Menu.Item key="0" onClick={() => {console.log(cookies)}}>
                                    Account
                                </Menu.Item>
                                <Menu.Item key="1" onClick={() => {
                                    set('userCookie',{ secure: true })//Sets current user cookie to null
                                    message.success({
                                        content: 'You successfully logged out.',
                                        style: {
                                          marginTop: '5vh',
                                        },
                                    },10)
                                    home()
                                }}>
                                    Log Out
                                </Menu.Item>
                            </Menu>
                        )
                    }>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {
                                cookies.userCookie == undefined || null ? (
                                    <span className="menu-avatar-name">Guest </span>
                                ) : (
                                    <span className="menu-avatar-name">{ cookies.userCookie.user.username} </span>
                                )
                            }
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
            <i className="icon ionicons ion-ios-menu" onClick={(event) => setMenuActive(!menuActive)}> </i>
        </nav>
    )
}
/*

set('user', undefined, {secure: true, sameSite: 'none'})
set('user', "",{path: '/', sameSite:'lax',secure: true, expires: 0})
*/