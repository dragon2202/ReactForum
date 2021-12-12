export async function JoinCommunity(pageID, userID, mutation) {//Inputs users into a community with a role of 3 which is base user
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
}

export async function LeaveCommunity(obj, mutation) {//Remove users from community
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
}