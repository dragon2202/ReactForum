import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined'
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined'

import Message from 'antd/lib/message'

import { CHECK_POST_UPVOTE, CHECK_POST_DOWNVOTE, POST_UPVOTE, POST_DOWNVOTE, REMOVE_POST_UPVOTE, REMOVE_POST_DOWNVOTE } from '../../../queries/posts'
import { useCookies } from 'react-cookie'

async function OnFinish_CheckPost_Upvote_Downvote(check, mutation, refetch, author_id, post_id) {
    await check({
        variables: {
            post_id: post_id,
            author_id: author_id
        }
    })
    await mutation({
        variables: {
            post_upvote_downvote: {
                post_id: post_id,
                author_id: author_id
            }
        }
    })
    refetch()
}

async function OnFinish_Remove(removeMutation, refetch, author_id, post_id) {
    await removeMutation({
        variables: {
            post_upvote_downvote: {
                post_id: post_id,
                author_id: author_id
            }
        }
    })
    refetch()
}

async function OnFinish(upvote_downvote_mutation, refetch, author_id, post_id) {
    await upvote_downvote_mutation({
        variables: {
            post_upvote_downvote: {
                post_id: post_id,
                author_id: author_id
            }
        }
    })
    refetch()
}

const Post_Like_Dislike = ({ post, refetch }) => {
    const [postUpVote] = useMutation(POST_UPVOTE)//Like for post
    const [removePostUpvote] = useMutation(REMOVE_POST_UPVOTE)
    const [checkPostDownvote] = useLazyQuery(CHECK_POST_DOWNVOTE)

    const [postDownVote] = useMutation(POST_DOWNVOTE)//Dislike for post
    const [removePostDownvote] = useMutation(REMOVE_POST_DOWNVOTE)
    const [checkPostUpvote] = useLazyQuery(CHECK_POST_UPVOTE)

    const [cookies] = useCookies(['userCookie'])
    //If user is not logged in 
    if (cookies.userCookie === undefined) {
        return (
            <div className='like_dislike'>
                <span>
                    <ArrowUpOutlined onClick={() => 
                        Message.warning({
                            content: "Login to like post",
                            style: {
                                marginTop: '10vh',
                            },
                        }, 10)}
                    />
                </span>
                <span>{post.post_upvotes.length - post.post_downvotes.length}</span>
                <span>
                    <ArrowDownOutlined onClick={() => 
                        Message.warning({
                            content: "Login to dislike post",
                            style: {
                                marginTop: '10vh',
                            },
                        }, 10)}
                     />
                </span>
            </div>
        )
    }

    if (post.post_upvotes.find((item) => item.author_id === cookies.userCookie.id)) {
        return(
            <div className='like_dislike'>
                <span>
                    <ArrowUpOutlined
                        style={{ 
                            color: '#065fd4'
                        }} 
                        onClick={() => {
                            OnFinish_Remove(removePostUpvote, refetch, cookies.userCookie.id, post.id)
                        }}
                    />
                </span>
                <span>
                    {post.post_upvotes.length - post.post_downvotes.length}
                </span>
                <span>
                    <ArrowDownOutlined onClick={() => OnFinish_CheckPost_Upvote_Downvote(checkPostUpvote, postDownVote, refetch, cookies.userCookie.id, post.id)}/>
                </span>
            </div>
        )
    }

    if (post.post_downvotes.find((item) => item.author_id === cookies.userCookie.id)) {
        return(
            <div className='like_dislike'>
                <span>
                    <ArrowUpOutlined onClick={() => OnFinish_CheckPost_Upvote_Downvote(checkPostDownvote, postUpVote, refetch, cookies.userCookie.id, post.id)}/>
                </span>
                <span>
                    {post.post_upvotes.length - post.post_downvotes.length}
                </span>
                <span>
                    <ArrowDownOutlined
                        style={{ 
                            color: '#065fd4'
                        }} 
                        onClick={() => {
                            OnFinish_Remove(removePostDownvote, refetch, cookies.userCookie.id, post.id)
                        }}
                    />
                </span>
            </div>
        )
    }
    return (
        <div className='like_dislike'>
            <span>
                <ArrowUpOutlined onClick={() => OnFinish(postUpVote, refetch, cookies.userCookie.id, post.id)}/>
            </span>
            <span>
                {post.post_upvotes.length - post.post_downvotes.length}
            </span>
            <span>
                <ArrowDownOutlined onClick={() => OnFinish(postDownVote, refetch, cookies.userCookie.id, post.id)}/>
            </span>
        </div>
    )
}

export default Post_Like_Dislike