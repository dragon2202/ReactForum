import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Tooltip from 'antd/lib/tooltip'
import Typography from 'antd/lib/typography'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

import Post_Like_Dislike from './Post_Like_Dislike'

import moment from 'moment'
const { Text } = Typography

const Title = ({ item }) => {
    return (
        <div>
            {<Text type='secondary'>{' Posted by '} <Link to={'/user/' + item.user.id}>{item.user.username}</Link> {' '}</Text>}
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
const ContentCard = ({post, refetch}) => {
    switch (post.type) {
        case 'Image':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={post} refetch={refetch}/>
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
                </div>
            )
        case 'Post':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={post} refetch={refetch}/>
                    <Card
                        key={post.id}
                        className="content"
                        type="inner"
                        title={<Title item={post}/>}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>{post.text}</p>
                    </Card>
                </div>
            )
        case 'Link':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={post} refetch={refetch}/>
                    <Card
                        key={post.id}
                        className="content"
                        type="inner"
                        title={<Title item={post}/>}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + post.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <a style={{ wordWrap: 'break-word' }} href={"http://" + `${post.text}`}>{post.text}</a>
                    </Card>
                </div>
            )
    }
}

export default ContentCard