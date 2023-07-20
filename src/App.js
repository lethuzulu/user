import React, { useEffect } from 'react'
import axios from 'axios'
import config from './config.json'

function App() {
    const [users, setUsers] = React.useState([])
    useEffect(() => {
        axios
            .get(`${config.api_base_url}/user`)
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => console.log(error))
    }, [])

    const [details, setDetails] = React.useState({
        user_name: '',
        password: '',
    })

    const handleChange = (event) => {
        setDetails((details) => {
            return {
                ...details,
                [event.target.name]: event.target.value,
            }
        })
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${config.api_base_url}/user/`,
                details
            )
        } catch (error) {
            console.log('error  ', error)
        }
    }

    return (
        <div className='App'>
            <div>
                <ul>
                    {users.length > 0
                        ? users.map((user, index) => {
                              return (
                                  <li key={index}>
                                      {user.user_name} {' - '}{' '}
                                      {user.password}
                                  </li>
                              )
                          })
                        : null}
                </ul>
            </div>

            <div style={{ marginLeft: '10px' }}>
                <input
                    name='user_name'
                    value={details.user_name}
                    onChange={handleChange}
                    placeholder='username'
                />
            </div>
            <div style={{ marginLeft: '10px' }}>
                <input
                    name='user_password'
                    value={details.password}
                    onChange={handleChange}
                    placeholder='password'
                />
            </div>
            <button
                style={{ marginLeft: '10px' }}
                onClick={handleSubmit}>
                submit
            </button>
        </div>
    )
}

export default App
