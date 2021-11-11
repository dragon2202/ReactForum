import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './home'
import CommunityPost from './community-post'
import Community from './community'
import EditCommunity from './edit-community'
import CreateCommunity from './create-community'
import CreatePost from './create-post'
import ViewPost from './viewpost'
import Login from './user/login'
import Register from './user/register'
import Account from './user/account'
import Inbox from './user/inbox'
import ViewAccount from './user/viewAccount'

import Error from './error'
import Unauthorized from './unauthorized'

//Router for my app
export default function Router() {
    return (
        <Switch>
            <Route path='/createcommunity' component={CreateCommunity} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/community/:id' component={CommunityPost} />
            <Route path='/communityhome' component={Community} />
            <Route path='/editcommunity/:id' component={EditCommunity} />
            <Route path='/viewpost/:id' component={ViewPost} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/account' component={Account} />
            <Route path='/inbox' component={Inbox} />
            <Route path='/user/:id' component={ViewAccount} />
            <Route path='/unauthorized' component={Unauthorized} />
            <Route exact path='/' component={Home} />
            <Route component={Error} />
        </Switch>
    )
}