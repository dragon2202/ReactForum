import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'
const { confirm } = Modal

//Modal to confirm removing a user from community
function confirmRemoveUser(id, user_id, role_id, mutation, refetch) {
    confirm({
        title: 'Remove User',
        content: "Are you sure you want to remove this person from the community?",
        onOk() {
            removeUser(id, user_id, role_id, mutation, refetch)
        },
        width: '125vh'
    })
}

//Function to handle the apollo graphql mutation of remove a user from the community
async function removeUser(id, user_id, role_id, mutation, refetch) {
    const communityuserrole = {
        community_id: id,
        user_id: user_id,
        role_id: role_id
    }
    await mutation({
        variables: { communityuserrole }
    })
    Message.success({
        content: "You have successfully removed a user from this community.",
        style: {
            marginTop: '5vh',
        },
    }, 10)
    refetch()
}

//Modal to confirm removing a user from community
function confirmBanUser(id, user_id, mutation, refetch) {
    confirm({
        title: 'Ban User',
        content: "Are you sure you want to ban this person from the community?",
        onOk() {
            ban_user(id, user_id, mutation, refetch)
        },
        width: '125vh'
    })
}

//Function to handle the apollo graphql mutation of ban a user from the community
async function ban_user(id, user_id, mutation, refetch) {
    const communityban = {
        community_id: id,
        user_id: user_id
    }
    await mutation({
        variables: { communityban }
    })
    Message.success({
        content: "You have successfully banned a user from this community.",
        style: {
            marginTop: '5vh',
        },
    }, 10)
    refetch()
}

//Function to handle apollo graphql to update community details
async function updateDetails(values, id, mutation, refetch, setTab) {
    const community = {
        id: parseInt(id),
        title: values.title,
        summary: values.description
    }
    await mutation({
        variables: { community }
    })
    Message.success({
        content: 'You have successfully updated details of the community.',
        style: {
            marginTop: '5vh',
        },
    }, 10)
    setTab("2")
    refetch()
}

//Modal to confirm removing a user from community
function confirmUnbanUser(id, user_id, mutation, refetch) {
    confirm({
        title: 'Unban User',
        content: "Are you sure you want to unban this person from the community?",
        onOk() {
            unban_user(id, user_id, mutation, refetch)
        },
        width: '125vh'
    })
}

//Function to handle the apollo graphql mutation of ban a user from the community
async function unban_user(id, user_id, mutation, refetch) {
    const communityban = {
        community_id: id,
        user_id: user_id
    }
    await mutation({
        variables: { communityban }
    })
    Message.success({
        content: "You have successfully banned a user from this community.",
        style: {
            marginTop: '5vh',
        },
    }, 10)
    refetch()
}

export { confirmRemoveUser, confirmBanUser, updateDetails, confirmUnbanUser }