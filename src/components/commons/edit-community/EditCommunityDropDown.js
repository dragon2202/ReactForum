import React from 'react'

import Menu from 'antd/lib/menu'
import Modal from 'antd/lib/modal'

const { confirm } = Modal

function confirmUpdateRole(communityuserrole, username, role_id, role_title, mutation, localStorage){
    confirm({
        title: 'Update Role',
        content: (role_id === 1) ? "Are you sure you want to hand ownership of this community to this person? You will become an Admin." : "Are you sure you want to change " + username + "'s role to " + role_title,
        onOk() {
            changeRole(communityuserrole, role_id, mutation, localStorage)
        },
        width: '125vh'
    })
}

async function changeRole(object, role_id, mutation, localStorage){
    localStorage.setItem('reload', 2)
    let communityuserrole = {
        ...object,
        role_id: role_id
    }
    //Mutation Hook
    await mutation({
        variables: { communityuserrole }
    })
    window.location.reload()
}

const EditCommunityDropDown = ({ role_title, key, communityuserrole, username, mutation, localStorage }) => {
    if (role_title === "Owner") {
        return (
            <Menu>
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 1, "Owner", mutation, localStorage)}>
                    Owner
                </Menu.Item>
                
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 2, "Admin", mutation, localStorage)}>
                    Admin
                </Menu.Item>
                
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 3, "User", mutation, localStorage)}>
                    User
                </Menu.Item>
            </Menu>
        )
    }
    if (role_title === "Admin") {
        return (
            <Menu>
                <Menu.Item key={key} onClick={() => confirmUpdateRole(communityuserrole, username, 2, "Admin", mutation, localStorage)}>
                    <div>Admin</div>
                </Menu.Item>
            </Menu>
        )
    }
}

export default EditCommunityDropDown