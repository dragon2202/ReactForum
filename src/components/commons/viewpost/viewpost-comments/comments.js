import React, { useEffect, useState, useRef } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import Comment from 'antd/lib/comment'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'

import moment from 'moment'

import { CREATE_COMMENT, GET_FAMILY_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT, DELETE_PARENT_COMMENT } from '../../../../queries/posts'
import { useCookies } from 'react-cookie'

const { TextArea } = Input
const { confirm } = Modal

const Comments = ({ commentsObj, refetch, active }) => {
  const parentComments = commentsObj.filter(pc => pc.parent_comment_id === null)
  const [display, setDisplay] = useState('')
  const [editDisplay, setEditDisplay] = useState('')
  const [value, setValue] = useState('')
  const [cookies] = useCookies(['userCookie'])
  const [mutation] = useMutation(CREATE_COMMENT)
  const [editMutation] = useMutation(UPDATE_COMMENT)
  const [deleteMutation] = useMutation(DELETE_COMMENT)
  const [deleteParentMutation] = useMutation(DELETE_PARENT_COMMENT)
  let { id } = useParams()
  const myStorage = window.localStorage;

  const [familyComment, setFamilyComment] = useState(null)
  const [checkParenthood] = useLazyQuery(GET_FAMILY_COMMENTS, {
    onCompleted: data => {
      setFamilyComment(data.comment)
    }
  })

  useEffect(() => {
    if (myStorage.getItem('reload') !== null) {
      Message.success({
        content: 'Comment has been deleted',
        style: {
          marginTop: '5vh',
        },
      }, 10)
      myStorage.clear()
    }
  }, [])

  useEffect(async () => {
    if (familyComment !== null) {
      if (familyComment.child.length === 0) {
        //Has Child
        myStorage.setItem('reload', 1)
        await deleteMutation({
          variables: {
            comment: {
              id: familyComment.id
            }
          }
        })
        if (familyComment.parent.id !== null) {
          //Has Parent Comment
          if (familyComment.parent.comment === null) {
            //Parent Comment has been previously deleted
            //1: Recursive call to check if parent comment has a parent commend, the selected comment's grandparent, then delete all deleted parents
            checkParenthood({
              variables: {
                id: parseInt(familyComment.parent.id)
              }
            })
          } else {
            //3: if comment is previously deleted but has an existing parent
            window.location.reload()
          }
        } else {
          //If no Parent Comment
          //2: if comment is previously deleted but has an deleted parent
          window.location.reload()
        }
      } else {
        myStorage.setItem('reload', 1)
        await deleteParentMutation({
          variables: {
            comment: {
              id: familyComment.id
            }
          }
        })
        window.location.reload()
      }
    }
  }, [familyComment])

  function showConfirm(id) {
    confirm({
      title: 'Are you sure you want to delete this comment?',
      content: 'Note: Parent comments will not be deleted until the child comments are deleted as well',
      onOk() {
        handleDeleteSubmit(id)
      },
      width: '125vh'
    })
  }

  const handleChange = (text) => {
    setValue(text.target.value)
  }
  //Handles submit for Parent Comments
  async function handleSubmit(text, parentID) {
    const comment = {
      post_id: parseInt(id),
      author_id: cookies.userCookie.id,
      parent_comment_id: parentID,
      comment: text
    }
    await mutation({ variables: { comment } })

    Message.success({
      content: 'Comment has been created',
      style: {
        marginTop: '5vh',
      },
    }, 10)
    refetch()
  }

  //Handles submit for edit comments
  async function handleEditSubmit(text, passedID) {
    const comment = {
      id: parseInt(passedID),
      comment: text,
      updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
    }
    await editMutation({ variables: { comment } })
    Message.success({
      content: 'Comment has been sucessfully edited.',
      style: {
        marginTop: '5vh',
      },
    }, 10)
    refetch()
  }

  //Handles submit for Parent Comments
  async function handleDeleteSubmit(id) {
    checkParenthood({
      variables: {
        id: parseInt(id)
      }
    })
  }

  //Maps All Parent Comments from database
  return parentComments.map(cObj => (
    <Comment
      actions={[
        (cookies.userCookie !== undefined) ?
          (active === 1) ?
            <div>
              <span style={{ cursor: 'pointer' }} key={"comment-list-reply-to-" + cObj.id.toString()} onClick={() => { setDisplay(display === cObj.id ? '' : cObj.id) }}>
                Reply
              </span>
              {(cookies.userCookie.id == cObj.author_id) ?
                <span>
                  <span style={{ marginLeft: "5px", cursor: 'pointer' }} key={"comment-list-edit-" + cObj.id.toString()} onClick={() => { setEditDisplay(editDisplay === cObj.id ? '' : cObj.id) }}>
                    Edit
                  </span>
                  <span style={{ marginLeft: "5px", cursor: 'pointer' }} key={"comment-list-delete-" + cObj.id.toString()} onClick={() => { showConfirm(cObj.id) }}>
                    Delete
                  </span>
                </span> : null
              }
            </div>
            :
            <span>Post has been locked. It cannot be changed at this time.</span>
          :
          <span>Login to reply</span>
      ]}
      key={cObj.id}
      author={cObj.user.username}
      datetime={moment(parseInt(cObj.updated_at)).format('MMMM Do YYYY, h:mm:ss a')}
      content={(editDisplay === cObj.id) ?
        <Editor display={editDisplay === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleEditSubmit(value, cObj.id)} defaultValue={cObj.comment} />
        :
        (cObj.comment == null) ? <p style={{ fontWeight: 'bold' }}>This post is unavailable or deleted</p> : <p>{cObj.comment}</p>
      }
    >
      <Editor display={display === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit(value, cObj.id)} value={value} defaultValue={""} />
      <ChildComments commentsObj={commentsObj} parentID={cObj.id} handleChange={handleChange} handleSubmit={handleSubmit} handleEditSubmit={handleEditSubmit} showConfirm={showConfirm} value={value} cookies={cookies} active={active} />
    </Comment>
  ))
}

