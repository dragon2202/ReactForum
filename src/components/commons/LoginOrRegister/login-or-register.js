import React from 'react'
import { Link } from 'react-router-dom'
import Card  from 'antd/lib/card'
import Button from 'antd/lib/button'

const LoginOrRegister = ({}) => {
    return (
        <Card className={"LoginOrRegister"}>
            <div style={{ float: 'left', marginLeft: '20px', marginTop: '5px' }}>
                <span>Login or sign up to access this content</span>
            </div>
            <div style={{ float: 'right', marginRight: '20px' }}>
                <Button style={{ marginRight: '10px' }}><Link to={"/login"}>Login Page</Link></Button>
                <Button style={{ marginLeft: '10px' }} type="primary"><Link to={"/register"}>Register Page</Link></Button>
            </div>
        </Card>
    )
} 

export default LoginOrRegister