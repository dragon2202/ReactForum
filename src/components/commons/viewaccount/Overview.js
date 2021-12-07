import { Link } from 'react-router-dom'

import Card from 'antd/lib/card'
import Comment from 'antd/lib/comment'
import Tooltip from 'antd/lib/tooltip'
import Typography from 'antd/lib/typography'
import List from 'antd/lib/list'
import MessageOutlined from '@ant-design/icons/MessageOutlined'

import moment from 'moment'
const { Text } = Typography

const Title = ({ item, user }) => {
    return (
        <div>
            <Link to={'/community/' + item.community.id}>{item.community.title}</Link>
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
                if(item.parent.id !== null && item.author_id !== item.parent.author_id) {//No parent, Parent and Child without the same author to prevent duplicate chain comments
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
                                    style={{ backgroundColor: "rgba(0, 121, 211, 0.05)", fill: 'rgb(135, 138, 140)' }}
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
                                style={{ backgroundColor: "rgba(0, 121, 211, 0.05)", fill: 'rgb(135, 138, 140)' }}
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
                <div className="content">
                    <Card
                        key={item.id}
                        type="inner"
                        className="card"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                    </Card>
                    <CommentInCard id={id} item={item.comment} />
                </div>
            )
        case 'Link':
            return (
                <div className="content">
                    <Card
                        key={item.id}
                        className="card"
                        type="inner"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <a style={{ wordWrap: 'break-word' }} href={"http://" + `${item.text}`}>{item.text}</a>
                    </Card>
                    <CommentInCard id={id} item={item.comment}/>
                </div>
            )
        case 'Image':
            return (
                <div className="content">
                    <Card
                        key={item.id}
                        className="card"
                        type="inner"
                        title={<Title item={item} user={user} />}
                        actions={[
                            <Link to={{ pathname: "/viewpost/" + item.id }}><MessageOutlined key="message" /></Link>
                        ]}
                    >
                        <img alt="" src={item.image} style={{ maxWidth: "100%" }} />
                    </Card>
                    <CommentInCard id={id} item={item.comment}/>
                </div>
            )
    }
}

const StandAloneCommentTitle = ({ item, user }) => {
    return(
        <div>
            <span>
                {user.username} commented on {item.post.title}
            </span>
            <br />
            <span>
                <Link 
                    to={'/community/' + item.post.community_id}
                    className='community_link'
                >
                    {item.post.community.title + ' '}
                </Link>
                <Text type='secondary'>
                    Posted by {item.post.user.username}
                </Text>
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
            />
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

const Overview = ({ id, posts, comments, user }) => {
    let filteredComments = comments.filter(//removes queried comments that are comments to a Post created by the viewed user, to create a Post_Card 
        comment => !posts.map(post => { return post.id }).includes(comment.post_id)
    )
    const post_comment = posts.concat(filteredComments).sort(function(a, b){
        var keyA = a.created_at,
            keyB = b.created_at
        // Compare the 2 dates
        if(keyA > keyB) {
            return -1
        }
        if(keyA < keyB) {
            return 1
        }
        return 0
    })
    return(
        <List
            className='overview-list'
            dataSource={post_comment}
            renderItem={item => (
                <List.Item>
                    <PostCommentCard id={id} isPost={(item.title) ? true : false} item={item} user={user}/>
                </List.Item>
            )}
        />
    )
}

export default Overview

//<ContentCard item={item}/>