//Maps all Child Comments from Parent. This all recursive calls to map children of the child comments
const ChildComments = ({ commentsObj, parentID, handleChange, handleSubmit, handleEditSubmit, showConfirm, value, cookies, active }) => {
  const [display, setDisplay] = useState('')
  const [editDisplay, setEditDisplay] = useState('')
  const childComments = commentsObj.filter(cc => cc.parent_comment_id === parentID)

  return childComments.map(cObj => (
    <Comment
      actions={[
        (cookies.userCookie !== undefined) ?
          (active === 1) ?
            <div>
              <span style={{ cursor: 'pointer' }} key={"comment-list-reply-to-" + cObj.id.toString()} onClick={() => { setDisplay(display === cObj.id ? '' : cObj.id) }}>
                Reply
              </span>
              {(cookies.userCookie.id == cObj.author_id) ?
                <span>
                  <span style={{ marginLeft: "5px", cursor: 'pointer' }} key={"comment-list-edit-" + cObj.id.toString()} onClick={() => { setEditDisplay(editDisplay === cObj.id ? '' : cObj.id) }}>
                    Edit
                  </span>
                  <span style={{ marginLeft: "5px", cursor: 'pointer' }} key={"comment-list-delete-" + cObj.id.toString()} onClick={() => { showConfirm(cObj.id) }}>
                    Delete
                  </span>
                </span> : null
              }
            </div>
            :
            <span>Post has been locked. It cannot be changed at this time.</span>
          :
          <span>Login to reply</span>
      ]}
      key={cObj.id}
      author={cObj.user.username}
      datetime={moment(parseInt(cObj.updated_at)).format('MMMM Do YYYY, h:mm:ss a')}
      content={(editDisplay === cObj.id) ?
        <Editor display={editDisplay === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleEditSubmit(value, cObj.id)} defaultValue={cObj.comment} />
        :
        (cObj.comment == null) ? <p style={{ fontWeight: 'bold' }}>This post is unavailable or deleted</p> : <p>{cObj.comment}</p>
      }
    >
      <Editor display={display === cObj.id ? true : false} EditorKey={cObj.id} onChange={(e) => handleChange(e)} onSubmit={() => handleSubmit(value, cObj.id)} value={value} defaultValue={""} />
      <ChildComments commentsObj={commentsObj} parentID={cObj.id} handleChange={handleChange} handleSubmit={handleSubmit} handleEditSubmit={handleEditSubmit} showConfirm={showConfirm} value={value} cookies={cookies} active={active} />
    </Comment>
  ))

}

const Editor = ({ display, EditorKey, onChange, onSubmit, defaultValue }) => {
  if (display === false) {
    return null
  } else {
    return (
      <Form key={EditorKey}>
        <Form.Item >
          <TextArea className="editor" rows={4} onChange={onChange} defaultValue={defaultValue} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Comments

//https://stackoverflow.com/questions/65238595/how-do-i-hide-and-show-components-with-usestate-or-conditional-rendering-in-reac
//https://levelup.gitconnected.com/per-my-last-comment-creating-reply-threads-in-your-react-rails-app-d8334a00dfa1
