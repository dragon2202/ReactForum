export default function AccountSettings () {
    const [cookies, set] = useCookies(['userCookie'])
    const [user, setUserObj] = useState(null)
    const [ChangeUserInfo] = useMutation(CHANGE_USER_INFO)
    const [changePassword] = useMutation(CHANGE_USER_PASSWORD)

    const [getUser] = useLazyQuery(CHECK_USER_EMAIL, {
        onCompleted: async (data) => {
            if(isLiteralObject(data)){
                if(data.user.id === null || data.user.id === cookies.userCookie.id) {
                    await ChangeUserInfo({
                        variables: {
                            user
                        }
                    })
                    delete user.password//delete password key:value to fit mutation
                    set('userCookie', user, { path: '/', sameSite: 'lax', secure: true, expires: 0 })//Set cookie for users
                } else {
                    Message.warning({
                        content: 'Email Taken. Try another email address.',
                        style: {
                            marginTop: '5vh',
                        },
                    }, 10)
                }
            }
        }
    })

    const [checkCredentials] = useLazyQuery(CHECK_CREDENTIALS, {
        onCompleted: async (data) => {
            if (isLiteralObject(data)) {
                getUser({
                    variables: {
                        email: user.email
                    }
                })
            } else {
                Message.warning({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    })

    const [checkCredentialsPassword] = useLazyQuery(CHECK_CREDENTIALS, {
        onCompleted: async (data) => {
            if (isLiteralObject(data.user)) {
                await changePassword({
                    variables: {
                        user
                    }
                })
            } else {
                Message.warning({
                    content: 'Wrong Password. Please try again.',
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    })

    async function OnFinish_Password(checkCredentialsPassword, values, user_id, setUserObj) {
        if (validateForm(values)) {
            if(values.NewPassword === values.ConfirmPassword) {
                setUserObj({
                    id: user_id,
                    password: values.NewPassword
                })
    
                checkCredentialsPassword({
                    variables: {
                        id: user_id,
                        password: values.Password
                    }
                })
            } else {
                Message.warning({
                    content: "New passwords don't match",
                    style: {
                        marginTop: '5vh',
                    },
                }, 10)
            }
        }
    }
    
    function OnFinish_Username_Email(checkCredentials, values, user_id, setUserObj) {
        if (validateForm(values)) {
            setUserObj({
                id: user_id,
                email: values.email,
                username: values.username,
                password: values.password
            })
    
            checkCredentials({
                variables: {
                    id: user_id,
                    password: values.password
                }
            })
        }
    }

    //If user is not logged in return a page with login and register
    if (cookies.userCookie === undefined) {
        return (
            <main className="accountsettings">
                <h3 className="header-3"><b>Account Settings</b></h3>
                <LoginOrRegister />
            </main>
        )
    }

    return (
        <main className="accountsettings">
            <section className="container">
                <div className="row">
                    <h3 className="header-3"><b>Account Settings</b></h3>
                    <Tabs type="card">
                        <TabPane tab="Username/Email" key="1">
                            <Form
                                name="edit-info"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                initialValues={{
                                    ["username"]: cookies.userCookie.username,
                                    ["email"]: cookies.userCookie.email
                                }}
                                onFinish={(values) => OnFinish_Username_Email(checkCredentials, values, cookies.userCookie.id, setUserObj)}
                            >
                                <Form.Item label="Username" name="username">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input type="email"/>
                                </Form.Item>
                                <Form.Item label="Password" name="password">
                                    <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Password" key="2">
                            <Form
                                name="edit-password"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 8 }}
                                onFinish={(values) => OnFinish_Password(checkCredentialsPassword, values, cookies.userCookie.id, setUserObj)}
                            >
                                <Form.Item label="Password" name="Password">
                                    <Input type="password" placeholder="Enter Password to verify identity" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item label="New Password" name="NewPassword">
                                    <Input type="password" placeholder="Enter New Password" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item label="New Password" name="ConfirmPassword">
                                    <Input type="password" placeholder="Re-enter New Password" autoComplete="new-password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </section>
        </main>
    )
}