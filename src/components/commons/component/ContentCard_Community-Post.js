import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Message from 'antd/lib/message'
import Tooltip from 'antd/lib/tooltip'
import Typography from 'antd/lib/typography'
import EditOutlined from '@ant-design/icons/EditOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

import moment from 'moment'
const { Text } = Typography

const Title = ({ item }) => {
    return (
        <div>
            {<Text type='secondary'>{' Posted by ' + item.user.username + ' '}</Text>}
            {
                <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                    {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                </Tooltip>
            }
            <br />
            <span>
                <b>{item.title}</b>
            </span>
        </div>
    )
}

//Formats the post depending on which type it is
const ContentCard = ({post, user}) => {
    switch (post.type) {
        case 'Image':
            return (
                <Card 
                    key={post.id}
                    className="content"
                    type="inner"
                    title={<Title item={post}/>}
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>
                    ]}
                >
                    <img alt="" src={post.image} style={{ maxWidth: "100%" }} />
                </Card>
            )
        case 'Post':
            return (
                <Card 
                    key={post.id} 
                    className="content" 
                    type="inner" 
                    title={<Title item={post}/>}
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>
                    ]}
                >
                    <p>{post.text}</p>
                </Card>
            )
        case 'Link':
            return (
                <Card 
                    key={post.id} 
                    className="content" 
                    type="inner" 
                    title={<Title item={post}/>}
                    actions={[
                        <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>
                    ]}
                >
                    <a style={{wordWrap: 'break-word'}} href={"http://" + `${post.text}`}>{post.text}</a>
                </Card>
            )
    }
}

export default ContentCard