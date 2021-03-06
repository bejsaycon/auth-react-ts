import {useState, useEffect} from 'react';

export const useFetch = (url:string) => {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(y=>{
            setData(y);
        })
      }, [url]);
    return data
}