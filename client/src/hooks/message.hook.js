import {useCallback} from 'react'

// Всплывающая подсказка на AuthPage
export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}