import List from 'antd/lib/list'
import Card from 'antd/lib/card'
import { isLiteralObject } from '../functions/isLiteralObject'
import Directory from '../navigation/directory'

const Rules = ({ }) => {
    return (
        <Card className='rules'>
            <List className='rules' header='Posting Rules'>
                <List.Item>
                    <p>Keep it legal, and avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions.</p>
                </List.Item>
                <List.Item>
                    <p>Harrassment, Bullying, and threats are strictly forbidden</p>
                </List.Item>
                <List.Item>
                    <p>Abide by community rules. Post authentic content.</p>
                </List.Item>
                <List.Item>
                    <p>Respect the privacy of others. Instigating harassment, for example by revealing someone’s personal or confidential information, is not allowed. Never post or threaten to post intimate or sexually-explicit media of someone without their consent.</p>
                </List.Item>
                <List.Item>
                    <p>Do not post or encourage the posting of sexual or suggestive content involving minors.</p>
                </List.Item>
                <List.Item>
                    <p>Don’t impersonate an individual or an entity in a misleading or deceptive manner.</p>
                </List.Item>
            </List>
        </Card>
    )
}

const Community_Rules_Card = ({ item }) => {
    if (!isLiteralObject(item)) {
        return (
            <div className='community_rules'>
                <Rules />
                <Directory/>
            </div>
        )
    }
    return (
        <div className='community_rules'>
            <Card>
                <div className='title'>{item.community.title}</div>
                {item.community.summary}
            </Card>
            <Rules/>
            <Directory/>
        </div>
    )
}

export default Community_Rules_Card