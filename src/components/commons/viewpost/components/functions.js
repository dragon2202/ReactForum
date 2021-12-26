import moment from 'moment'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'

const { confirm } = Modal
//Confirm Modal For deleting posts
export function showConfirmDelete(passedPost, cookies, id, deletePostMutation, refetch, history) {
    confirm({
        title: 'Delete Post',
        content: "Note: Deleting posts with commments will make it inactive, making the post still accessible. Posts without comments will be removed forever.",
        icon: null,
        onOk() {
            deleteOnFinish(passedPost, cookies, id, deletePostMutation, refetch, history)
        },
        width: '125vh'
    })
}

//function to call usemutation to delete post
async function deleteOnFinish(passedPost, cookies, id, deletePostMutation, refetch, history) {
    if (cookies.userCookie.id == passedPost.author_id) {
        const post = {
            id: parseInt(id),
            commentLength: passedPost.comment.length
        }
        await deletePostMutation(
            {
                variables: {
                    post
                }
            }
        )
        Message.success({
            content: 'You have successfully deleted a post',
            style: {
                marginTop: '5vh',
            },
        }, 10)
        refetch()
        history.push("/")
    } else {
        Message.error({
            content: 'This action cannot be completed as you are not the author',
            style: {
                marginTop: '5vh',
            },
        }, 10)
    }
}

//Confirm Modal for making post active and inactive
export function showConfirmLock(passedPost, cookies, id, lockPostMutation, refetch) {
    confirm({
        title: "Change Post's Active Status",
        content: 'Note: Changing active status of a post will make the enable/disable the author from making edits. Inactive posts will be hidden from being on View Post Page and Home Page.',
        icon: null,
        onOk() {
            lockOnFinish(passedPost, cookies, id, lockPostMutation, refetch)
        },
        width: '125vh'
    })
}

//function to call usemutation to change post active/inactive
async function lockOnFinish(passedPost, cookies, id, lockPostMutation, refetch) {
    if (cookies.userCookie.id === passedPost.author_id) {
        const post = {
            id: parseInt(id),
            active: passedPost.active
        }
        await lockPostMutation( { variables: { post } } )
        Message.success({
            content: (passedPost.active === -1) ? 'Post has been unlocked.' : 'Post has been locked. Editing has been restricted.',
            style: {
                marginTop: '5vh',
            },
        }, 10)
        refetch()
    } else {
        Message.error({
            content: 'This action cannot be completed as you are not the author',
            style: {
                marginTop: '5vh',
            },
        }, 10)
    }
}

//Function returns different content depending on Post type
export function contentSwitch(item) {
    switch (item.type) {
        case "Image":
            return (
                <img alt="" src={item.image} style={{ maxHeight: "60vh", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            )
        case "Post":
            return (
                <p>{item.text}</p>
            )
        case "Link":
            return (
                <a href={"https://" + `${item.text}`}>{item.text}</a>
            )

    }
}
 //function to call usemutation to create post
export async function comment_onFinish(refetch, id, cookies, value, createCommentMutation, commentForm) {
    const comment = {
        post_id: parseInt(id),
        author_id: cookies.userCookie.id,
        parent_comment_id: null,
        comment: value
    }
    await createCommentMutation({
        variables: { comment }
    })
    Message.success({
        content: 'You have successfully commented.',
        style: {
            marginTop: '5vh',
        }
    }, 10)
    refetch()
    commentForm.resetFields()
}

export async function EditPost_OnFinish(passedPost, formValues, images, mutation, refetch) {
    let post
    switch (passedPost.type) {
        case 'Post':
            post = {
                id: parseInt(passedPost.id),
                title: formValues.title,
                image: null,
                text: formValues.text,
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
            }
            try {
                await mutation({ variables: { post } })
                Message.success({
                    content: 'You have successfully edited your post.',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
                refetch()
            } catch (error) {
                Message.error({
                    content: 'An error has occurred. ',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
            }
            break
        case 'Image':
            post = {
                id: parseInt(passedPost.id),
                title: formValues.title,
                image: (images.length !== 0) ? images[0]['data_url'] : null,
                text: null,
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
            }
            try {
                await mutation({ variables: { post } })
                Message.success({
                    content: 'You have successfully edited your image.',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
                refetch()
            } catch (error) {
                Message.error({
                    content: 'An error has occurred. ',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
            }
            break
        case 'Link':
            post = {
                id: parseInt(passedPost.id),
                title: formValues.title,
                image: null,
                text: formValues.link,
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
            }
            try {
                await mutation({ variables: { post } })
                Message.success({
                    content: 'You have successfully edited your link.',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
                refetch()
            } catch (error) {
                Message.error({
                    content: 'An error has occurred. ',
                    style: {
                        marginTop: '5vh',
                    }
                }, 10)
            }
            break
    }
}