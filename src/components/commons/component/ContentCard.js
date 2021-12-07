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
            <Link to={'/community/' + item.community.id}>{item.community.title}</Link>
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
const ContentCard = ({ item, refetch }) => {
    switch (item.type) {
        case 'Post':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={item} refetch={refetch}/>
                    <Card
                        key={item.id}
                        className="content"
                        type="inner"
                        title={<Title item={item}/>}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                    </Card>
                </div>
            )
        case 'Link':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={item} refetch={refetch}/>
                    <Card
                        key={item.id}
                        className="content"
                        type="inner"
                        title={<Title item={item}/>}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <a style={{ wordWrap: 'break-word' }} href={"http://" + `${item.text}`}>{item.text}</a>
                    </Card>
                </div>
            )
        case 'Image':
            return (
                <div className='container'>
                    <Post_Like_Dislike post={item} refetch={refetch}/>
                    <Card
                        key={item.id}
                        className="content"
                        type="inner"
                        title={<Title item={item}/>}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <img alt="" src={item.image} style={{ maxWidth: "100%" }} />
                    </Card>
                </div>
            )
    }
}

export default ContentCard