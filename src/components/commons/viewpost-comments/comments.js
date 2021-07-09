import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import Comment from 'antd/lib/comment'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

import moment from 'moment'

import { CREATE_COMMENT_QUERY } from '../../../queries/posts'
import { useCookies } from 'react-cookie'

const { TextArea } = Input

const Comments = ({ commentsObj }) => {
  const parentComments = commentsObj.filter(pc => pc.parent_comment_id === null)
  const [display, setDisplay] = useState('')
  const [value, setValue] = useState('')
  const [mutation] = useMutation(CREATE_COMMENT_QUERY)
  const [cookies] = useCookies(['userCookie'])
  let { id } = useParams()

  const handleChange = (text) => {
    setValue(text.target.value)
  }
  //Handles submit for Parent Comments
  async function handleSubmit(text, parentID) {
    const comment = {
      post_id: parseInt(id),
      author_id: cookies.userCookie.user.id,
      parent_comment_id: parentID,
      comment: text
    }
    console.log(comment)
    const mutate = await mutation(
      {
          variables: {
              comment
          }
      }
    )
    window.location.reload()
  }

  //Maps All Parent Comments from database
  return parentComments.map(cObj => (
    <Comment
      actions={[(cookies.userCookie != undefined ? <span key="comment-list-reply-to-0" onClick={() => { setDisplay(display === cObj.id ? '' : cObj.id) }}>Reply to</span>: <span>Login to reply</span>)]}
      key={cObj.id}
      author={cObj.user.username}
      datetime={moment(parseInt(cObj.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}
      content={<p>{`${cObj.comment}`}</p>}
    >
      <Editor display={display === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit(value, cObj.id)} value={value} />
      <ChildComments commentsObj={commentsObj} parentID={cObj.id} handleChange={handleChange} handleSubmit={handleSubmit} value={value} cookies={cookies}/>
    </Comment>
  ))
}

//Maps all Child Comments from Parent. This all recursive calls to map children of the child comments
const ChildComments = ({ commentsObj, parentID , handleChange, handleSubmit, value, cookies}) => {
  const [display, setDisplay] = useState('')
  const childComments = commentsObj.filter(cc => cc.parent_comment_id === parentID)

  return childComments.map(cObj => (
    <Comment
      actions={[(cookies.userCookie != undefined ? <span key="comment-list-reply-to-0" onClick={() => { setDisplay(display === cObj.id ? '' : cObj.id) }}>Reply to</span>: <span>Login to reply</span>)]}
      key={cObj.id}
      author={cObj.user.username}
      datetime={moment(parseInt(cObj.updated_at)).format('dddd, MMMM Do YYYY, h:mm:ss a')}
      content={<p>{`${cObj.comment}`}</p>}
    >
      <Editor display={display === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit(value, cObj.id)} value={value} />
      <ChildComments commentsObj={commentsObj} parentID={cObj.id} handleChange={handleChange} handleSubmit={handleSubmit} value={value} cookies={cookies}/>
    </Comment>
  ))

}

const Editor = ({ display, EditorKey, onChange, onSubmit}) => {
  if (display === false) {
    return null
  } else {
    return (
      <Form key={EditorKey}>
        <Form.Item >
          <TextArea className="editor" rows={4} onChange={onChange}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" onClick={onSubmit}>
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Comments

//https://stackoverflow.com/questions/65238595/how-do-i-hide-and-show-components-with-usestate-or-conditional-rendering-in-reac
//https://levelup.gitconnected.com/per-my-last-comment-creating-reply-threads-in-your-react-rails-app-d8334a00dfa1
