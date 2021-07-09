import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './home'
import CommunityPost from './community-post'
import Community from './community'
import EditPost from './edit-post'
import CreatePost from './create-post'
import ViewPost from './viewpost'
import Error from './error'
import Login from './user/login'
import Register from './user/register'

//Router for my app
export default function Router() {
    return (
        <Switch>
            <Route path='/error' component={Error} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/editpost/:id' component={EditPost} />
            <Route path='/editpost/' component={EditPost} />
            <Route path='/community/:id' component={CommunityPost} />
            <Route path='/communityhome' component={Community} />
            <Route path='/viewpost/:id' component={ViewPost} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/' component={Home} />
        </Switch>
    )
}