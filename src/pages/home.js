import React, {useState} from 'react'
import Post from '../components/commons/post/index'
import CreatePostNav from '../components/commons/navigation/create-post-nav'
import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Search from 'antd/lib/input/Search'
import Button from 'antd/lib/button'

import { GetGraphqlQueryID } from '../components/commons/functions/getgraphqlquery'
import { GET_POSTS_RECENT_QUERY, GET_ALL_COMMUNITIES_QUERY } from '../queries/posts'


const communityGridStyle = {
    width: '100%',
    cursor: 'pointer'
};
// Takes Graphql Data and maps it to a new array for the Card Grid
const CommunityMap = (data, searchParam) => {
    if (data == undefined) {
        return(
            <Card.Grid key='0' style={communityGridStyle}>
                <Empty />
            </Card.Grid>
        )
    }
    return data.map((item, index) => {
        if(index < 8) {//set community render limit
            if (data.length != 0) {
                if((item.title.toLowerCase()).includes(searchParam.toLowerCase())) {
                    return (
                        <Card.Grid key={item.id} style={communityGridStyle} >
                            <div className="alignleft">Community Name: <Link to={"/community/" + item.id}>{item.title}</Link></div>
                            <div className="alignright">Genre: {item.id}</div>
                        </Card.Grid>
                    )
                }
            } else {
                return(
                    <Card.Grid key='0' style={communityGridStyle}>
                        <Empty />
                    </Card.Grid>
                )

            }
        }
    })
}

export default function Home() {
    const [ searchParam, setSearch ] = useState('')
    return (
        <main className="home">
            <section className="container">
                <div className="row">
                    <h3><b>Home Page</b></h3>
                    <div className="masonry-card-grid">
                        <div className="nested-section">
                            <section className="create-post-nav">
                                <CreatePostNav />
                            </section>
                            <section className="post-card">
                                <Post data={GetGraphqlQueryID(0, GET_POSTS_RECENT_QUERY).post} />
                            </section>
                        </div>
                        <div className="community-card">
                            <div className="search-reset">
                                <Search className="search" placeholder="Search Community" onSearch={setSearch}/>
                                <Button className="reset"type="primary" onClick={() => {setSearch("")}}>Reset Search</Button>
                            </div>
                            <Card title={"Community"}>
                                {CommunityMap(GetGraphqlQueryID(0, GET_ALL_COMMUNITIES_QUERY).community, searchParam)}
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

//https://www.youtube.com/watch?v=IxxstCcJlsc
//Find Communities page
//@media scss
//change icons on card
//search cards using keys