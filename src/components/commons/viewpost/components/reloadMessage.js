import Message from 'antd/lib/message'

export function reloadMessage(localStorage) {
    switch (parseInt(localStorage.getItem('reload'))) {
        case 1:
            Message.success({
                content: 'You have successfully commented',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            break;
        case 2:
            Message.success({
                content: 'You have successfully deleted a comment.',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            break;
        case 3:
            Message.success({
                content: 'You have successfully changed a comment',
                style: {
                    marginTop: '5vh',
                },
            }, 10)
            break;
        case 4:
            Message.success({
                content: 'You have successfully deleted a post. Posts are inactive instead if it has comment(s). ',
                style: {
                    marginTop: '5vh',
                },
            }, 20)
            break;
        case 5:
            Message.success({
                content: 'You have successfully changed the active status of your post.',
                style: {
                    marginTop: '5vh',
                },
            }, 20)
            break;
        case 6:
            Message.success({
                content: 'You have successfully updated your post.',
                style: {
                    marginTop: '5vh',
                },
            }, 20)
            break;
    }
}