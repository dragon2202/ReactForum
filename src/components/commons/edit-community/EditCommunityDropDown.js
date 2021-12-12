import React from 'react'

import Menu from 'antd/lib/menu'
import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'

const { confirm } = Modal

function confirmUpdateRole(communityuserrole, username, role_id, role_title, mutation, refetch){
    confirm({
        title: 'Update Role',
        content: (role_id === 1) ? "Are you sure you want to hand ownership of this community to this person? You will become an Admin." : "Are you sure you want to change " + username + "'s role to " + role_title,
        onOk() {
            changeRole(communityuserrole, role_id, mutation, refetch)
        },
        width: '125vh'
    })
}

async function changeRole(object, role_id, mutation, refetch){
    let communityuserrole = {
        ...object,
        role_id: role_id
    }
    //Mutation Hook
    await mutation({
        variables: { communityuserrole }
    }) 
    Message.success({
        content: "You have successfully updated a user's role.",
        style: {
            marginTop: '5vh',
        },
    }, 10)
    refetch()
}

const EditCommunityDropDown = ({ role_title, key, communityuserrole, username, mutation, refetch }) => {
    if (role_title === "Owner") {
        return (
            <Menu>
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 1, "Owner", mutation, refetch)}>
                    Owner
                </Menu.Item>
                
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 2, "Admin", mutation, refetch)}>
                    Admin
                </Menu.Item>
                
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 3, "User", mutation, refetch)}>
                    User
                </Menu.Item>
            </Menu>
        )
    }
    if (role_title === "Admin") {
        return (
            <Menu>
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 2, "Admin", mutation, refetch)}>
                    <div>Admin</div>
                </Menu.Item>
            </Menu>
        )
    }
}

export default EditCommunityDropDown