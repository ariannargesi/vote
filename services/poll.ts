import httpServer from "@/axios";
import { useState } from "react";


type pollProps={
    title: string,
    caption?: string,
    category?: string,
    location?: string,
    options: string[],
    anonymous?: boolean 
} 
   

export default async function createPoll({title,caption,category,location,options,anonymous}:pollProps){ 
    const [loading,setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

   const data = await httpServer.post('create-poll/',
   { 
   title: 'a',
   caption: 'b',
   category: 'c',
   location: 'd',
   options: ['e','f'],
   anonymous: false, 
   }
    ).then(data=>{
        console.log(data)
        return data
    })
    .catch(e=>{setError(e)
    console.log(Error)
})

    
    /*@maryam
        make the request here and return the reuslt 
        for example 
        const { data } = await axios.post(...)
        return data  */
}