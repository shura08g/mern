import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {LinksList} from '../components/LinksList'


export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null,
                {Authorization: `Bearer ${token}`})
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    return (
        /*<div>
            <h1>Links Page</h1>
        </div>*/
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}