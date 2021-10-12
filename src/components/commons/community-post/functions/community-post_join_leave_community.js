export async function JoinCommunity(pageID, userID, mutation) {
    const communityuserrole = {
        community_id: parseInt(pageID),
        user_id: userID,
        role_id: 3
    }
    await mutation({
        variables: {
            communityuserrole
        }
    })
    window.location.reload()
}

export async function LeaveCommunity(obj, mutation) {
    const communityuserrole = {
        community_id: obj.community_id,
        user_id: obj.user_id,
        role_id: obj.role_id
    }
    await mutation({
        variables: {
            communityuserrole
        }
    })
    window.location.reload()
}