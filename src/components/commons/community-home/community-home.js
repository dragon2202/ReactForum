import React, {useState} from 'react'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Tooltip from 'antd/lib/tooltip'
import Search from 'antd/lib/input/Search'
import Button from 'antd/lib/button'
import { Link } from 'react-router-dom'

const genreGridStyle = {
    width: '100%',
    padding: '10px 4px 0px 4px',
    textAlign: 'center',
    cursor: 'pointer'
};

const communityGridStyle = {
    width: '100%',
    cursor: 'pointer'
};


//https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
//https://stackoverflow.com/questions/16607557/perform-join-on-value-in-array-of-objects

//Maps All communities from graphql and lists them in one page, depending on genre and/or search param
const CommunityMap = (data, contentShown, searchParam) => {
    var content = 0;
    return data.map((item, index) => {
        if (contentShown == 'All') {
            if((item.title.toLowerCase()).includes(searchParam.toLowerCase())) {
                content++;
                return (
                    <Card.Grid key={index} style={communityGridStyle}>
                        <div className="alignleft">Community Name: <Link to={"/community/" + item.id}>{item.title}</Link></div>
                        <div className="alignright">
                            Genre: {item.category.map(e => <Tooltip key={e.label} placement="left" title={e.description}><span style={{paddingRight: "10px"}}>{e.label}</span></Tooltip>)}
                        </div>
                    </Card.Grid>
                )
            }
        } else if(item.category.some(e => e.label === contentShown)) {
            if((item.title.toLowerCase()).includes(searchParam.toLowerCase())) {
                content++;
                return (
                    <Card.Grid key={index} style={communityGridStyle}>
                        <div className="alignleft">Community Name: <Link to={"/community/" + item.id}>{item.title}</Link></div>
                        <div className="alignright">
                            Genre: {item.category.map(e => <Tooltip key={e.label} placement="left" title={e.description}><span style={{paddingRight: "10px"}}>{e.label}</span></Tooltip>)}
                        </div>
                    </Card.Grid>
                )
            }
        }
        if (content == 0 && data.length == (index + 1)) {
            console.log("HOW WILL I KNOW")
            return(
                <Card.Grid key='0' style={communityGridStyle}>
                    <Empty />
                </Card.Grid>
            )
        }
    })
}

//Side Navigation for Community Page
//Shows and hides Community
export default function CommunityHome(props) {
    const [ contentShown, setContent ] = useState('All');
    const [ searchParam, setSearch ] = useState('')
    
    const handleClick = (value) => {
        setContent(value)
    }
    if(props.data.categorycommunity == undefined) {
        return(
            <Card className="content" type="inner" title="No Posts">
                <Empty />
            </Card>
        )
    }
    return (
        <div className="card-grid">
            <div className="categories">
                <Card title="Genre" style={{ width: 180, textAlign: 'center' }}>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("All") }}>All</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Action") }}>Action</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Action-Adventure") }}>Action-Adventure</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Adventure") }}>Adventure</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("MMO") }}>MMO</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Open-World") }}>Open-World</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Role-Playing") }}>Role-Playing</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Simulation") }}>Simulation</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Sports") }}>Sports</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Strategy") }}>Strategy</p>
                    </Card.Grid>
                    <Card.Grid style={genreGridStyle}>
                        <p onClick={() => { handleClick("Others") }}>Others</p>
                    </Card.Grid>
                </Card>
            </div>
            <div className="communities">
                <div className="search-reset">
                    <Search className="search" placeholder="Search Community by Name" onSearch={setSearch}/>
                    <Button className="reset"type="primary" onClick={() => {setSearch("")}}>Reset Search</Button>
                </div>
                <Card title={"Community: " + contentShown.toString()}>
                    {CommunityMap(props.data.categorycommunity, contentShown, searchParam)}
                </Card>
            </div>
        </div>

    )
}