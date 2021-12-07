import Button from 'antd/lib/button'
import Dropdown from 'antd/lib/dropdown'
import DownOutlined from '@ant-design/icons/DownOutlined'
import Menu from 'antd/lib/menu'

const Dropdown_Community = ({ communityQuery, community, setCommunity }) => {
    if (communityQuery.length === 0) {
        return (
            <Button>Join a Community to Post </Button>
        )
    }
    return (
        <Dropdown className='dropdown' overlay={
            <Menu>
                <Menu.Item key={0} onClick={() => setCommunity('')}>
                    No Community
                </Menu.Item>
                {
                    communityQuery.map((item) => {
                        return(
                            <Menu.Item key={item.community.id} onClick={() => setCommunity({title: item.community.title, id: item.community.id})}>
                                {item.community.title}
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        }>
            <Button className='dropdown-button'>
                <div className='button-style'>
                    <span>
                        {(community.length === 0) ? 'Choose a Community': community.title}
                    </span>
                    <span>
                        <DownOutlined />
                    </span>
                </div>
            </Button>
        </Dropdown>
    )
}

export default Dropdown_Community