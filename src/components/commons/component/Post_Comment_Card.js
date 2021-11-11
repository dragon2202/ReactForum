import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Comment from 'antd/lib/comment'
import Tooltip from 'antd/lib/tooltip'
import Typography from 'antd/lib/typography'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

import moment from 'moment'
const { Text } = Typography

const Title = ({ item, user }) => {
    return (
        <div>
            <Link to={'/viewpost/' + item.community.id}>{item.community.title}</Link>
            {<Text type='secondary'>{' Posted by ' + user.username + ' '}</Text>}
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

const CommentInCard = ({ id, item }) => {
    return (
        item.map(item => {
            if(item.author_id === id) {
                if(item.parent.id !== null && item.author_id !== item.parent.author_id) {
                    return(
                        <Card type="inner" className="commentincard" key={"child" + item.parent.id}>
                            <Comment
                                key={item.parent.id}
                                author={item.parent.user.username}
                                content={item.parent.comment}
                                datetime={
                                    <Tooltip placement="top" title={moment(parseInt(item.parent.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                                        {moment(moment(parseInt(item.parent.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                                    </Tooltip>
                                }
                            >
                                <Comment
                                    author={item.user.username}
                                    content={item.comment}
                                    datetime={
                                        <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                                            {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                                        </Tooltip>
                                    }
                                />
                            </Comment>
                        </Card>
                    )
                } else {
                    return(
                        <Card type="inner" className="commentincard" key={"child" + item.id}>
                            <Comment
                                author={item.user.username}
                                content={item.comment}
                                datetime={
                                    <Tooltip placement="top" title={moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}>
                                        {moment(moment(parseInt(item.created_at)).format('MMMM Do YYYY, h:mm a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
                                    </Tooltip>
                                }
                            />
                        </Card>
                    )
                }
            }
        })
    )
}

//Formats the post depending on which type it is
const ContentCard = ({ id, item, user }) => {
    switch (item.type) {
        case 'Post':
            return (
                <Card className="content">
                    <Card
                        key={item.id}
                        type="inner"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                    </Card>
                    <CommentInCard id={id} item={item.comment} />
                </Card>
            )
        case 'Link':
            return (
                <Card className="content">
                    <Card
                        key={item.id}
                        className="content"
                        type="inner"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <a style={{ wordWrap: 'break-word' }} href={"http://" + `${item.text}`}>{item.text}</a>
                    </Card>
                    <CommentInCard id={id} item={item.comment}/>
                </Card>
            )
        case 'Image':
            return (
                <Card className="content">
                    <Card
                        key={item.id}
                        className="content"
                        type="inner"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <img alt="" src={item.image} style={{ maxWidth: "100%" }} />
                    </Card>
                    <CommentInCard id={id} item={item.comment}/>
                </Card>
            )
    }
}

const StandAloneCommentTitle = ({ item, user }) => {
    return(
        <div>
            <span>{user.username} commented on {item.post.title}</span>
            <br />
            <span>
                <Link to={'/community/' + item.post.community_id}>{item.post.community.title}</Link><Text type='secondary'> Posted by {item.post.user.username}</Text>
            </span>
        </div>
    )
}

const StandAloneComment = ({ item, user }) => {
    return (
        <Card className='comment_tree_card'>
            <StandAloneCommentTitle item={item} user={user}/>
            <Comment
                actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                author={<a>{user.username}</a>}
                content={<p>{item.comment}</p>}
            >
            </Comment>
        </Card>
    )
}

const PostCommentCard = ({ id, isPost, item, user }) => {
    if (isPost) {
        return (
            <ContentCard id={id} item={item} user={user} />
        )
    } else {
        return (
            <StandAloneComment item={item} user={user} />
        )
    }
}

export default PostCommentCard

//<ContentCard item={item}/>