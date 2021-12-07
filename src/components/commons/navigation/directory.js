import { Link } from 'react-router-dom'
import Card from 'antd/lib/card'

const Directory = ({ }) => {
    return (
        <Card className='directory' title='Directory'>
            <div className='column'>
                <Link to='/' className='link'>Home</Link>
                <br style={{ marginBottom: '0.5em'  }}/>
                <Link to='/account' className='link'>Account</Link>
                <br style={{ marginBottom: '0.5em'  }}/>
                <Link to='/inbox' className='link'>Inbox</Link>
            </div>
            <div className='column'>
                <Link to='/createpost' className='link'>Create Post</Link>
                <br style={{ marginBottom: '0.5em'  }}/>
                <Link to='/communities' className='link'>Community</Link>
                <br style={{ marginBottom: '0.5em'  }}/>
            </div>
        </Card>
    )
}

export default Directory