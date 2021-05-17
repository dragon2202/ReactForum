import React from 'react'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Tooltip from 'antd/lib/tooltip'

//Checks if type is object
function isLiteralObject (a) {
    return (!!a) && (a.constructor === Object);
}
//Exports a List of cards containing communities to the community post page
export default function AboutCommunity(props) {
    if (isLiteralObject(props.data)) {//if props.data is an object
        return (
            <Card title={"Description: " + props.data.title}>
                <div>Genre: {props.data.category.map(e => <Tooltip key={e.label} placement="left" title={e.description}><span style={{paddingRight: "10px"}}>{e.label}</span></Tooltip>)}</div>
                <br/>
                <p>{props.data.summary}</p>
            </Card>
        )
    } else {
        return(
            <Card title="No Data">
                <Empty />
            </Card>
        )
    }
}