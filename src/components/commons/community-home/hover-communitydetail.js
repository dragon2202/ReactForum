import Card from 'antd/lib/card'

const CommunityDetail = ({community}) => {
    if(community === null) {
        return (
            <Card className='community-details' title='List of Communities'>
                Hover over the community's name to see the summary
            </Card>
        )
    }
    return (
        <Card className='community-details'>
            <h3>{community.title}</h3>
            <p>{community.summary}</p>
        </Card>
    )
}

export default CommunityDetail