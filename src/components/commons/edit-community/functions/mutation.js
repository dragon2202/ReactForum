import Modal from 'antd/lib/modal'
const { confirm } = Modal

//Modal to confirm removing a user from community
function confirmRemoveUser(id, user_id, role_id, mutation, localStorage) {
    confirm({
        title: 'Remove Userz',
        content: "Are you sure you want to remove this person from the community?",
        onOk() {
            removeUser(id, user_id, role_id, mutation, localStorage)
        },
        width: '125vh'
    })
}

//Function to handle the apollo graphql mutation of remove a user from the community
async function removeUser(id, user_id, role_id, mutation, localStorage) {
    localStorage.setItem('reload', 3)
    const communityuserrole = {
        community_id: id,
        user_id: user_id,
        role_id: role_id
    }
    await mutation({
        variables: { communityuserrole }
    })
    window.location.reload()
}

//Modal to confirm removing a user from community
function confirmBanUser(id, user_id, mutation, localStorage) {
    confirm({
        title: 'Ban Userz',
        content: "Are you sure you want to ban this person from the community?",
        onOk() {
            ban_user(id, user_id, mutation, localStorage)
        },
        width: '125vh'
    })
}

//Function to handle the apollo graphql mutation of ban a user from the community
async function ban_user(id, user_id, mutation, localStorage) {
    localStorage.setItem('reload', 4)
    const communityban = {
        community_id: id,
        user_id: user_id
    }
    await mutation({
        variables: { communityban }
    })
    window.location.reload()
}

//Function to handle apollo graphql to update community details
async function updateDetails(values, id, mutation, localStorage) {
    localStorage.setItem('reload', 1)
    const community = {
        id: parseInt(id),
        title: values.title,
        summary: values.description
    }
    await mutation({
        variables: { community }
    })
    window.location.reload()
}

export { confirmRemoveUser, confirmBanUser, updateDetails }