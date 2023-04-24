import axios from "axios";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useState } from "react";

export function usePost<T> (endPoint: string, defaultValue = null ) {
    const [data, setData] = useState(defaultValue)
    const [loading, setLoading] = useState(false)   
    const [error, setError] = useState()
    
    const submit = (body: T, callback: (data: any) => void) => {
        setLoading(true)
        axios.post(endPoint, body)
        .then(response => callback(response.data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }

    return {data, loading, submit }  as const 
}