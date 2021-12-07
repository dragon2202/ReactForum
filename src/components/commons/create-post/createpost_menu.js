import Menu from 'antd/lib/menu'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import FileImageOutlined from '@ant-design/icons/FileImageOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

const CreatePost_Menu = ({ currentMenu, setMenu }) => {
    return (
        <Menu className='createpost_menu' mode="horizontal" selectedKeys={[currentMenu]}>
            <Menu.Item key="Post" icon={<FileImageOutlined />} onClick={() => setMenu('Post')}>
                Post
            </Menu.Item>
            <Menu.Item key="Image" icon={<FileTextOutlined />} onClick={() => setMenu('Image')}>
                Image
            </Menu.Item>
            <Menu.Item key="Link" icon={<LinkOutlined/>} onClick={() => setMenu('Link')}>
                Link
            </Menu.Item>
        </Menu>
    )
}

export default CreatePost_Menu