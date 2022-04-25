export async function JoinCommunity(pageID, userID, mutation, refetch) {//Inputs users into a community with a role of 3 which is base user
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
    refetch()
}

export async function LeaveCommunity(obj, mutation, refetch) {//Remove users from community
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
    refetch()
}