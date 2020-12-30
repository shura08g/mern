import {useState, useCallback} from 'react'
//import {header} from "express-validator";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) { // Чтобы правильно передавать на серер (не Object, а String)
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (e) {
            // console.log('Catch:', e.message)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    // const clearError = () => setError(null)
    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}