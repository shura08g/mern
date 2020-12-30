import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {Authorization: `Bearer ${auth.token}`})
                //console.log('Data: ', data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
            }
        }
    }

    return (
        /*<div>
            <h1>Create Page</h1>
        </div>*/
        <div className="row">
            <div className="col s8 offset-s2" style={{padding: '2rm'}}>
                <div className="input-field">
                    <input placeholder="Вставте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Вставте ссылку</label>
                </div>
            </div>
        </div>
    )
}